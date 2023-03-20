from django.shortcuts import render
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAdminUser,IsAuthenticated
from rest_framework.response import Response
from base.models import Product,Order,OrderItem,ShippingAddress
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from base.serializers import ProductSerializer,UserProductSerializer,UserProductSerializerWithToken,OrderSerializer
from datetime import datetime
from rest_framework import status




@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItem(request):
    user = request.user
    data = request.data
    orderItems = data['orderItems']
    if orderItems and len(orderItems) == 0:
        return Response({'detail':'No order Items'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        order = Order.objects.create(
            user=user,
            paymentMethod=data['paymentMethod'],
            taxPrice=data['taxPrice'],
            shippingPrice=data['shippingPrice'],
            totalPrice=data['totalPrice'],

        )

        shipping= ShippingAddress.objects.create(
            order= order,
            address=data['shippingAddress']['address'],
            city = data['shippingAddress']['city'],
            postalCode =data['shippingAddress']['postalCode'],
            country= data['shippingAddress']['country'],
        )

        for i in orderItems:
            product = Product.objects.get(_id=i['product'])

            item = OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                qty=i['qty'],
                price=i['price'],
                image=product.image.url,
            )

            # (4) Update stock
            if item.qty == None:
                item.qty = 0
                product.countInStock -= item.qty
                product.save()

        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request,pk):
    user = request.user
    try:
        order = Order.objects.get(_id=pk)
        if user.is_staff or order.user== user:
            serializer = OrderSerializer(order, many= False)
            return Response(serializer.data)
        else:
            return Response({'detail':'Not authorized to view this order'},status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'detail':'Order does not exist.'},status= status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])   
def getMyOrder(request):
    user =request.user
    orders = user.order_set.all()
    serializer = OrderSerializer(orders,many = True)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateOrderToPaid(request,pk):
    order = Order.objects.get(_id=pk)
    order.isPaid = True
    order.paidAt = datetime.now()
    order.save()
    return Response('Order Was Paid')
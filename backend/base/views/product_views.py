from django.shortcuts import render
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAdminUser,IsAuthenticated
from rest_framework.response import Response
from base.models import Product
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from base.serializers import ProductSerializer,UserProductSerializer,UserProductSerializerWithToken

from rest_framework import status



@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many =True)
    return Response(serializer.data)


@api_view(['GET'])
def getProduct(request,pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product,many =False)


    return Response(serializer.data)




from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAdminUser,IsAuthenticated
from rest_framework.response import Response
from base.products import products
from base.models import Product
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from base.serializers import ProductSerializer,UserProductSerializer,UserProductSerializerWithToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserProductSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] =v

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer





@api_view(['POST'])
def registerUser(request):
    data = request.data
    try:
        user = User.objects.create(
            first_name = data['name'],
            username= data['email'],
            email = data['email'],
            password = make_password(data['password']), 
        )
        seriazlizer = UserProductSerializerWithToken(user,many= False)
        return Response(seriazlizer.data)
    except:
        message = {'detail':'User with this email is already exist.'}
        return Response(message,status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserProductSerializer(user,many=False)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    user = User.objects.all()
    serializer = UserProductSerializer(user,many=True)
    return Response(serializer.data)
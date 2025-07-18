from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .models import CustomUser
from .serializers import UserSerializer
from django.contrib.auth.hashers import make_password


class RegisterView(APIView):
    def post(self, request):
        data = request.data

        # Ensure all fields are present
        required_fields = ['username', 'email', 'mobile', 'password']
        for field in required_fields:
            if field not in data:
                return Response({field: "This field is required."}, status=status.HTTP_400_BAD_REQUEST)

        if CustomUser.objects.filter(email=data['email']).exists():
            return Response({'error': 'Email already exists.'}, status=status.HTTP_400_BAD_REQUEST)

        user = CustomUser.objects.create(
            username=data['username'],
            email=data['email'],
            mobile=data['mobile'],
            password=make_password(data['password'])
        )
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        user = authenticate(request, email=email, password=password)

        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'mobile': user.mobile,
                }
            })
        return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

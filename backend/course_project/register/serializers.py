from rest_framework import serializers
from .models import CustomRegister

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomRegister
        fields = ['username', 'email', 'mobile', 'password']

    def create(self, validated_data):
        user = CustomRegister.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            mobile=validated_data['mobile'],
            password=validated_data['password'],
        )
        return user

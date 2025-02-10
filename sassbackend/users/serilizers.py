

import hashlib
import uuid
# from api import settings
from rest_framework import serializers
from django.conf import settings

from .models import *
from django.contrib.auth.hashers import make_password
from django.contrib.auth import get_user_model 
from django.urls import reverse
from django.core.mail import send_mail

User = get_user_model()
class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'

class BusinessDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessDetails
        fields = '__all__'
        read_only_fields = ['user']



class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('id', 'email', 'full_name', 'password', 'username', 'role', 'confirm_password')
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords do not match.")
        return data

    def create(self, validated_data):
        validated_data.pop('confirm_password')
        validated_data['password'] = make_password(validated_data.get('password'))
        user = super().create(validated_data)

        # Generate a verification token and save the user
        user.generate_verification_token()

        # Build an absolute verification link using the token
        request = self.context.get('request')
        # Construct verification link using FRONTEND_URL
        verification_link = f"{settings.FRONTEND_URL}/auth/verify-email/{user.verification_token}"

        # Send verification email
        send_mail(
            subject='Verify Your Email',
            message=f'Click the link to verify your email: {verification_link}',
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[user.email],
            fail_silently=False,
        )
        return user


class EmailVerificationSerializer(serializers.Serializer):
    token = serializers.CharField(max_length=100)
    email = serializers.EmailField()

class UserProfileSerializer(serializers.ModelSerializer):
    full_name = serializers.CharField(source="user.full_name", required=False)
    username = serializers.CharField(source="user.username", required=False)
    phone = serializers.CharField(source="user.phone", required=False)
    dob = serializers.DateField(source="user.dob", required=False)
    email = serializers.EmailField(source="user.email", required=False)

    class Meta:
        model = UserProfile
        fields = ["full_name", "username", "phone", "dob", "email", "bio", "image"]

    def update(self, instance, validated_data):
        user_data = validated_data.pop("user", {})

        # Update User fields if provided
        user = instance.user
        for attr, value in user_data.items():
            setattr(user, attr, value)
        user.save()

        # Update UserProfile fields
        super().update(instance, validated_data)

        # Ensure the response includes updated data
        return instance


from rest_framework_simplejwt.serializers import TokenObtainPairSerializer # type: ignore

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        # Call the parent class's validate method to get the default response
        data = super().validate(attrs)

        # Add custom user data to the response
        user = self.user
        data.update({
            'role': user.role,  # Assuming 'role' is a field on your User model
            'email': user.email,
            'full_name': user.full_name,
            'username': user.username,
        })

        return data
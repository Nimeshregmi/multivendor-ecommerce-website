from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework import status
from django.contrib.auth import authenticate
from django.contrib.auth.models import AnonymousUser
from rest_framework_simplejwt.tokens import RefreshToken # type: ignore
from django.contrib.auth import authenticate
# from rest_framework_simplejwt.tokens import RefreshToken


# from inbox.models import Notification
from .serilizers import *
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import api_view, authentication_classes,permission_classes
from django.middleware.csrf import get_token
from django.http import JsonResponse
from .services import get_user_data, helper_function_google
from django.shortcuts import redirect
from django.conf import settings
from django.contrib.auth import login
from rest_framework.views import APIView
from django.http import HttpResponse
from django.core.files import File
from django.core.files.temp import NamedTemporaryFile
from django.contrib.auth.hashers import check_password, make_password
from google.oauth2 import id_token # type: ignore
from google.auth.transport import requests # type: ignore
from rest_framework.exceptions import NotAuthenticated
from django.db.utils import IntegrityError
from django.contrib.auth import update_session_auth_hash

from rest_framework_simplejwt.views import TokenVerifyView
from rest_framework_simplejwt.tokens import UntypedToken
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView

User = get_user_model()
class CustomTokenVerifyView(TokenVerifyView):
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])

        # Decode the token to get the user ID
        token = UntypedToken(request.data['token'])
        user_id = token.payload.get('user_id')

        # Fetch the user from the database
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({'detail': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        # Add custom user data to the response
        response_data = {
            'username': user.username,
            'email': user.email,
            'role': user.role,  # Assuming 'role' is a field on your User model
        }

        return Response(response_data, status=status.HTTP_200_OK)
    
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        # data = get_user_data(response.data['access'])
        # print(data)
        access_token = response.data.get('access')
        refresh_token = response.data.get('refresh')

        if access_token and refresh_token:
            # Set secure cookies
            response.set_cookie(
                key='access_token',
                value=access_token,
                httponly=True,
                secure=settings.DEBUG==False,
                samesite='Strict',
                max_age=60 * 15*20,  # 30 minutes (matches ACCESS_TOKEN_LIFETIME)
                # domain=settings.SESSION_COOKIE_DOMAIN, 
                path='/',  # Available across the entire domain
            )
            response.set_cookie(
                key='refresh_token',
                value=refresh_token,
                httponly=True,
                secure=settings.DEBUG==False,
                samesite='Strict',
                max_age=60 * 60 * 24 * 7,  # 7 days (matches REFRESH_TOKEN_LIFETIME)
                # domain=settings.SESSION_COOKIE_DOMAIN,
                path='/',
            )
            
            # Remove tokens from the response body
            # response.data.pop('access', None)
            # response.data.pop('refresh', None)

        return response
    
class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        # Call the parent class's post method to handle token refresh
        response = super().post(request, *args, **kwargs)

        # Check if token refresh was successful
        if response.status_code == status.HTTP_200_OK:
            # Extract the new access token from the response
            access_token = response.data.get('access')
            refresh_token = request.COOKIES.get('refresh_token')  

            # Set the access token in a cookie
            response.set_cookie(
                key='access_token',
                value=access_token,
                httponly=True,
                secure=settings.DEBUG==False,
                samesite='Strict',
                max_age=60 * 15*20,  # 30 minutes (matches ACCESS_TOKEN_LIFETIME)
                # domain=settings.SESSION_COOKIE_DOMAIN, 
                path='/',  # Available across the entire domain
            )

            # Optionally, set the refresh token in a cookie (if a new one is issued)
            if 'refresh' in response.data:
                refresh_token = response.data.get('refresh')
                response.set_cookie(
                key='refresh_token',
                value=refresh_token,
                httponly=True,
                secure=settings.DEBUG==False,
                samesite='Strict',
                max_age=60 * 60 * 24 * 7,  # 7 days (matches REFRESH_TOKEN_LIFETIME)
                # domain=settings.SESSION_COOKIE_DOMAIN,
                path='/',
            )
            response.data.pop('access', None)
            response.data.pop('refresh', None)

        return response


# tested
@api_view(['POST'])
def signup(request):
    data = request.data
    serializer = UserSerializer(data=data, context={'request': request})
    if serializer.is_valid():
        instance = serializer.save()

        # Generate verification token
        instance.generate_verification_token()

        # Send verification email
        verification_link = request.build_absolute_uri(
            reverse('verify-email', kwargs={'token': instance.verification_token})
        )
        send_mail(
            'Verify Your Email',
            f'Click the link to verify your email: {verification_link}',
            settings.DEFAULT_FROM_EMAIL,
            [instance.email],
            fail_silently=False,
        )

        # Welcome email
        title = "Welcome to Ecommerce"
        content = "You have successfully registered. Please check your email to verify your account."
        send_mail(
            title,
            content,
            settings.DEFAULT_FROM_EMAIL,
            [instance.email],
            fail_silently=False,
        )

        return Response(
            {'message': 'User registered. Check your email for verification.'},
            status=status.HTTP_201_CREATED
        )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#tested
@api_view(['POST'])
@permission_classes([IsAuthenticated])  
def change_password(request):
    user = request.user
    data = request.data
    current_password = data.get('current_password')
    new_password = data.get('new_password')
    confirm_password = data.get('confirm_password')

    if not current_password or not new_password or not confirm_password:
        return Response({"error": "All fields are required."}, status=status.HTTP_400_BAD_REQUEST)
    
    # Check if current password is correct
    if not check_password(current_password, user.password):
        return Response({"error": "Current password is incorrect."}, status=status.HTTP_400_BAD_REQUEST)
    
    # Check if new passwords match
    if new_password != confirm_password:
        return Response({"error": "New passwords do not match."}, status=status.HTTP_400_BAD_REQUEST)
    
    # Update the password
    user.password = make_password(new_password)
    user.save()
    
    return Response({"message": "Password changed successfully."}, status=status.HTTP_200_OK)

# Tested
class UserProfileUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def handle_exception(self, exc):
        if isinstance(exc, NotAuthenticated):
            return Response({"error": "Authentication required to access this resource."}, status=status.HTTP_401_UNAUTHORIZED)
        return super().handle_exception(exc)

    def put(self, request, *args, **kwargs):
        user = request.user
        try:
            profile = UserProfile.objects.get(user=user)
        except UserProfile.DoesNotExist:
            return Response({"error": "UserProfile not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = UserProfileSerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            try:
                updated_profile = serializer.save()

                # Update session if email is changed
                if "email" in request.data:
                    user.refresh_from_db()
                    update_session_auth_hash(request, user)

                updated_data = UserProfileSerializer(updated_profile).data
                return Response(updated_data, status=status.HTTP_200_OK)

            except IntegrityError:
                return Response({"error": "A user with this email or username already exists."}, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EmailVerificationView(APIView):
    def post(self, request):
        serializer = EmailVerificationSerializer(data=request.data)
        if serializer.is_valid():
            token = serializer.validated_data['token']
            try:
                user = User.objects.get(verification_token=token)
                if user.is_token_valid():
                    user.is_verified = True
                    user.verification_token = None
                    user.token_created_at = None
                    user.save()
                    return Response({'message': 'Email verified successfully.'}, status=status.HTTP_200_OK)
                else:
                    user.delete()
                    return Response({'message': 'Verification link expired. Please sign up again.'}, status=status.HTTP_400_BAD_REQUEST)
            except ObjectDoesNotExist:
                return Response({'message': 'Invalid token.'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BusinessDetailsUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, *args, **kwargs):
        user = request.user

        # Check if the user is a seller
        if user.role != 'seller':
            return Response({"error": "Only sellers can update business details."}, status=status.HTTP_403_FORBIDDEN)

        # Try to get the business details
        try:
            business_details = BusinessDetails.objects.get(user=user)
        except BusinessDetails.DoesNotExist:
            return Response({"error": "Business details not found."}, status=status.HTTP_404_NOT_FOUND)

        # Serialize the data and validate the input
        serializer = BusinessDetailsSerializer(business_details, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()  # Save the updated business details
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Those views are not tested
@api_view(['POST'])
def google_login(request):
    token = request.data.get('token')
    is_business = request.data.get('is_business', False)
    try:
        # Verify the token with Google
        idinfo = id_token.verify_oauth2_token(token, requests.Request(), settings.CLIENT_ID)
        
        # Ensure correct issuer
        if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
            raise ValueError('Wrong issuer.')

        # Get the user data from the Google account
        email = idinfo['email']
        first_name = idinfo.get('given_name')
        last_name = idinfo.get('family_name')
        picture = idinfo.get('picture')

        # Create or get the user
        user, created = User.objects.get_or_create(email=email)
        
        # If the user is new, set the username, business status, and profile image
        if created:
            user.username = email.split('@')[0] + first_name + last_name
            user.first_name = first_name
            user.last_name = last_name
            user.is_business = is_business

            # Create the UserProfile instance if it doesn't exist
            user_profile, profile_created = UserProfile.objects.get_or_create(user=user)

            # If there's a profile image from Google, download and save it
            if picture:
                img_temp = NamedTemporaryFile(delete=True)
                img_temp.write(requests.get(picture).content)
                img_temp.flush()
                user_profile.image.save(f"user_{user.pk}_profile_picture.jpg", File(img_temp))
            
            user.save()

        # Create or get the authentication token for the user
        token, _ = Token.objects.get_or_create(user=user)
        
        # Respond with token and user details
        return Response({
            'token': token.key,
            'user': {
                'id': user.id,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name
            }
        })
    
    except ValueError as e:
        return Response({'error': str(e)}, status=400)

    except Exception as e:
        return Response({'error': 'An error occurred during Google login.'}, status=500)




@api_view(['GET'])
def get_business_details(request, user_id):
    try:
        user = User.objects.get(id=user_id)
        serializer = BusinessDetailSerializer(user, context={'request':request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    except BusinessDetails.DoesNotExist:
        return Response({'error': 'Business details not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def get_address(request, user_id):
    try:
        address = Address.objects.get(user_id=user_id)
        serializer = AddressSerializer(address)
        return Response(serializer.data, status=status.HTTP_200_OK)

    except Address.DoesNotExist:
        return Response({'error': 'Address not found for the specified user'}, status=status.HTTP_404_NOT_FOUND)

    except Address.MultipleObjectsReturned:
        return Response({'error': 'Multiple addresses found for the specified user'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    except Exception as e:
        return Response({'error': f'Something went wrong: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def get_business_categories(request, business_details_id):
    # Retrieve all BusinessCategories associated with the given business_details_id
    business_categories = BusinessCategories.objects.filter(business_details_id=business_details_id)

    # Prepare the response data
    response_data = []
    seen_categories = set()

    for bc in business_categories:
        category = bc.category
        add_category_to_response(category, response_data, seen_categories)

    # Filter out categories where the parent is null
    filtered_response_data = [cat for cat in response_data if cat['parent'] is not None]

    return Response(filtered_response_data)

def add_category_to_response(category, response_data, seen_categories):
    """ Recursively add category and its parents to the response data """
    if category.id in seen_categories:
        return

    seen_categories.add(category.id)

    if category.parent:
        add_category_to_response(category.parent, response_data, seen_categories)

    category_data = {
        'id': category.id,
        'name': category.name,
        'description': category.description,
        'image': category.image.url if category.image else None,
        'status': category.status,
        'parent': category.parent.id if category.parent else None
    }

    response_data.append(category_data)
    
    



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def Change_Password(request):
    user = request.user
    data = request.data
    current_password = data.get('current_password')
    new_password = data.get('new_password')
    confirm_password = data.get('confirm_password')

    if not current_password or not new_password or not confirm_password:
        return Response({"error": "All fields are required."}, status=status.HTTP_400_BAD_REQUEST)
    
    # Check if current password is correct
    if not check_password(current_password, user.password):
        return Response({"error": "Current password is incorrect."}, status=status.HTTP_400_BAD_REQUEST)
    
    # Check if new passwords match
    if new_password != confirm_password:
        return Response({"error": "New passwords do not match."}, status=status.HTTP_400_BAD_REQUEST)
    
    # Update the password
    user.password = make_password(new_password)
    user.save()

    # Generate new access and refresh tokens
    refresh = RefreshToken.for_user(user)
    access_token = str(refresh.access_token)
    refresh_token = str(refresh)

    return Response(
        {
            "message": "Password changed successfully.",
            "access": access_token,
            "refresh": refresh_token,
        },
        status=status.HTTP_200_OK,
    )


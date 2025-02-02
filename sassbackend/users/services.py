from django.conf import settings
from django.shortcuts import redirect
from django.core.exceptions import ValidationError
from urllib.parse import urlencode
from typing import Dict, Any
import requests
import jwt

# from inbox.models import Notification
from .models import User
from django.core.files import File
import requests
from django.core.files.temp import NamedTemporaryFile

GOOGLE_ACCESS_TOKEN_OBTAIN_URL = 'https://oauth2.googleapis.com/token'
GOOGLE_USER_INFO_URL = 'https://www.googleapis.com/oauth2/v3/userinfo'

# Exchange authorization token with access token
def google_get_access_token(code: str, redirect_uri: str) -> str:
    data = {
        'code': code,
        'client_id': settings.CLIENT_ID,
        'client_secret': settings.CLIENT_SECRET,
        'redirect_uri': redirect_uri,
        'grant_type': 'authorization_code'
    }

    response = requests.post(GOOGLE_ACCESS_TOKEN_OBTAIN_URL, data=data)
    print(response, response.text, redirect_uri)
    if not response.ok:
        raise ValidationError('Could not get access token from Google.', str(response.text))
    
    access_token = response.json()['access_token']

    return access_token

# Get user info from google
def google_get_user_info(access_token: str) -> Dict[str, Any]:
    response = requests.get(
        GOOGLE_USER_INFO_URL,
        params={'access_token': access_token}
    )
    print(response, response.text)

    if not response.ok:
        raise ValidationError('Could not get user info from Google.')
    
    return response.json()

def helper_function_google(user_data, is_business=False):
    # Creates user in DB if first time login
    user, created = User.objects.get_or_create(
        email=user_data['email'],
    )

    # If the user is created for the first time, additional data can be processed
    if created:
        user.username = user_data.get('email', '').split('@')[0] + user_data.get('given_name','') + user_data.get('family_name', '') # = True  # : Set is_business to True of if the request is from service_portal
        user.first_name =  user_data.get('given_name', None)
        user.last_name = user_data.get('family_name', None)
        user.is_business = is_business
        if 'dob' in user_data:
            user.dob = user_data['dob']
        if 'picture' in user_data:
            # Download the image from URL and save it as user's profile picture
            img_temp = NamedTemporaryFile(delete=True)
            img_temp.write(requests.get(user_data['picture']).content)
            img_temp.flush()
            user.image.save(f"user_{user.pk}_profile_picture.jpg", File(img_temp))
        
        user.save()
        # Additional processing for first-time users
        profile_data = {
            'email': user_data['email'],
            'first_name': user_data.get('given_name'),
            'last_name': user_data.get('family_name'),
        }
            
        
        title   = f"Welcome to TimeSaverPlus"
        content = f"You are successfully registerd. We hope you have an wonderful experience ahead."
        # Create a new notification instance
        # notification = Notification.objects.create(
        #     system=False, 
        #     user=user, 
        #     title=title,
        #     content=content,
        #     status=0,  
        # )

        # notification.save()
    else:
        if 'picture' in user_data:
            # Download the image from URL and save it as user's profile picture
            img_temp = NamedTemporaryFile(delete=True)
            img_temp.write(requests.get(user_data['picture']).content)
            img_temp.flush()
            user.image.save(f"user_{user.pk}_profile_picture.jpg", File(img_temp))
        
        user.save()
        # If the user already exists, return only basic profile data
        profile_data = {
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
        }
    return profile_data

def get_user_data(validated_data, redirect_uri=settings.GOOGLE_REDIRECT_URL_MAINPORTAL, is_business=False):

    code = validated_data.get('code')
    error = validated_data.get('error')

    if error or not code:
        params = urlencode({'error': error})
        return redirect(f'{redirect}/login?{params}')
    
    access_token = google_get_access_token(code=code, redirect_uri=redirect_uri)
    user_data = google_get_user_info(access_token=access_token)
    return helper_function_google(user_data, is_business=is_business)
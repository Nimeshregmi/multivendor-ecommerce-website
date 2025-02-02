

from django.urls import path, include
from users.views import *

urlpatterns = [
     path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', CustomTokenVerifyView.as_view(), name='token_verify'),
    path('signup/', signup, name='signup'),
    path('change_password/', Change_Password, name='change_password'),
    path('login/', login, name='login'),
    path('google_login/', google_login, name='google_login'),
    path('accounts/', include('allauth.urls')),
    path('update-profile/', UserProfileUpdateView.as_view(), name='update-profile'),
    path('update-business-details/', BusinessDetailsUpdateView.as_view(), name='update-business-details'),
]

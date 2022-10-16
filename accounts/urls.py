from django.urls import path
from . import views

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)


app_name = 'accounts'

urlpatterns = [
    path('register', views.Register.as_view(), name='register_view'),

    path('login', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('authenticate', TokenVerifyView.as_view(), name='token_verify'),
]

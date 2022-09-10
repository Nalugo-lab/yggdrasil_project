from django.urls import path
from . import views

app_name = 'accounts'

urlpatterns = [
    path('register', views.Register.as_view(), name='register_view'),
    path('login', views.Login.as_view(), name='login_view'),
    path('logout', views.Logout.as_view(), name='logout_view'),
    path('authenticate', views.Authenticate.as_view(), name='authenticate_view'),

]

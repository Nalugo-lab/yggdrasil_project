from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import UserSerializer
from django.shortcuts import redirect

from django.contrib.auth import authenticate, login, logout

from .models import User

# Create your views here.


class Register(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return redirect('/login')


class Authenticate(APIView):
    def post(self, request):

        # username = request.data['username']
        # password = request.data['password']
        # user = authenticate(request, username=username, password=password)

        # if user is not None:
        #     response = Response()
        #     response.data = {
        #         'user': UserSerializer(user).data
        #     }

        if (request.user.is_anonymous):
            raise AuthenticationFailed('User not found')

        response = Response()
        response.data = {
            'user': UserSerializer(request.user).data
        }
        return response


class Logout(APIView):
    def post(self, request):
        logout(request)

        response = Response()
        response.data = {
            'success': True,
        }
        return response

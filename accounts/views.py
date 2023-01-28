from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import AllowAny
from .serializers import UserSerializer
from accounts.models import User 
# import jwt 

class Register(APIView):
    def post(self, request):
        print(request)
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

# class Login(APIView):
#     def post(self, request):
#         email = request.data['email']
#         password = request.data['password']

#         user = User.objects.get(email=email)

#         if user is None:
#             raise AuthenticationFailed('User and/or password are incorrect')

#         if not user.check_password(password):
#             raise AuthenticationFailed('User and/or password are incorrect')

#         return Response({"detail": "success"})
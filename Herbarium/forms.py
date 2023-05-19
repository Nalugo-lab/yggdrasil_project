from django import forms
from .models import *

class Plant_image_Form(forms.ModelForm):
    class Meta:
        model = Plant_image
        exclude = ['plant']
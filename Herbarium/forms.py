from dataclasses import field
from django import forms
from .models import *


class Plant_Form(forms.ModelForm):
    family: forms.ModelChoiceField(
        queryset=Family.objects.all(),
        to_field_name='name',
        required=True,
        widget=forms.Select(attrs={'class': 'form-control'})
    )

    class Meta:
        model = Plant
        exclude = ['last_watered', 'last_fertilized']

class Plant_image_Form(forms.ModelForm):
    class Meta:
        model = Plant_image
        exclude = ['plant']
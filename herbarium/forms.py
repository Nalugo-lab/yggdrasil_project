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
        widgets = {
            # 'last_watered': forms.DateInput(attrs={'type': 'date'})

        }
        exclude = ['last_watered', 'species']

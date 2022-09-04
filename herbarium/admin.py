from django.contrib import admin
from .models import *

# Register your models here.

admin.site.register(Group)
admin.site.register(Family)
admin.site.register(Genus)
admin.site.register(Species)

admin.site.register(Sun_Preference)
admin.site.register(Soil)
admin.site.register(Plant)

from django.urls import path
from . import views

app_name = 'herbarium'

urlpatterns = [
    path('families', views.getAllFamilies, name='get_all_families'),
    path('groups', views.getAllGroups, name='get_all_groups'),
    path('genera', views.getAllGenera, name='get_all_genera'),
    path('species', views.getAllSpecies, name='get_all_species'),

    path('sun_preferences', views.getAllSun_preferences,
         name='get_all_sun_preferences'),
    path('soils', views.getAllSoils, name='get_all_soils'),

    path('plants', views.PlantView.as_view(), name='plantView'),

    path('plants/scientific/<group>', views.GetFamilies, name='get_families'),
    path('plants/scientific/<group>/<family>', views.GetGenera, name='get_genera'),
    path('plants/scientific/<group>/<family>/<genus>', views.GetSpecies, name='get_species'),
    path('plants/scientific/<group>/<family>/<genus>/<species>', views.GetSpecimen, name='get_species'),
]
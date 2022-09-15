from django.urls import path
from . import views

app_name = 'herbarium'

urlpatterns = [
    path('', views.index, name='index'),

    path('families/getAll', views.getAllFamilies, name='get_all_families'),
    path('groups/getAll', views.getAllGroups, name='get_all_groups'),
    path('genera/getAll', views.getAllGenera, name='get_all_genera'),
    path('species/getAll', views.getAllSpecies, name='get_all_species'),

    path('sun_preferences/getAll', views.getAllSun_preferences,
         name='get_all_sun_preferences'),
    path('soils/getAll', views.getAllSoils, name='get_all_soils'),

    path('plants/getAll', views.getAllPlants, name='get_all_plants'),

    path('plants/add', views.PlantCreateView.as_view(), name='plant_create'),
    path('plants/<id>/edit', views.PlantEditView.as_view(), name='plant_edit'),
    path('plants/<id>/delete', views.PlantRemoveView.as_view(), name="plant_delete"),
    path('plants/<id>/detailed', views.PlantReadView.as_view(), name="plant_read"),

    path('<group>', views.GetFamilies, name='get_families'),
    path('<group>/<family>', views.GetGenera, name='get_genera'),
    path('<group>/<family>/<genus>', views.GetSpecies, name='get_species'),
    path('<group>/<family>/<genus>/<species>',
         views.GetSpeciment, name='get_species'),
]

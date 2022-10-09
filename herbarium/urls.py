from django.urls import path, include
from . import views
from rest_framework import routers
app_name = 'herbarium'


router = routers.DefaultRouter()

router.register('group', views.Group_ViewSet)
router.register('family', views.Family_ViewSet)
router.register('genus', views.Genus_ViewSet)
router.register('species', views.Species_ViewSet)
router.register('sun_preference', views.Sun_preference_ViewSet)
router.register('soil', views.Soil_ViewSet)
router.register('plant', views.Plant_ViewSet)



urlpatterns = [
    path('', include(router.urls)),


    path('plants/scientific/<group>', views.GetFamilies, name='get_families'),
    path('plants/scientific/<group>/<family>', views.GetGenera, name='get_genera'),
    path('plants/scientific/<group>/<family>/<genus>', views.GetSpecies, name='get_species'),
    path('plants/scientific/<group>/<family>/<genus>/<species>', views.GetSpecimen, name='get_species'),
]

    # path('plants', views.PlantView.as_view(), name='plantView'),

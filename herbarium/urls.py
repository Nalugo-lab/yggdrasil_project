from django.urls import path, include
from . import views
from rest_framework import routers
app_name = 'herbarium'


router = routers.DefaultRouter()

router.register('groups', views.Group_ViewSet)
router.register('families', views.Family_ViewSet)
router.register('genera', views.Genus_ViewSet)
router.register('species', views.Species_ViewSet)
router.register('sun_preferences', views.Sun_preference_ViewSet)
router.register('soils', views.Soil_ViewSet)
router.register('plants', views.Plant_ViewSet)



urlpatterns = [
    path('', include(router.urls)),

    path('scientific/<group>', views.Family_List.as_view(), name='get_families'),
    path('scientific/<group>/<family>', views.Genus_List.as_view(), name='get_genera'),
    path('scientific/<group>/<family>/<genus>', views.Species_List.as_view(), name='get_species'),
]

    # path('plants', views.PlantView.as_view(), name='plantView'),

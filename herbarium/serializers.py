from rest_framework import serializers
from .models import Plant, PlantImages


class PlantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plant
        fields = ['owner', 'soil_preference', 'sun_preference', 'species',
                  'id', 'owner', 'popular_name', 'custom_name', 'complementary_name',
                  'soil_preference', 'sun_preference', 'last_watered',
                  'species']


def get_banner_url(self, plant):
    request = self.context.get('request')
    bannerImage = PlantImages.objects.get(
        plant_id=plant['id'], banner=True)

    photo_url = bannerImage.image.url

    return request.build_absolute_uri(photo_url)

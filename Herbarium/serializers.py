from attr import field
from rest_framework import serializers
from yaml import serialize

from accounts.serializers import UserSerializer
from .models import *


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ('id', 'name')


class FamilySerializer(serializers.ModelSerializer):
    group = GroupSerializer()

    class Meta:
        model = Family
        fields = ('id', 'name', 'group')


class GenusSerializer(serializers.ModelSerializer):
    family = FamilySerializer()

    class Meta:
        model = Genus
        fields = ('id', 'name', 'family')


class SpeciesSerializer(serializers.ModelSerializer):
    genus = GenusSerializer()

    class Meta:
        model = Species
        fields = ('id', 'name', 'genus')


class SoilSerializer(serializers.ModelSerializer):
    class Meta:
        model = Soil
        fields = ('id', 'name', 'description')


class Sun_preferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sun_preference
        fields = ('id', 'name', 'description')


class PlantSerializer(serializers.ModelSerializer):
    species = SpeciesSerializer()
    soil = SoilSerializer()
    sun_preference = Sun_preferenceSerializer()
    banner = serializers.SerializerMethodField("get_banner_url")
    owner = UserSerializer()

    class Meta:
        model = Plant
        fields = ('owner', 'soil', 'sun_preference', 'species', 'banner',
                  'id', 'popular_name', 'custom_name', 'complementary_name',
                  'last_watered', 'last_fertilized')

    def get_banner_url(self, plant):
        banner = Plant_image.objects.get(plant=plant, is_banner=True)

        return banner.image.url

from django.forms.models import model_to_dict
from django.http import HttpResponse

from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.decorators import *
from rest_framework.permissions import IsAuthenticated, AllowAny

from herbarium.serializers import *
from herbarium.forms import *

# Create your views here.


class Group_ViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


class Family_ViewSet(viewsets.ModelViewSet):
    queryset = Family.objects.all()
    serializer_class = FamilySerializer


class Genus_ViewSet(viewsets.ModelViewSet):
    queryset = Genus.objects.all()
    serializer_class = GenusSerializer


class Species_ViewSet(viewsets.ModelViewSet):
    queryset = Species.objects.all()
    serializer_class = SpeciesSerializer


class Soil_ViewSet(viewsets.ModelViewSet):
    queryset = Soil.objects.all()
    serializer_class = SoilSerializer


class Sun_preference_ViewSet(viewsets.ModelViewSet):
    queryset = Sun_preference.objects.all()
    serializer_class = Sun_preferenceSerializer

# @permission_classes([IsAuthenticated])


class Plant_ViewSet(viewsets.ModelViewSet):
    queryset = Plant.objects.all()
    serializer_class = PlantSerializer

    # def list(self, request):
    #     pass

    def create(self, request):
        print(request.COOKIES)
        print(request.headers)

        data = request.POST.copy()
        print(request.user)
        data['owner'] = request.user
        form = Plant_Form(data)

        if form.is_valid():
            formImage = Plant_image_Form({}, request.FILES)

            if formImage.is_valid():
                plant = form.save()
                image = formImage.save()
                image.plant = plant
                image.is_banner = True
                image.save()

                return Response(status=200)

        return Response(form.errors.as_json())

    # def retrieve(self, request, pk=None):
    #     pass

    # def update(self, request, pk=None):
    #     pass

    # def partial_update(self, request, pk=None):
    #     pass

    # def destroy(self, request, pk=None):
    #     pass


@api_view(('GET',))
def GetFamilies(request, group):
    try:
        group = int(group)
    except ValueError:
        pass

    if isinstance(group, int):
        GROUP = Group.objects.get(id=group)

    else:
        GROUP = Group.objects.get(name=group)

    FAMILIES = list(Family.objects.filter(group=GROUP).values())

    return Response(FAMILIES)


@api_view(('GET',))
def GetGenera(request, group, family):
    try:
        group = int(group)
        family = int(family)

    except ValueError:
        pass

    if (isinstance(group, int)):
        GROUP = Group.objects.get(id=group)
        FAMILY = Family.objects.get(id=family)

    if (isinstance(group, str)):
        GROUP = Group.objects.get(name=group)
        FAMILY = Family.objects.get(name=family)

    GENERA = list(Genus.objects.filter(
        family=FAMILY, family__group=GROUP).values())

    return Response(GENERA)


@api_view(('GET',))
def GetSpecies(request, group, family, genus):
    try:
        group = int(group)
        family = int(family)
        genus = int(genus)

    except ValueError:
        pass

    if (isinstance(group, int)):
        GROUP = Group.objects.get(id=group)
        FAMILY = Family.objects.get(id=family)
        GENUS = Genus.objects.get(id=genus)

    if (isinstance(group, str)):
        GROUP = Group.objects.get(name=group)
        FAMILY = Family.objects.get(name=family)
        GENUS = Genus.objects.get(name=genus)

    SPECIES = list(Species.objects.filter(
        genus=GENUS, genus__family=FAMILY, genus__family__group=GROUP).values())

    return Response(SPECIES)


@api_view(('GET',))
def GetSpecimen(request, group, family, genus, species):
    SPECIES = Species.objects.get(
        name=species, genus__name=genus, genus__family__name=family)

    data = model_to_dict(SPECIES)
    data['genus'] = genus
    data['family'] = family
    data['group'] = group

    return Response(data)


def test(request):
    print(request.headers)
    print(request.user)

    # return Response({'hugo': 'foda'})
    return HttpResponse('hi')

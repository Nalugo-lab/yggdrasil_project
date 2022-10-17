from socket import ALG_OP_DECRYPT
from django.forms.models import model_to_dict
from django.http import HttpResponse

from rest_framework.response import Response
from rest_framework import viewsets, generics
from rest_framework.views import APIView
from rest_framework.decorators import *
from rest_framework.permissions import IsAuthenticated, AllowAny

from herbarium.serializers import *
from herbarium.forms import *

# Create your views here.


class Group_ViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

    # def list(self, request):
    #     pass

    # def retrieve(self, request, pk=None):
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


class Family_List(generics.ListAPIView):
    serializer_class = FamilySerializer
    permission_classes = [AllowAny]
    lookup_url_kwarg = "group"

    def get_queryset(self):
        group = self.kwargs.get(self.lookup_url_kwarg)

        try:
            group = int(group)

        except ValueError:
            pass

        if (isinstance(group, int)):
            group = Group.objects.get(id=group)
        else:
            group = Group.objects.get(name=group)

        return Family.objects.filter(group=group)


class Family_ViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Family.objects.all()
    serializer_class = FamilySerializer


class Genus_List(generics.ListAPIView):
    serializer_class = GenusSerializer
    permission_classes = [AllowAny]
    lookup_url_kwarg = "family"

    def get_queryset(self):
        group = self.kwargs.get("group")
        family = self.kwargs.get(self.lookup_url_kwarg)

        try:
            group = int(group)
            family = int(family)

        except ValueError:
            pass

        if (isinstance(group, int)):
            group = Group.objects.get(id=group)
            family = Family.objects.get(id=family)

        else:
            group = Group.objects.get(name=group)
            family = Family.objects.get(name=family)

        return Genus.objects.filter(family=family, family__group=group)


class Genus_ViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Genus.objects.all()
    serializer_class = GenusSerializer


class Species_List(generics.ListAPIView):
    serializer_class = SpeciesSerializer
    permission_classes = [AllowAny]
    lookup_url_kwarg = "genus"

    def get_queryset(self):
        group = self.kwargs.get("group")
        family = self.kwargs.get("family")
        genus = self.kwargs.get(self.lookup_url_kwarg)

        try:
            group = int(group)
            family = int(family)
            genus = int(genus)

        except ValueError:
            pass

        if (isinstance(group, int)):
            group = Group.objects.get(id=group)
            family = Family.objects.get(id=family)
            genus = Genus.objects.get(id=genus)

        else:
            group = Group.objects.get(name=group)
            family = Family.objects.get(name=family)
            genus = Genus.objects.get(name=genus, family=family)

        return Species.objects.filter(genus=genus, genus__family=family, genus__family__group=group)


class Species_ViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Species.objects.all()
    serializer_class = SpeciesSerializer


class Soil_ViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Soil.objects.all()
    serializer_class = SoilSerializer


class Sun_preference_ViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Sun_preference.objects.all()
    serializer_class = Sun_preferenceSerializer


class Plant_ViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Plant.objects.all()
    serializer_class = PlantSerializer

    # def list(self, request):
    #     pass

    def create(self, request):

        data = request.POST.copy()
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

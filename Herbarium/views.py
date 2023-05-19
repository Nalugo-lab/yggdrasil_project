from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt

from rest_framework.response import Response
from rest_framework import viewsets, generics, status
from rest_framework.views import APIView
from rest_framework.decorators import *
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.parsers import FormParser, JSONParser, MultiPartParser
from rest_framework.exceptions import NotFound

from Herbarium.serializers import *
from Herbarium.forms import *

# Create your views here.


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




class Group_ViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


class Family_ViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Family.objects.all()
    serializer_class = FamilySerializer


class Genus_ViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [AllowAny]
    serializer_class = GenusSerializer
    queryset = Genus.objects.all()


class Species_ViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Species.objects.all()
    serializer_class = SpeciesSerializer


class Soil_ViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Soil.objects.all()
    serializer_class = SoilSerializer


class Sun_regime_ViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Sun_regime.objects.all()
    serializer_class = Sun_regimeSerializer


class Plant_ViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Plant.objects.filter(is_archived=False)
    serializer_class = PlantSerializer
    parser_classes = (JSONParser, FormParser, MultiPartParser)

    def list(self, request):
        queryset = self.queryset.filter(owner=request.user)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        new_data = request.data
        new_data['owner'] = self.request.user
        print(new_data)
        serializer = self.get_serializer(data=new_data)
        serializer.is_valid(raise_exception=True)
        plant = serializer.save()
        form_image = Plant_image_Form({}, self.request.FILES)
        if form_image.is_valid():
            image = form_image.save(commit=False)
            image.plant = plant
            image.is_banner = True
            image.save()

    def update(self, serializer):
        serializer.save()

    def destroy(self, request, *args, **kwargs):
        try:
            plant = self.get_object()
            if plant.owner == request.user:
                self.perform_destroy(plant)
                return Response(status=status.HTTP_204_NO_CONTENT)
            else:
                return Response(status=status.HTTP_401_UNAUTHORIZED)
        except NotFound:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context


class Image_ViewSet(viewsets.ViewSet):
    @action(detail=False, methods=['post'])
    def create(self, request):
        try:
            owner = User.objects.get(username=request.user)
            plant = Plant.objects.get(pk=request.data['pk'], owner=owner)
        except:
            return Response(status=401)

        form = Plant_image_Form({}, request.FILES)

        if form.is_valid():
            image = form.save()
            image.plant = plant
            image.is_banner = False
            image.save()

            return Response(PlantSerializer(plant).data)

        return Response(form.errors.as_json())

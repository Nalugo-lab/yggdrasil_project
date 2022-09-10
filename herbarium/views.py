import json
from django.shortcuts import render, redirect
from django.http import JsonResponse
from herbarium.forms import *
from django.views.generic import TemplateView
from django.forms.models import model_to_dict
from django.contrib.auth.decorators import login_required

# Create your views here.


def index(request):
    plants = Plant.objects.all()
    return render(request, 'index.html', {'plants': plants})

# @login_required


def getAllGroups(request):
    print(request.COOKIES)
    GROUPS = list(Group.objects.values('id', 'name'))
    return JsonResponse({
        'context': GROUPS
    })


def getAllFamilies(request):
    family = Family.objects.select_related(
        'group').all().values('id', 'name', 'group__name')
    return JsonResponse({
        'context': list(family)
    })


def getAllGenera(request):
    genera = Genus.objects.select_related('family').all().values(
        'id', 'name', 'family__name', 'family__group__name')
    return JsonResponse({
        'context': list(genera)
    })


def getAllSpecies(request):
    genera = Species.objects.select_related('genus').all().values(
        'id', 'name', 'genus__name', 'genus__family__name', 'genus__family__group__name')
    return JsonResponse({
        'context': list(genera)
    })


def getAllSoils(request):
    soils = Soil.objects.values(
        'id', 'name', 'description')
    return JsonResponse({
        'context': list(soils)
    })


def getAllSun_preferences(request):
    sun_preferences = Sun_preference.objects.values(
        'id', 'name', 'description')
    return JsonResponse({
        'context': list(sun_preferences)
    })


def GetFamilies(request, group):
    try:
        group = int(group)
    except ValueError:
        pass

    if (isinstance(group, int)):
        GROUP = Group.objects.get(id=group)

    if (isinstance(group, str)):
        GROUP = Group.objects.get(name=group)

    FAMILIES = list(Family.objects.filter(group=GROUP).values())

    return JsonResponse({
        'context': FAMILIES
    })


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

    return JsonResponse({
        'context': GENERA
    })


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

    return JsonResponse({
        'context': SPECIES
    })


def GetSpeciment(request, group, family, genus, species):
    SPECIES = Species.objects.get(
        name=species, genus__name=genus, genus__family__name=family)

    data = model_to_dict(SPECIES)
    data['genus'] = genus
    data['family'] = family
    data['group'] = group

    return JsonResponse({
        'context': data
    })

# PLANT CRUD


class PlantCreateView(TemplateView):
    def post(self, request):
        data = json.loads(request.body.decode("utf-8"))
        data['owner'] = request.user
        # print(data)
        # postCopy = request.POST.copy()
        # postCopy['owner'] = request.user
        form = Plant_Form(data)
        
        if form.is_valid():
            form.save()
            print('salvou')
            return redirect('/')

        
        return JsonResponse({
            'context': form.errors.as_json()
        })


class PlantReadView(TemplateView):
    def get(self, request, id):
        plant = Plant.objects.get(id=id)
        return render(request, "plants/read.html", {'plant': plant})


class PlantEditView(TemplateView):
    def post(self, request, id):
        plant = Plant.objects.get(id=id)
        form = Plant_Form(request.POST, instance=plant)
        # CHECK IF USER IS PLANT USER
        if form.is_valid():
            form.save()
            return redirect('/herbarium')

    def get(self, request, id):
        plant = Plant.objects.get(id=id)
        form = Plant_Form(instance=plant)

        return render(request, "plants/edit.html", {'plant': plant, 'form': form})


class PlantRemoveView(TemplateView):
    def post(self, request, id):
        # CHECK IF USER IS PLANT USER
        plant = Plant.objects.get(id=id)

    def get(self, request, id):
        plant = Plant.objects.get(id=id)
        return render(request, "plants/delete.html", {'plant': plant})

from django.shortcuts import render, redirect
from django.http import JsonResponse
from herbarium.forms import *
from django.views.generic import TemplateView
from django.forms.models import model_to_dict
import json
# Create your views here.


def index(request):
    plants = Plant.objects.all()
    return render(request, 'index.html', {'plants': plants})


def getAllGroups(request):
    GROUPS = list(Group.objects.values('name'))
    return JsonResponse({
        'context': GROUPS
    })


def getAllFamilies(request):
    family = Family.objects.select_related(
        'group').all().values('name', 'group__name')
    return JsonResponse({
        'context': list(family)
    })


def getAllGenera(request):
    genera = Genus.objects.select_related('family').all().values(
        'name', 'family__name', 'family__group__name')
    return JsonResponse({
        'context': list(genera)
    })


def getAllSpecies(request):
    genera = Species.objects.select_related('genus').all().values(
        'name', 'genus__name', 'genus__family__name', 'genus__family__group__name')
    return JsonResponse({
        'context': list(genera)
    })


def GetFamilies(request, group):
    GROUP_ID = Group.objects.get(name=group)
    FAMILIES = list(Family.objects.filter(group_id=GROUP_ID).values())

    return JsonResponse({
        'context': FAMILIES
    })


def GetGenera(request, group, family):
    FAMILIES_ID = Family.objects.get(name=family)
    GENERA = list(Genus.objects.filter(family_id=FAMILIES_ID).values())

    return JsonResponse({
        'context': GENERA
    })


def GetSpecies(request, group, family, genus):
    SPECIES = list(Species.objects.filter(
        genus__name=genus, genus__family__name=family).values())

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
        form = Plant_Form(request.POST)
        if form.is_valid():
            form.save()
            return redirect('/herbarium')
        return render(request, "plants/create.html", {'form': form})

    def get(self, request):
        form = Plant_Form()
        print(request)
        return render(request, "plants/create.html", {'form': form})


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

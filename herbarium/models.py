from django.db import models

# Create your models here.


class Group(models.Model):
    class Meta:
        verbose_name_plural = "Groups"
        verbose_name = "Group"
        ordering = ['name']

    def __str__(self):
        return '%s' % (self.name)

    name = models.CharField(max_length=30)


class Family(models.Model):
    class Meta:
        verbose_name_plural = "Families"
        verbose_name = "Family"
        ordering = ['name']

    def __str__(self):
        return '%s' % (self.name)

    group = models.ForeignKey(Group, on_delete=models.PROTECT)
    name = models.CharField(max_length=30)


class Genus(models.Model):
    class Meta:
        verbose_name_plural = "Genera"
        verbose_name = "Genus"
        ordering = ['name']

    def __str__(self):
        return '%s' % (self.name)

    family = models.ForeignKey(Family, on_delete=models.PROTECT)
    name = models.CharField(max_length=30)


class Species(models.Model):
    class Meta:
        verbose_name_plural = "Species"
        verbose_name = "Species"
        ordering = ['name']

    def __str__(self):
        return '%s' % (self.name)

    genus = models.ForeignKey(Genus, on_delete=models.PROTECT)
    name = models.CharField(max_length=100)


class Sun_Preference(models.Model):
    class Meta:
        verbose_name_plural = "Sun preferences"
        verbose_name = "Sun preference"
        ordering = ['name']

    def __str__(self):
        return '%s' % (self.name)

    name = models.CharField(max_length=30)
    description = models.CharField(max_length=100)


class Soil(models.Model):
    class Meta:
        verbose_name_plural = "Soils"
        verbose_name = "Soil"
        ordering = ['name']

    def __str__(self):
        return '%s' % (self.name)

    name = models.CharField(max_length=30)
    description = models.CharField(max_length=100)


class Plant(models.Model):
    class Meta:
        verbose_name_plural = "Plants"
        verbose_name = "Plant"
        ordering = ['popular_name']

    popular_name = models.CharField(max_length=30)
    species = models.ForeignKey(Species, on_delete=models.PROTECT)
    last_watered = models.DateTimeField(null=True)
    sun_preference = models.ForeignKey(
        Sun_Preference, on_delete=models.PROTECT)
    soil_preference = models.ForeignKey(Soil, on_delete=models.PROTECT)

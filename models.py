import django.db import models

class Prices(models.Model):
  product = models.CharField(max_length=64)
  price = models.IntegerField()
  amount = models.IntegerField()

  def __str__(self):
    return product, price, amount

import django.db import models

class Product(models.Model):
  product = models.CharField(max_length=64)
  price = models.DecimalField(max_digits=10, decimal_places=2)
  amount = models.IntegerField()

  def __str__(self):
    return f"Item: {self.name} - ${self.price} - {self.amount} "

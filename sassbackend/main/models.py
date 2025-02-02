from django.db import models

# Create your models here.

class ProductDetail(models.Model):
    product_id = models.IntegerField()
    product_name = models.CharField(max_length=100)
    product_price = models.FloatField()
    product_image= models.ImageField(upload_to='product_image')
    product_description = models.TextField()
    product_rating = models.FloatField()
    product_download=models.IntegerField()
    product_category = models.CharField(max_length=100)

    def __str__(self):
        return self.product_name
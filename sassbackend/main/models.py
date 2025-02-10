
from django.conf import settings
from django.db import models
from django.utils.text import slugify
from users.models import Address


class Product(models.Model):
    class Meta:
        db_table = 'product'
    PRODUCT_TYPES = [
        ("physical", "Physical"),
        ("digital", "Digital"),
    ]
    # General Information
    name = models.CharField(max_length=255, unique=True)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True, null=True)
    category = models.ForeignKey('Category', on_delete=models.SET_NULL, null=True, blank=True)
    seller = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="products")
    tags = models.ManyToManyField('Tag', blank=True)
    product_type = models.CharField(max_length=10, choices=PRODUCT_TYPES, default="digital")
    
    # Pricing & Discounts
    price = models.DecimalField(max_digits=10, decimal_places=2)
    discount_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    discount_percentage = models.PositiveIntegerField(blank=True, null=True, help_text="Percentage discount (0-100)")
    is_on_sale = models.BooleanField(default=False)

    # Stock & Availability (for Physical Products)
    stock_quantity = models.PositiveIntegerField(default=0, help_text="Number of items in stock")
    # is_digital = models.BooleanField(default=False, help_text="Check if the product is digital (like software, AI models, etc.)")

    # Digital Product Fields
    download_link = models.URLField(blank=True, null=True, help_text="Link to download the digital product")
    file_upload = models.FileField(upload_to="products/digital/", blank=True, null=True)
    license_type = models.CharField(max_length=100, blank=True, null=True, help_text="Type of license (e.g., Personal, Commercial)")
    
    # Shipping (for Physical Products)
    weight = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True, help_text="Weight in KG")
    dimensions = models.CharField(max_length=100, blank=True, null=True, help_text="LxWxH in cm")
    shipping_cost = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    estimated_delivery_time = models.CharField(max_length=100, blank=True, null=True, help_text="E.g., 3-5 business days")

    # Media
    image = models.ImageField(upload_to="products/images/", blank=True, null=True)
    additional_images = models.ManyToManyField('ProductImage', blank=True, related_name="products")

    # Ratings & Reviews
    average_rating = models.FloatField(default=0.0)
    total_reviews = models.PositiveIntegerField(default=0)

    # Status & Visibility
    is_featured = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    # Date Tracking
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name
    def update_rating(self):
        """Update the average rating and total reviews count."""
        reviews = self.reviews.all()
        total_reviews = reviews.count()

        if total_reviews > 0:
            avg_rating = sum(review.rating for review in reviews) / total_reviews
        else:
            avg_rating = 0.0

        self.average_rating = round(avg_rating, 1)
        self.total_reviews = total_reviews
        self.save()
    def reduce_stock(self, quantity):
        """Reduce stock only if the product is physical"""
        if self.product_type == "physical" and self.stock >= quantity:
            self.stock -= quantity
            self.save()
        elif self.stock < quantity:
            raise ValueError(f"Not enough stock for {self.name}")

class ProductImage(models.Model):
    product = models.ForeignKey(
        Product, 
        on_delete=models.CASCADE, 
        related_name="productimages"  
    )
    image = models.ImageField(upload_to="products/images/")
    
    def __str__(self):
        return f"Image for {self.product.name}"


class Category(models.Model):
    name = models.CharField(max_length=255, unique=True)
    slug = models.SlugField(unique=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

class Tag(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class Review(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    product = models.ForeignKey('Product', on_delete=models.CASCADE, related_name='reviews')
    rating = models.PositiveIntegerField(help_text="Rating from 1 to 5",blank=True, null=True)
    review_text = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'product')  # Prevent duplicate reviews

    def __str__(self):
        return f"{self.user.username} - {self.product.name} ({self.rating} stars)"



class OrderItem(models.Model):
    order = models.ForeignKey("Order", on_delete=models.CASCADE, related_name="order_items")
    product = models.ForeignKey("Product", on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2)  # Price at purchase time

    def __str__(self):
        return f"{self.quantity} x {self.product.name}"

class Order(models.Model):
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("processing", "Processing"),
        ("shipped", "Shipped"),
        ("delivered", "Delivered"),
        ("cancelled", "Cancelled"),
    ]

    PAYMENT_METHODS = [
        ("cod", "Cash on Delivery"),
        ("card", "Credit/Debit Card"),
        ("paypal", "PayPal"),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="orders")
    items = models.ManyToManyField(OrderItem,related_name="order_set")  # Related items
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    discount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00, blank=True, null=True)
    tax = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    final_total = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    shipping_address = models.ForeignKey(Address, on_delete=models.SET_NULL, null=True, related_name="shipping_orders")
    billing_address = models.ForeignKey(Address, on_delete=models.SET_NULL, null=True, related_name="billing_orders")

    payment_method = models.CharField(max_length=10, choices=PAYMENT_METHODS, default="cod")
    payment_status = models.BooleanField(default=False)  # True if paid
    order_status = models.CharField(max_length=15, choices=STATUS_CHOICES, default="pending")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def calculate_totals(self):
        """Calculate total price, apply discount, and compute final total."""
        total = sum(item.quantity * item.price for item in self.items.all())
        self.total_price = total
        self.final_total = (total - (self.discount or 0)) + self.tax
        self.save()

    def __str__(self):
        return f"Order {self.id} by {self.user.username} - {self.order_status}"




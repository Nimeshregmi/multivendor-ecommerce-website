import random
import string
from rest_framework import serializers
from .models import *
from users.models import Address

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image']

class ProductSerializer(serializers.ModelSerializer):
    seller = serializers.HiddenField(default=serializers.CurrentUserDefault())
    slug = serializers.CharField(read_only=True)  # Auto-generated slug
    images = ProductImageSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'slug', 'description', 'category', 'seller', 'tags',
            'price', 'discount_price', 'discount_percentage', 'is_on_sale',
            'stock_quantity', 'product_type', 'download_link', 'file_upload',
            'license_type', 'weight', 'dimensions', 'shipping_cost', 
            'estimated_delivery_time', 'image', 'images',
            'average_rating', 'total_reviews', 'is_featured', 'is_active',
            'created_at', 'updated_at'
        ]
    
    def create(self, validated_data):
        """Auto-generate slug with random string and assign seller"""
        request = self.context.get('request')
        user = request.user if request else None
        name = validated_data.get('name', '')

        # Generate a random string
        random_str = ''.join(random.choices(string.ascii_uppercase + string.digits, k=8))
        slug = f"{name.lower().replace(' ', '-')}-{random_str}"

        validated_data['slug'] = slug
        validated_data['seller'] = user
        return super().create(validated_data)


class ReviewSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Review
        fields = ['id', 'user', 'product', 'rating', 'review_text', 'created_at']

    def validate(self, data):
        """Ensure user has purchased the product before reviewing"""
        user = self.context['request'].user
        product = data['product']

        if not Order.objects.filter(user=user, items__product=product).exists():
            raise serializers.ValidationError("You can only review products you have purchased.")

        if Review.objects.filter(user=user, product=product).exists():
            raise serializers.ValidationError("You have already reviewed this product.")

        return data

    def create(self, validated_data):
        """Create review and update product rating"""
        review = Review.objects.create(**validated_data)
        review.product.update_rating()  # Update product stats
        return review

class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    product_id = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all(), write_only=True)

    class Meta:
        model = OrderItem
        fields = ["id", "product", "product_id", "quantity", "price"]

    def create(self, validated_data):
        product = validated_data.pop("product_id")
        order_item = OrderItem.objects.create(product=product, **validated_data)
        return order_item

class OrderSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    items = OrderItemSerializer(many=True)
    shipping_address = serializers.PrimaryKeyRelatedField(queryset=Address.objects.all())
    billing_address = serializers.PrimaryKeyRelatedField(queryset=Address.objects.all())

    class Meta:
        model = Order
        fields = [
            "id", "user", "items", "total_price", "discount", "tax", "final_total",
            "shipping_address", "billing_address", "payment_method", "payment_status",
            "order_status", "created_at", "updated_at"
        ]
        read_only_fields = ["total_price", "final_total", "order_status", "created_at", "updated_at"]

    def validate(self, data):
        """Check stock availability before creating an order"""
        items_data = data["items"]

        for item_data in items_data:
            product = item_data["product_id"]

            if product.product_type == "physical" and product.stock < item_data["quantity"]:
                raise serializers.ValidationError(
                    f"Not enough stock for {product.name}. Available: {product.stock}"
                )

        return data

    def create(self, validated_data):
        """Create an order and reduce stock for physical products"""
        items_data = validated_data.pop("items")
        order = Order.objects.create(**validated_data)

        for item_data in items_data:
            product = item_data.pop("product_id")
            order_item = OrderItem.objects.create(order=order, product=product, **item_data)

            # Reduce stock if the product is physical
            if product.product_type == "physical":
                product.reduce_stock(order_item.quantity)

        order.calculate_totals()
        return order

from django.contrib import admin
from .models import Product, ProductImage, Category, Tag

class ProductImageInline(admin.TabularInline):
    """Allows adding multiple images directly in the Product admin panel."""
    model = ProductImage
    extra = 1  # Shows an empty slot for adding a new image


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'seller', 'price', 'is_on_sale', 'stock_quantity', 'product_type', 'is_featured', 'created_at')
    list_filter = ('is_on_sale', 'product_type', 'is_featured', 'category', 'seller')
    search_fields = ('name', 'seller__username', 'category__name')
    prepopulated_fields = {'slug': ('name',)}
    readonly_fields = ('created_at', 'updated_at', 'slug')
    inlines = [ProductImageInline]  # Allows managing images inside the Product admin
    actions = ['toggle_featured']

    def toggle_featured(self, request, queryset):
        """Bulk action to toggle 'is_featured' status."""
        for product in queryset:
            product.is_featured = not product.is_featured
            product.save()
        self.message_user(request, "Selected products' 'is_featured' status has been updated.")
    toggle_featured.short_description = "Toggle Featured Status"

@admin.register(ProductImage)
class ProductImageAdmin(admin.ModelAdmin):
    list_display = ('product', 'image')
    search_fields = ('product__name',)

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ('name',)

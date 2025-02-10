from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import *
from .serializers import *
from .permission import IsSellerOrAdmin
from .filters import ProductFilter
from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend # type: ignore

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsSellerOrAdmin]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_class = ProductFilter
    search_fields = [
        'name', 
        'description', 
        'tags__name', 
        'category__name', 
        'seller__username'
    ]
    ordering_fields = ['price', 'average_rating', 'created_at']
    ordering = ['-created_at']  # Default ordering

    def perform_create(self, serializer):
        """Ensure the seller is always request.user"""
        serializer.save(seller=self.request.user)

    def get_queryset(self):
        """Allow filtering by seller or category"""
        queryset = Product.objects.all()
        # seller = self.request.query_params.get('seller')
        category = self.request.query_params.get('category')
        slug = self.request.query_params.get('slug')

        if slug:
            queryset = queryset.filter(slug=slug)
        # if seller:
        #     queryset = queryset.filter(seller__id=seller)
        if category:
            queryset = queryset.filter(category__id=category)
        return queryset

    @action(detail=True, methods=['POST'])
    def toggle_featured(self, request, pk=None):
        """Toggle the 'is_featured' field"""
        product = self.get_object()
        product.is_featured = not product.is_featured
        product.save()
        return Response({'status': 'featured toggled'})

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsSellerOrAdmin]

    def get_queryset(self):
        """Filter reviews based on product"""
        queryset = Review.objects.all()
        product_id = self.request.query_params.get('product')

        if product_id:
            queryset = queryset.filter(product__id=product_id)

        return queryset

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all().order_by("-created_at")
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """Only allow users to see their own orders."""
        return self.queryset.filter(user=self.request.user)

    @action(detail=True, methods=["POST"])
    def cancel_order(self, request, pk=None):
        """Allow users to cancel orders if they are not yet shipped and restock physical products."""
        order = self.get_object()
        
        if order.order_status in ["pending", "processing"]:
            order.order_status = "cancelled"
            order.save()

            # Restock physical products if the order is cancelled
            for item in order.items.all():
                if item.product.product_type == "physical":
                    item.product.stock += item.quantity
                    item.product.save()

            return Response({"status": "Order cancelled and stock updated."})
        
        return Response({"error": "Order cannot be cancelled"}, status=400)

class OrderItemViewSet(viewsets.ModelViewSet):
    serializer_class = OrderItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return OrderItem.objects.filter(order__user=self.request.user)
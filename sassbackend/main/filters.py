import django_filters # type: ignore
from django.db.models import Q
from .models import Product

class ProductFilter(django_filters.FilterSet):
    min_price = django_filters.NumberFilter(field_name="price", lookup_expr='gte')
    max_price = django_filters.NumberFilter(field_name="price", lookup_expr='lte')
    search = django_filters.CharFilter(method='filter_search')
    min_rating = django_filters.NumberFilter(field_name="average_rating", lookup_expr='gte')
    max_rating = django_filters.NumberFilter(field_name="average_rating", lookup_expr='lte')
    category = django_filters.CharFilter(field_name="category__name", lookup_expr='icontains')
    seller = django_filters.CharFilter(method='filter_by_seller_username')
    slug = django_filters.CharFilter(field_name="slug", lookup_expr='exact')

    class Meta:
        model = Product
        fields = ['product_type', 'seller']

    def filter_by_seller_username(self, queryset, name, value):
        """
        Custom filter method to filter products by seller username.
        """
        return queryset.filter(seller__username__icontains=value)

    def filter_search(self, queryset, name, value):
        # Remove quotes if present
        value = value.strip('"\'')
        
        # Split search term into individual words
        search_terms = value.split()
        
        # Create a base queryset
        base_qs = queryset
        
        # Create a Q object for each search term
        q_objects = Q()
        for term in search_terms:
            q_objects |= (
                Q(name__icontains=term) |
                Q(description__icontains=term) |
                Q(tags__name__icontains=term) |
                Q(category__name__icontains=term) |
                Q(seller__username__icontains=term)
            )
        
        # Filter the queryset
        filtered_qs = base_qs.filter(q_objects).distinct()
        
        # Annotate with match count for prioritization
        from django.db.models import Count, Case, When, IntegerField
        match_count = (
            Count(
                Case(
                    *[When(name__icontains=term, then=1) for term in search_terms],
                    output_field=IntegerField()
                )
            ) +
            Count(
                Case(
                    *[When(description__icontains=term, then=1) for term in search_terms],
                    output_field=IntegerField()
                )
            ) +
            Count(
                Case(
                    *[When(tags__name__icontains=term, then=1) for term in search_terms],
                    output_field=IntegerField()
                )
            ) +
            Count(
                Case(
                    *[When(category__name__icontains=term, then=1) for term in search_terms],
                    output_field=IntegerField()
                )
            ) +
            Count(
                Case(
                    *[When(seller__username__icontains=term, then=1) for term in search_terms],
                    output_field=IntegerField()
                )
            )
        )
        
        # Order by match count descending
        return filtered_qs.annotate(match_count=match_count).order_by('-match_count')

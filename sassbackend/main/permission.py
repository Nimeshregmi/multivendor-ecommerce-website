from rest_framework import permissions

class IsSellerOrAdmin(permissions.BasePermission):
    """
    Custom permission to allow only sellers or admins to create, update, or delete products.
    """

    def has_permission(self, request, view):
        # Allow GET requests for all users
        if request.method == 'GET':
            return True
        # Ensure user is authenticated
        if not request.user or not request.user.is_authenticated:
            return False
        
        # Check if user is a seller or admin
        if hasattr(request.user, 'profile'):
            return request.user.role in ['SELLER','seller','admin', 'ADMIN']

        return False

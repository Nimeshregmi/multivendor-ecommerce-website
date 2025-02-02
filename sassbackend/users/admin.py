from django.contrib import admin
from .models import User, UserProfile, BusinessDetails

class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email', 'role', 'is_active', 'is_staff', 'is_superuser']

class ProfileAdmin(admin.ModelAdmin):
    list_editable = ['verified']
    list_display = ['user', 'username', 'email', 'phone', 'bio', 'image', 'verified']

    # Adding username and email to UserProfile
    def username(self, obj):
        return obj.user.username
    username.admin_order_field = 'user__username'
    username.short_description = 'Username'

    def email(self, obj):
        return obj.user.email
    email.admin_order_field = 'user__email'
    email.short_description = 'Email'

class BusinessDetailsAdmin(admin.ModelAdmin):
    list_display = ['user', 'company_name', 'business_phone', 'total_employee', 'verified', 'username', 'email']

    # Adding username and email to BusinessDetails
    def username(self, obj):
        return obj.user.username
    username.admin_order_field = 'user__username'
    username.short_description = 'Username'

    def email(self, obj):
        return obj.user.email
    email.admin_order_field = 'user__email'
    email.short_description = 'Email'

# Register your models
admin.site.register(User, UserAdmin)
admin.site.register(UserProfile, ProfileAdmin)
admin.site.register(BusinessDetails, BusinessDetailsAdmin)

from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver


class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)

class Address(models.Model):
    class Meta:
        db_table = 'address'  

    id = models.AutoField(primary_key=True)
    street_address = models.CharField(max_length=255, null=True, blank=True)
    city = models.CharField(max_length=255, null=True, blank=True)
    state = models.CharField(max_length=255, null=True, blank=True)
    country = models.CharField(max_length=255, null=True, blank=True)
    country_code = models.CharField(max_length=255, null=True, blank=True)
    longitude = models.CharField(max_length=50, null=True, blank=True)
    latitude = models.CharField(max_length=50, null=True, blank=True)
    postal_code = models.CharField(max_length=255, null=True, blank=True)
    default = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.street_address}, {self.city}, {self.country}"
class BusinessDetails(models.Model):
    class Meta:
        db_table = 'businessdetails'  

    id = models.AutoField(primary_key=True)
    user = models.OneToOneField('User', on_delete=models.CASCADE, related_name='user_business_details', null=True, blank=True)
    business_phone = models.CharField(max_length=255, null=True, blank=True)
    company_name = models.CharField(max_length=253, null=True, blank=True)
    bio = models.TextField(null=True, blank=True)
    total_employee = models.IntegerField(null=True, blank=True)
    verified = models.BooleanField(default=False)  # Admin verification

    def __str__(self):
        return self.company_name or "Unnamed Business"

class UserProfile(models.Model):
    user = models.OneToOneField(
        'User', on_delete=models.CASCADE, related_name='profile'
    )
    phone = models.CharField(max_length=255, blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='profile_pics', blank=True, null=True)
    verified = models.BooleanField(default=False)

    def __str__(self):
        return self.user.email

AUTH_PROVIDER = {'google': 'google', 'facebook': 'facebook', 'email': 'email', 'github': 'github'}

class User(AbstractBaseUser, PermissionsMixin):
    class Meta:
        db_table = 'users'

    ROLES = [
        ('buyer', 'Buyer'),
        ('seller', 'Seller'),
    ]

    full_name = models.CharField(max_length=255)
    username = models.CharField(max_length=255, unique=True)
    email = models.EmailField(unique=True)
    dob = models.DateField(blank=True, null=True)
    phone = models.CharField(max_length=255)
    role = models.CharField(max_length=10, choices=ROLES, default='buyer')
    created_at = models.DateTimeField(auto_now_add=True)
    is_verified = models.BooleanField(default=False)  #Email verification
    verification_token = models.CharField(max_length=100, blank=True, null=True) #Verification token
    token_created_at = models.DateTimeField(blank=True, null=True) #token lifetime
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_seller_approved = models.BooleanField(default=False)  # Admin approval for sellers
    business_details = models.ForeignKey(BusinessDetails,related_name='business_details_user', on_delete=models.CASCADE, null=True, blank=True)
    address = models.ForeignKey(Address, on_delete=models.CASCADE, null=True, blank=True)
    objects = UserManager()
    auth_provider = models.CharField(max_length=255, default=AUTH_PROVIDER['email'], blank=False)
    profile_info = models.OneToOneField(UserProfile, on_delete=models.CASCADE, related_name='user_profile', null=True, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email

    def is_seller(self):
        return self.role == 'seller' and self.is_seller_approved
        
    def generate_verification_token(self):
        self.verification_token = get_random_string(50)
        self.token_created_at = timezone.now()
        self.save()

    def is_token_valid(self):
        if self.token_created_at:
            return timezone.now() <= self.token_created_at + timedelta(minutes=10)
        return False


    
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)


# Signal to save UserProfile when User is updated
@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    if hasattr(instance, 'profile_info') and instance.profile_info:
        instance.profile_info.save()
    elif not hasattr(instance, 'profile_info'):
        pass

@receiver(post_save, sender=User)
def create_business_details(sender, instance, created, **kwargs):
    if created and instance.role == 'seller':  # Check if the user is a seller
        # Create BusinessDetails for the seller
        BusinessDetails.objects.create(user=instance)

# Signal to save BusinessDetails when User is updated
@receiver(post_save, sender=User)
def save_business_details(sender, instance, **kwargs):
    if hasattr(instance, 'business_details') and instance.business_details:
        instance.business_details.save()
    elif not hasattr(instance, 'business_details'):
        pass





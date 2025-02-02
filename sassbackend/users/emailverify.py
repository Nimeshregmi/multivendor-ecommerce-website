from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.utils import timezone

def verify_email(request):
    token = request.GET.get('token')
    uuid = request.GET.get('uuid')
    
    try:
        user = get_object_or_404(User, id=uuid, verification_token=token)
        
        # Check if the token is expired
        if user.is_verification_token_expired():
            return JsonResponse({"error": "Verification link expired"}, status=400)
        
        # Check if the email is already verified
        if user.email_verified:
            return JsonResponse({"error": "Email already verified"}, status=400)
        
        # Mark email as verified and invalidate the token
        user.email_verified = True
        user.verification_token = uuid.uuid4()  # Generate a new token to invalidate the old one
        user.save()
        
        return JsonResponse({"message": "Email verified successfully. You can now log in."})
    
    except Exception as e:
        return JsonResponse({"error": "Invalid verification link"}, status=400)
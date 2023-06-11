from django.urls import path
from .views import predict, insert_patient_data, train

urlpatterns = [
    path('prediction/<str:symptoms>/', predict),
    
    path('train', train),
]

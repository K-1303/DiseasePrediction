from django.contrib import admin
from django.urls import path, include
from .views import index, load_icon
from django.views.generic.base import RedirectView
from django.views.generic.base import TemplateView
from django.contrib.staticfiles.storage import staticfiles_storage

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', index),
    path("", include("Accounts.urls")),
    path("", include("DiseasePredictor.urls")),
    path("contactdoctor", index),
    path("dashboard", index),
    path('icon.svg', load_icon),
    re_path(r'^.*$', TemplateView.as_view(template_name='index.html')),
]


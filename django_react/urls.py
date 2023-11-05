
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("admin/", admin.site.urls),
    path('', include('frontend.urls')),
    path('', include('api.urls')),
    path('', include('conversational_bot.urls')),
]

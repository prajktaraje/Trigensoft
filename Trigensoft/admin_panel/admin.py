from django.contrib import admin
from .models import *


@admin.register(User)
class adminUser(admin.ModelAdmin):
    list_display = ('id','firstname', 'lastname', 'email', 'password', 'confirm_password')


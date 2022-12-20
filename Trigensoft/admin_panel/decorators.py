from django.shortcuts import redirect
from django.contrib.auth import logout
from functools import wraps
from django.contrib import messages


def admin_login_required(func):
    @wraps(func)
    def wrap(request, *args, **kwargs):
        if request.user.is_authenticated:
            return func(request, *args, **kwargs)
        else:
            messages.warning(request, "You don't have access to admin panel.")
            return redirect('admin_panel:admin_login')
    return wrap

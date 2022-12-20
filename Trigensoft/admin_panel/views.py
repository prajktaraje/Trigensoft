from django.shortcuts import render, redirect
from django.views import View
from .models import *
from django.core.paginator import Paginator
from django.contrib import auth, messages
from django.urls import reverse_lazy
from django.utils.decorators import method_decorator
from admin_panel.decorators import admin_login_required


class Login(View):
    def get(self, request):
        if request.user.is_authenticated:
            return render(request, 'login.html')
        else:
            return render(request, 'login.html')

    def post(self, request):
        user = auth.authenticate(
            username=request.POST['email'],
            password=request.POST['password']
        )
        if user is not None:
            auth.login(request, user)
            return redirect('admin_panel:user_list')
        messages.error(request, "username or password is incorrect!")
        return render(request, 'login.html')


class Register(View):
    def get(self, request):
        if request.user.is_authenticated:
            return render(request, 'register.html')
        else:
            return render(request, 'register.html')

    def post(self, request):
        firstname = request.POST.get('firstname')
        lastname = request.POST.get('lastname')
        email = request.POST.get('email')

        if User.objects.filter(email = email):
            messages.error(request, "email already exits.")
            return render(request, 'register.html')

        password = request.POST.get('password')
        profile_pic = request.FILES.get('image')
        confirm_password = request.POST.get('confirm_password')

        user_obj = User.objects.create(firstname = firstname,lastname = lastname,email = email,
                                       profile_pic = profile_pic,password = password,confirm_password = confirm_password,username= email)
        if request.POST.get('rool') == 'admin':
            user_obj.isAdmin = True
            user_obj.save()

        user_obj.set_password(password)
        user_obj.set_password(confirm_password)
        user_obj.save()
        return redirect('admin_panel:admin_login')


@method_decorator(admin_login_required, name='dispatch')
class UserList(View):
    def get(self, request):
        User_list = User.objects.filter(isAdmin=False).exclude(id=request.user.id ).exclude(is_superuser=True)

        paginator = Paginator(User_list, 5)
        page_number = request.GET.get('page')
        if not page_number:
            page_number = 1
        first = int(page_number) * 5 - 9
        last = int(page_number) * 5
        User_list = paginator.get_page(page_number)

        context = {
            "User_list": User_list,
            'page': page_number,
            'first': first,
            'last': last
        }
        return render(request, 'user_list.html', context)


@method_decorator(admin_login_required, name='dispatch')
class DeleteUserView(View):

    def get(self, request, id):
        if not User.objects.filter(id=id).exists():
            return redirect('admin_panel:user_list')
        else:
            admin = User.objects.get(id=id)
        try:
            admin.delete()
        except Exception as e:
            pass

        return redirect('admin_panel:user_list')


@method_decorator(admin_login_required, name='dispatch')
class EditUserView(View):
    template_name = 'edit_userlist.html'

    def get(self, request, id):
        page = request.GET.get('page')
        user_obj = User.objects.get(id=id)

        context = {
            'user_obj': user_obj,
            'page': page
        }

        return render(request, self.template_name, context=context)

    def post(self, request, id):
        page = request.GET.get('page')
        firstname = request.POST.get('firstname')
        lastname = request.POST.get('lastname')
        email = request.POST.get('email')
        image = request.FILES.get('image')

        if not User.objects.filter(id=id).exists():
            messages.warning(request, "User Not Found.")
            return redirect('admin_panel:user_list')
        else:
            user = User.objects.get(id=id)

        if User.objects.filter(email=email).exclude(email = user.email):
            url = reverse_lazy('admin_panel:user_list') + "?page=" + page
            messages.error(request, "email already exits.")
            return redirect(url)

        user.firstname = firstname
        user.lastname = lastname
        user.email = email
        user.save()

        if image:
            user.profile_pic = image
            user.save()

        messages.success(request," Updated Successfully!")
        url = reverse_lazy('admin_panel:user_list') + "?page=" + page
        return redirect(url)

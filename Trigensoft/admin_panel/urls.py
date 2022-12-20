from django.urls import path
from django.views.decorators.csrf import csrf_exempt
from admin_panel import views
from django.conf.urls import  url
app_name = 'admin_panel'


urlpatterns = [
    path('',views.UserList.as_view(), name='user_list'),
    path('admin_panel/register/', views.Register.as_view(), name='admin_register'),
    path('delete_user/<int:id>/', views.DeleteUserView.as_view(), name='delete_user'),
    path('admin_panel/login/', views.Login.as_view(), name='admin_login'),
    path('edit_user/<int:id>/', views.EditUserView.as_view(), name='edit_user'),

    ]
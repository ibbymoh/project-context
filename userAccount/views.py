from django.shortcuts import render
from django.contrib.auth import authenticate, login
from django.contrib.auth.views import LoginView, LogoutView
from django.views.generic.edit import CreateView
from .models import User
from django.contrib import messages
from django.urls import reverse,reverse_lazy
from django.http import HttpResponseRedirect,HttpResponse

from .forms import CustomUserCreationForm

# Create your views here.


def home(request):
    return render(request,'home.html')

class CreateUser(CreateView):
    form_class = CustomUserCreationForm
    model = User
    template_name = 'userAccount/registration.html'
    success_url = reverse_lazy('home')


class MyLoginView(LoginView):
    redirect_authenticated_user = True
    template_name = 'userAccount/login.html'

    def get_success_url(self):
        return(reverse_lazy('home'))

    def form_invalid(self,form):
        messages.error(self.request,"Invalid username or password")
        return self.render_to_response(self.get_context_data(form=form))



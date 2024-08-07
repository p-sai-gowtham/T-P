from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from .models import User
from django.contrib import messages
from django.contrib.auth.hashers import make_password, check_password

def signin(request):
    if request.method == 'POST':
        reg_no = request.POST['reg_no'].upper()
        password = request.POST['password']
        # Check if the user exists
        if not User.objects.filter(reg_no=reg_no).exists():
            messages.error(request,"User doesn't exist.")
            return render(request, 'user/login.html', {'message': "User doesn't exist. Please sign up"})
        
        user = User.objects.get(reg_no=reg_no)
        
        authenticated_user = authenticate(reg_no=reg_no, password=password)
        if authenticated_user is not None:
                # Check the password using check_password
                if check_password(password, authenticated_user.password):
                    
                    login(request, authenticated_user)
                    messages.success(request, 'Login Successful')
                    return redirect('/dashboard')
                
        messages.error(request,'Incorrect registraion number or password')
        return render(request, 'user/login.html', {'message': 'Incorrect registration number or password'})
    
    return render(request, 'user/login.html')

def logout_view(request):
    logout(request)
    messages.success(request,'Logout Successful')
    return redirect('user:login')

def add_user(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        if User.objects.filter(email=email).exists():
            messages.error(request, 'User with this email already exists!')
            return redirect('app:admin') 
        password = request.POST.get('password') 
        dashboard = request.POST.get('dashboard') == 'on'
        admin = request.POST.get('admin') == 'on'
        hashed_password = make_password(password) 
        user = User.objects.create(
            username=email,
            email=email,
            password= hashed_password,
            dashboard=dashboard,
            admin=admin,
        )
        messages.success(request, 'User added successfully!')
        return redirect('app:admin')  # Redirect to the appropriate URL

    return render(request, 'your_template.html')

def edit_user(request, user_id):
    user = User.objects.get(pk=user_id)
    if request.method == 'POST':
        print(request.POST)
        user.email = request.POST.get('email')
        if request.POST.get('password'):
            user.password = make_password(request.POST.get('password'))
        user.dashboard = request.POST.get('dashboard') == 'on'
        user.admin = request.POST.get('admin') == 'on'
        # user.set_password(user.password)
        user.save()

        messages.success(request, 'User updated successfully!')
        return redirect('app:admin')  # Redirect to the appropriate URL

    context = {'user': user}
    return redirect('app:adminview')

def remove_user(request, user_id):
    user = User.objects.get(pk=user_id)
    if user.is_superuser:
        messages.error(request, 'SuperUser cannot be deleted!')
        return redirect('app:admin')
    user.delete()

    messages.success(request, 'User deleted successfully!')
    return redirect('app:admin')
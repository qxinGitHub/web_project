from django.shortcuts import render
# from django import template


# Create your views here.
def resume(request):
    if(request.META["HTTP_USER_AGENT"].lower().find("mobile")>0):
        return render(request,"resume/resume_mobile.html")
    else:
	    return render(request,"resume/index.html")

def phone(request):
	return render(request,"resume/mobile.html")

def resume_mobile(request):
	return render(request,"resume/resume_mobile.html")

def resume_pc(request):
	return render(request,"resume/index.html")
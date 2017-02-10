from django.shortcuts import render
from django.http import HttpResponse
# from django.http import StreamingHttpRespons
# Create your views here.
def demo(request,name):
    print (name)
    html = "demo/"+name+".html"
    try:
        return render(request, html, locals())
    except:
        return HttpResponse("hello,这里是404<br/>联系站长或<a href='#' onClick='javascript:history.back(-1)'> 点此返回</a>")


# test测试
def test(request):
    values = request.META.items()
    # values.sort()
    html = []
    for k,v in values:
        html.append("<tr><td>%s</td><td>%s</td></tr>"%(k,v))
    return HttpResponse("<table>%s</table>" % "/n".join(html))

# 判断是否为手机
def test_phone(request):
    user_agent = request.META["HTTP_USER_AGENT"]
    if(request.META["HTTP_USER_AGENT"].lower().find("mobile")>0):
        return HttpResponse("手机 %s" % user_agent)
    else:
        return HttpResponse("pc %s" %user_agent)
def test_ajax(request):
    # return HttpResponse(test_ajax.html)
    return render(request,"test_ajax.html")




# 下载功能
def file_download(request,name):
    print(name)
    name = "download/"+name
    try:
        f = open(name, "rb")
    except:
        print ("wrong!")
        response = HttpResponse("404<br/><a href='#' onClick='javascript:history.back()'> 点此返回</a>")
    else:
        f_content = f.read()
        f.close()
        response = HttpResponse(f_content)
        print (response)
        response['Content-Type'] = 'application/octet-stream'
        response['Content-Disposition'] = 'attachment;filename="{0}"'.format(name)
    finally:
        return response
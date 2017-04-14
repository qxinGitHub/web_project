from django.shortcuts import render
from django.http import HttpResponse
import json
from demo.models import *

# from django.http import StreamingHttpRespons
# Create your views here.


def demo(request,name):
    print (name)
    html = "demo/"+name+".html"
    print(html)
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


def trex(request):
    return render(request,"demo/trex.html")


def trexRank(request):
    lists = Trex.objects.all().order_by("-score")[0:9]

    index = 1
    result = '{"status":1,"result":['
    print (type(lists),lists)
    # {
    #   "rank":"1",
    #   "name":"hihi",
    #   "score":"999"
    # },
    for list in lists:
        print(list,type(list))
        print (list.name,list.score)
        result += '{"rank":"' + str(index) +'","name":"' + list.name + '","score":"' + str(list.score) + '"},'
        index += 1

    res = result[:-1] + "]}"
    print(res)
    # return render(request,"demo/trexjson.json")
    return HttpResponse(res)


def trexUpload(request):
    # 获取ip 地址
    try:
        real_ip = request.META['HTTP_X_FORWARDED_FOR']
        regip = real_ip.split(",")[0]
    except:
        try:
            regip = request.META['REMOTE_ADDR']
        except:
            regip = ""
    print(regip)
    body = json.loads(request.body.decode())
    print(body)
    print(body["score"])
    if body["name"]:
        Trex.objects.create(name=body["name"],score=body["score"],runningTime=body["runningTime"],address=regip)
    else:
        Trex.objects.create(score=body["score"],runningTime=body["runningTime"],address=regip)
    return HttpResponse("sucess")
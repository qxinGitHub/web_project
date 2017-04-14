from django.shortcuts import render
from django.http import HttpResponse
import urllib.request
import base64
from PIL import Image
import json
from django.conf import settings
import time


#
# Create your views here.

def img2base(request,url):
    webfile = urllib.request.urlopen(url)
    webfile_base64 = base64.b64encode(webfile.read())
    print(webfile_base64)
    return HttpResponse(webfile_base64)

def img2base64(request):
    url = request.GET.get("url")
    # print(url)
    if url:
        req = urllib.request.Request(url)
        user_agent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.110 Safari/537.36"
        req.add_header("User-Agent",user_agent)
        webfile = urllib.request.urlopen(req)
        # print(url.split(".")[-1])
        file_suffix = url.split(".")[-1]
        # 用image打开文件
        imgFile = Image.open(webfile)

        json_data = img2base64_handle(imgFile,file_suffix)

        return HttpResponse(json_data)
    else:
        return render(request,"tool/tool.html")
    # print(request.GET.get("url"))
    # return render(request,"tool/tool.html")

# 文件上传
def img2base64_upload(request):
    # print(request.POST)
    print("files: ",request.FILES)

    data = request.FILES.get('file')

    # 获取文件后缀名
    file_suffix = data.name.split(".")[-1]
    # print(file_suffix)

    # print(data)
    imgFile = Image.open(data)
    json_data = img2base64_handle(imgFile,file_suffix)
    '''
    # print(data,type(data),data.name)
    print("--------------------")
    # data.read().save()
    print("--------------------")
    timer = time.strftime("%Y%m%d%H%M%S",time.localtime())

    save_dir = settings.MEDIA_ROOT + "/tool/img2base64/" + timer + data.name
    open(save_dir,"wb").write(data.read())

    # file.save()
    return HttpResponse("hello")
    '''
    return HttpResponse(json_data)

# 图片处理
def img2base64_handle(file,file_suffix):
    timer = time.strftime("%Y%m%d%H%M%S",time.localtime())

    save_dir =  settings.MEDIA_ROOT + "/tool/img2base64/" + timer + "." + file_suffix
    save_dir16 =  settings.MEDIA_ROOT + "/tool/img2base64/" + timer + "img16.png" #+ file_suffix
    save_dir32 =  settings.MEDIA_ROOT + "/tool/img2base64/" + timer + "img32.png" #+ file_suffix

    # 保存源文件
    file.save(save_dir)
    # 增加两种大小
    img16 = file.resize((16,16))
    # img16.save("uploads/temp/img16.ico")
    img16.save(save_dir16)
    img16 =open(save_dir16,"rb")

    img32 = file.resize((32,32))
    img32.save(save_dir32)
    img32 =open(save_dir32,"rb")

    img16base = base64.b64encode(img16.read())
    img32base = base64.b64encode(img32.read())

    # 使用之前的 file, 会导致编码是空的,所以在请求一遍
    # webfile = urllib.request.urlopen(url)


    # 源文件的base64
    img = open(save_dir,"rb")
    webfile_base64 = base64.b64encode(img.read())

    data = {
        "base64" : webfile_base64.decode(),
        "format" : file.format,
        "width"  : file.width,
        "height" : file.height,
        "img16"  : img16base.decode(),
        "img32"  : img32base.decode(),
    }

    json_data = json.dumps(data)
    # print(json_data)
    return  json_data
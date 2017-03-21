from django.shortcuts import render
from django.http import HttpResponse
import urllib.request
import base64
from PIL import Image
import json
from django.conf import settings
import time
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
        webfile = urllib.request.urlopen(url)

        # 用image打开文件
        imgFile = Image.open(webfile)

        # 保存地址
        timer = str(int(time.time()))
        savedir16 =  settings.MEDIA_ROOT + "/tool/img2base64/" + timer + "img16.ico"
        savedir32 =  settings.MEDIA_ROOT + "/tool/img2base64/" + timer + "img32.ico"

        # 增加两种大小
        img16 = imgFile.resize((16,16))
        # img16.save("uploads/temp/img16.ico")
        img16.save(savedir16)
        img16 =open(savedir16,"rb")
        img32 = imgFile.resize((32,32))
        img32.save(savedir32)
        img32 =open(savedir32,"rb")

        img16base = base64.b64encode(img16.read())
        img32base = base64.b64encode(img32.read())

        # 使用之前的 file, 会导致编码是空的,所以在请求一遍
        webfile = urllib.request.urlopen(url)
        webfile_base64 = base64.b64encode(webfile.read())
        # print(webfile_base64)
        # print(type(webfile_base64))


        data = {
            "base64" : webfile_base64.decode(),
            "format" : imgFile.format,
            "width"  : imgFile.width,
            "height" : imgFile.height,
            "img16"  : img16base.decode(),
            "img32"  : img32base.decode(),
        }

        json_data = json.dumps(data)

        return HttpResponse(json_data)
    else:
        return render(request,"tool/tool.html")
    # print(request.GET.get("url"))
    # return render(request,"tool/tool.html")
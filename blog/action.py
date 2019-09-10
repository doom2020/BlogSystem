import os

from django.contrib.auth.hashers import make_password, check_password
from django.db import models
from django.conf import settings
from django.db.models import Q
from django.http import HttpResponse
from django.utils.timezone import now

from blog.models import UserInfo, Blog, Classify, Label

# 加密解密方式
from blog.tools import FilterQuerySetBlog

auth_check = "MarcelArhut"



class IndexHandle:
    def __init__(self, request):
        self.request = request

    def get_handle(self):
        post_type = self.request.POST.get('post_type')
        index_cool = IndexCool(self.request)
        handle = None
        if post_type and hasattr(index_cool, post_type):
            handle = getattr(index_cool, post_type)
        return handle

class IndexCool:
    def __init__(self, request):
        self.request = request
        self.ret_dic = {"result":""}
        self.flag = 0

    def post_search(self):
        search_info = self.request.POST.get("search_input")
        query_set = FilterQuerySetBlog()
        blogs = Blog.objects.all()
        users = UserInfo.objects.all()
        try:
            if "name" in search_info.lower():
                query_set.query_by_name()
            elif "title" in search_info.lower():
                query_set.query_by_title()
            elif "content" in search_info.lower():
                query_set.query_by_content()
            elif "creat_time" in search_info.lower():
                query_set.query_by_create_time()
            elif "update_time" in search_info.lower():
                query_set.query_by_update_time()
            elif "is_valid" in search_info.lower():
                query_set.query_by_is_valid()
            else:
                query_set.query_default_all()
        except Exception as e:
            print(e)
            query_set.query_default_all()




class LoginHandle:
    def __init__(self, request):
        self.request = request

    def get_handle(self):
        post_type = self.request.POST.get('post_type')
        login_cool = LoginCool(self.request)
        handle = None
        if post_type and hasattr(login_cool, post_type):
            handle = getattr(login_cool, post_type)
        return handle

class LoginCool:
    def __init__(self, request):
        self.request = request
        self.ret_dic = {"result": "", "data": ''}
        self.flag = 1

    def post_login(self):
        uname = self.request.POST.get('luname')
        upwd = self.request.POST.get('lupwd')
        captcha = self.request.POST.get('captcha')
        rem_pwd = self.request.POST.get('rem_pwd')
        captcha_text = ''.join(self.request.session['captcha_text'])
        print(captcha.upper())
        print(captcha_text.upper())
        if captcha.upper() == captcha_text.upper():
            user = UserInfo.objects.filter(name=uname)
            if user:
                cpwd = check_password(upwd, user[0].password)
                print("返回值:%s" % cpwd)
                if cpwd:
                    if rem_pwd:
                        response = HttpResponse()
                        response.set_cookie('uname', uname, expires=300, path='/')
                        print("cookie 存入成功")
                    # 用户，密码验证正确存入session
                    self.request.session['uname'] = uname
                    print("session 存入成功")
                    self.request.session.set_expiry(0)
                    self.ret_dic["result"] = self.flag
                    return self.ret_dic
                else:
                    self.flag = 0
                    self.ret_dic["result"] = self.flag
                    self.ret_dic['data'] = '用户名或密码错误'
                    return self.ret_dic
            else:
                self.flag = 0
                self.ret_dic["result"] = self.flag
                self.ret_dic['data'] = '该用户不存在'
                return self.ret_dic
        else:
            self.flag = 0
            self.ret_dic['result'] = self.flag
            self.ret_dic['data'] = '验证码错误'
            return self.ret_dic



class RegisterHandle:
    def __init__(self, request):
        self.request = request

    def get_handle(self):
        post_type = self.request.POST.get('post_type')
        register_cool = RegisterCool(self.request)
        handle = None
        if post_type and hasattr(register_cool, post_type):
            handle = getattr(register_cool, post_type)
        return handle

class RegisterCool:
    def __init__(self, request):
        self.request = request
        self.ret_dic = {"result": ""}
        self.flag = 1

    # 注册处理
    def post_uname(self):
        uname = self.request.POST.get("uname")
        user = UserInfo.objects.filter(name=uname)
        if user:
            self.flag = 0
        self.ret_dic["result"] = self.flag
        return self.ret_dic

    def post_uphone(self):
        uphone = self.request.POST.get("uphone")
        phone = UserInfo.objects.filter(phone=uphone)
        if phone:
            self.flag = 0
        self.ret_dic["result"] = self.flag
        return self.ret_dic

    def post_uemail(self):
        uemail = self.request.POST.get("uemail")
        email = UserInfo.objects.filter(email=uemail)
        if email:
            self.flag = 0
        self.ret_dic["result"] = self.flag
        return self.ret_dic

    def register_btn(self):
        req = self.request.POST
        uname = req.get("uname")
        uphone = req.get("uphone")
        uemail = req.get("uemail")
        upwd = req.get("upwd")
        cpwd = req.get("cpwd")
        user = UserInfo.objects.filter(name=uname)
        phone = UserInfo.objects.filter(phone=uphone)
        email = UserInfo.objects.filter(email=uemail)
        if user or phone or email or (upwd != cpwd):
            # 不能注册
            self.flag = 0
        else:
            # 可以注册
            upwd = make_password(upwd, auth_check, "pbkdf2_sha1")
            new_user = UserInfo(name=uname, phone=uphone, email=uemail, password=upwd)
            new_user.save()
            print("注册成功")
            self.request.session['uname'] = uname
            print("session 存入成功")
            self.request.session.set_expiry(0)
        self.ret_dic["result"] = self.flag
        return self.ret_dic




class UploadHandle:
    def __init__(self, request):
        self.request = request

    def get_handle(self):
        # post_type = self.request.POST.get("post_type")
        upload_file = self.request.FILES.get("upload_file")
        upload_cool = UploadCool(self.request)
        handle = None
        if upload_file and hasattr(upload_cool, "upload_file"):
            handle = getattr(upload_cool, "upload_file")
        return handle



class UploadCool:
    def __init__(self, request):
        self.request = request
        self.ret_dic = {"result": ""}
        self.flag = 1

    def upload_file(self):
        upload_file = self.request.FILES.get("upload_file")
        file = os.path.join(settings.MDEIA_ROOT, upload_file.name)
        with open(file, 'wb') as fw:
            for chunk in upload_file.chunks():
                fw.write(chunk)
        self.ret_dic["result"] = self.flag
        return self.ret_dic

class HeightQueryHandle:
    def __init__(self, request):
        self.request = request

    def get_handle(self):
        post_type = self.request.POST.get('post_type', '')
        height_query_cool = HeightQueryCool(self.request)
        handle = None
        if post_type and hasattr(height_query_cool, post_type):
            handle = getattr(height_query_cool, post_type)
        return handle



class HeightQueryCool:
    def __init__(self, request):
        self.request = request
        self.ret_dict = {'result': 1, 'data': ''}


    def height_query(self):
        req = self.request.POST
        search_id = req.get('search_id')
        search_title = req.get('search_title')
        search_name = req.get('search_name')
        search_classify = req.get('search_classify')
        search_label = req.get('search_label')
        search_date = req.get('search_date')
        datas = Blog.objects.filter(Q(id=search_id)|
                                    Q(title__contains=search_title)|
                                    Q(name__name=search_name))
        print(datas.values_list())
        return self.ret_dict



class AllOperationHandle:
    def __init__(self, request):
        self.request = request

    def get_handle(self):
        post_type = self.request.POST.get('post_type')
        all_operation_cool = AllOperationCool(self.request)
        handle = None
        if post_type and hasattr(all_operation_cool, post_type):
            handle = getattr(all_operation_cool, post_type)
        return handle




class AllOperationCool:
    def __init__(self, request):
        self.request = request
        self.ret_dict = {'result': 0, 'data': ''}

    def create_blog(self):
        uname = self.request.session.get('uname')
        blog_title = self.request.POST.get('blog_title')
        blog_classify = self.request.POST.get('blog_classify')
        blog_label = self.request.POST.get('blog_label')
        blog_content = self.request.POST.get('blog_content')
        user_form = UserInfo.objects.filter(name=uname)
        classify_form = Classify.objects.filter(id=blog_classify)
        label_form = Label.objects.filter(id=blog_label)
        try:
            Blog(name=user_form[0],classify=classify_form[0], label=label_form[0], title=blog_title,
                 content=blog_content,
                 create_time=now(), update_time=now()).save()
        except Exception as e:
            print('create blog fail')
            print(e)
            return self.ret_dict
        self.ret_dict['result'] = 1
        print('create blog success')
        return self.ret_dict
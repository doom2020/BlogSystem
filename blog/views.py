import json
import os
import io

from django.conf import settings
from django.contrib.auth import logout
from blog.action import LoginHandle, IndexHandle, RegisterHandle, UploadHandle, HeightQueryHandle, AllOperationHandle
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.views.generic.base import View


# 装饰器函数(判断用户是否在登陆状态)
from blog.gen_captcha_test import generate_random_captcha
from blog.models import Blog, Label, Classify


def login_decorator(func):
    """此方法为装饰器，用来判定用户是否在登录状态"""
    def login_func(self, request, *args, **kwargs):
        if self.request.session.get("uname"):
            return func(self, request, *args, **kwargs)
        else:
            resp = redirect("./../login/")
            resp.set_cookie("url", self.request.path)
            return resp
    return login_func



class Index(View):
    def get(self, request, *args, **kwargs):
        uname = request.session.get("uname", "")
        page_num = kwargs['page_num']
        show_page_count = 8
        begin_page = 1
        if page_num < begin_page:
            page_num = begin_page
        blogs = Blog.objects.all().order_by('id')
        sum_blog = len(blogs)
        end_page = sum_blog // show_page_count + 1
        if page_num > end_page:
            page_num = end_page
        show_blogs = blogs[(page_num - 1) * show_page_count: page_num * show_page_count]
        before_page = page_num - 1
        if before_page < begin_page:
            before_page = begin_page
        after_page = page_num + 1
        if after_page > end_page:
            after_page = end_page
        page_index = len(show_blogs)
        labels = Label.objects.filter(isValid=False)
        classifies = Classify.objects.filter(isValid=False)
        return render(request, 'index.html', locals())

    @login_decorator
    def post(self, request, *args, **kwargs):
        index = IndexHandle(request)
        op_handle = index.get_handle()
        ret_dic = op_handle()
        print("接受到的数据:%s" % ret_dic)
        return HttpResponse(json.dumps(ret_dic))



class Login(View):
    def get(self, request, *args, **kwargs):
        # return HttpResponse("login page")
        return render(request, 'login.html', locals())

    def post(self, request, *args, **kwargs):
        login = LoginHandle(request)
        op_handle = login.get_handle()
        ret_dic = op_handle()
        return HttpResponse(json.dumps(ret_dic))



class Register(View):
    def get(self, request, *args, **kwargs):
        return render(request, 'register.html', locals())

    def post(self, request, *args, **kwargs):
        register = RegisterHandle(request)
        op_handle = register.get_handle()
        print("数据:%s" % op_handle)
        ret_dic = op_handle()
        print("views视图：%s" % ret_dic)
        return HttpResponse(json.dumps(ret_dic))

class Logout(View):
    def get(self, request, *args, **kwargs):
        logout(request)
        return redirect('/blog/1')

    def post(self, request, *args, **kwargs):
        pass



class Upload(View):
    @login_decorator
    def get(self, request, *args, **kwargs):
        return render(request, 'upload.html', locals())

    @login_decorator
    def post(self, request, *args, **kwargs):
        upload = UploadHandle(request)
        op_handle = upload.get_handle()
        ret_dic = op_handle()
        print("传来的参数:%s" % ret_dic)
        return HttpResponse(json.dumps(ret_dic))



class Captcha(View):
    def get(self, request, *args, **kwargs):
        text, image = generate_random_captcha()
        request.session['captcha_text'] = text
        buf = io.BytesIO()
        image.save(buf, 'jpeg')
        return HttpResponse(buf.getvalue(), 'image/jpeg')



class HeightQuery(View):
    def post(self, request, *args, **kwargs):
        height_query = HeightQueryHandle(request)
        op_handle = height_query.get_handle()
        ret_dict = op_handle()
        return HttpResponse(json.dumps(ret_dict))



class AllOperation(View):
    def post(self, request, *args, **kwargs):
        all_operation = AllOperationHandle(request)
        op_handle = all_operation.get_handle()
        ret_dict = op_handle()
        return HttpResponse(json.dumps(ret_dict))

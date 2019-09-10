import io
from datetime import datetime

import pytz
from django.http import HttpResponse

from blog.gen_captcha_test import generate_random_captcha
from blog.models import UserInfo, Blog, ClientInfo
from django.middleware.http import MiddlewareMixin



class FilterQuerySetBlog:
    def __init__(self):
        pass

    def query_by_name(self):
        pass

    def query_by_title(self):
        pass

    def query_by_content(self):
        pass

    def query_by_create_time(self):
        pass

    def query_by_update_time(self):
        pass

    def query_by_is_valid(self):
        pass

    def query_default_all(self):
        pass



class MyMiddleware(MiddlewareMixin):
    def process_request(self, request):
        """
        一个客户端请求过来最先执行的方法
        :param request:
        :return:
        """
        date_now = datetime.now().replace(tzinfo=pytz.timezone('UTC'))
        info = request.META
        host = info['REMOTE_ADDR']
        user_agent = info['HTTP_USER_AGENT']
        method = info['REQUEST_METHOD']
        path = info['PATH_INFO']
        try:
            cookie = info['HTTP_COOKIE']
        except KeyError:
            cookie = ''
        print('host:%s,user_agent:%s,method:%s,path:%s,cookie:%s' % (host, user_agent, method, path, cookie))
        if ('php'.upper() or 'node'.upper() or 'java'.upper() or 'python'.upper()) in user_agent.upper():
            return HttpResponse('you are not a human')
        if ('Mozilla'.upper() and 'Chrome'.upper() and 'Safari'.upper()) not in user_agent.upper():
            return HttpResponse('please use mozilla or chrome or safari')
        if ('Unix'.upper() or 'Linux'.upper()) in user_agent.upper():
            return HttpResponse('please use windows or mac or mobil-phone(android,iphone)')
        client = ClientInfo.objects.filter(ip=host)
        if client:
            if client[0].is_spider:
                return HttpResponse('your are spider')
            before_time = client[0].date
            diff_time = int((date_now - before_time).seconds)
            print("之前的时间：%s, 现在的时间：%s, 差值：%s" % (before_time, date_now, diff_time))
            before_user_agent = client[0].user_agent
            count = client[0].count
            update_count = int(count) + 1
            if diff_time < 1 and before_user_agent != user_agent:
                client[0].is_spider = True
                return HttpResponse('you are height level spider')
            elif update_count > 50:
                client[0].is_spider = True
                return HttpResponse('request too busy')
            client[0].user_agent = user_agent
            client[0].method = method
            client[0].path = path
            client[0].cookie = cookie
            client[0].date = date_now
            client[0].count = update_count
            client[0].save()

        else:
            ClientInfo(ip=host, user_agent=user_agent, method=method, path=path, cookie=cookie, date=date_now,
                       count='1').save()
            print('有新的客户端访问')

    def process_view(self, request, view_func, *view_args, **view_kwargs):
        """
        url路径匹配之后(获得匹配正确后的视图函数名以及函数的参数)view视图函数执行之前执行
        :param request:
        :param func:
        :param args:
        :param kwargs:
        :return:
        """
        pass

    def process_exception(self, request, exception):
        """
        视图函数执行出错后执行，默认不执行
        :param request:
        :param exception:
        :return:
        """
        pass

    # def process_template_response(self, request, response):
    #     """
    #     视图函数执行后立刻执行(要有render方法)默认不执行
    #     :param request:
    #     :param response:
    #     :return:
    #     """
    #     pass

    # def process_response(self, request, response):
    #     """
    #     请求有响应时执行
    #     :param request:
    #     :param response:
    #     :return:
    #     """
    #     pass
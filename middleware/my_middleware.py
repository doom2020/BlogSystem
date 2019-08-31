from django.utils.deprecation import MiddlewareMixin



class MyMiddleware(MiddlewareMixin):

    # __init__ ,在调用该中间件时自动调用，无参数
    # def __init__(self):
    #     pass

    # 在执行视图函数之前被调用，分配路由前
    def process_request(self, request):
        params = request.GET.get("key", "")
        print("请求参数:%s" % params)

    # 在执行视图函数之前调用
    def process_view(self, request, view_func, view_args, view_kwargs):
        pass

    # 在视图函数执行完后执行（render）到模板之前
    def process_template_response(self, request, response):
        pass

    # 所有响应返回浏览器前调用
    def process_response(self, request, response):
        pass


    # 当视图处理出错调用
    def process_exception(self, request, exception):
        pass


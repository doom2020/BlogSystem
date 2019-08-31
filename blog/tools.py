import io

from django.http import HttpResponse

from blog.gen_captcha_test import generate_random_captcha
from blog.models import UserInfo, Blog



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
from django.contrib import admin

# Register your models here.

# Blog模型的管理器
from blog.models import *


class UserInfoAdmin(admin.ModelAdmin):
    # list_display = ('id', 'caption', 'author', 'publish_time')
    pass
class BlogAdmin(admin.ModelAdmin):
    pass

class ClassifyAdmin(admin.ModelAdmin):
    pass

class CommentAdmin(admin.ModelAdmin):
    pass

class LabelAdmin(admin.ModelAdmin):
    pass

class ClientInfoAdmin(admin.ModelAdmin):
    pass

# 在admin中注册绑定
admin.site.register(UserInfo, UserInfoAdmin)
admin.site.register(Blog, BlogAdmin)
admin.site.register(Classify, ClassifyAdmin)
admin.site.register(Comment, CommentAdmin)
admin.site.register(Label, LabelAdmin)
admin.site.register(ClientInfo, ClientInfoAdmin)

from django.db import models

# Create your models here.

class UserInfo(models.Model):
    name = models.CharField(verbose_name='用户姓名', max_length=50)
    phone = models.CharField(verbose_name='用户手机', max_length=50)
    email = models.EmailField(verbose_name='用户邮箱', max_length=50)
    password = models.CharField(verbose_name='用户密码', max_length=200)
    create_time = models.DateTimeField(verbose_name='注册时间', auto_now_add=True)
    update_time = models.DateTimeField(verbose_name='更改时间', auto_created=True, null=True)
    isValid = models.BooleanField(verbose_name='禁用', default=False)

    class Meta:
        db_table = 'user_info'
        verbose_name = 'user_info'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.name


class Blog(models.Model):
    # 用户与博客，一对多
    name = models.ForeignKey('UserInfo', on_delete=models.CASCADE, verbose_name='博客作者')
    title = models.CharField(verbose_name='博客标题', max_length=20)
    content = models.TextField(verbose_name='博客正文')
    # image = models.ImageField(verbose_name='博客照片', upload_to='/static/image/upload')
    create_time = models.DateTimeField(verbose_name='创建时间', auto_now_add=True)
    update_time = models.DateTimeField(verbose_name='更新时间', auto_created=True)
    isValid = models.BooleanField(verbose_name='禁用', default=False)

    class Meta:
        db_table = 'blog'
        verbose_name = 'blog'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.title


class Classify(models.Model):
    name = models.CharField(verbose_name='博客类型', max_length=20)
    create_time = models.DateTimeField(verbose_name='添加时间', auto_now_add=True)
    update_time = models.DateTimeField(verbose_name='更新时间', auto_created=True)
    isValid = models.BooleanField(verbose_name='禁用', default=False)
    # 博客与博客类型，一对多
    blog = models.ForeignKey('Blog', on_delete=models.CASCADE, verbose_name='博客类型')

    class Meta:
        db_table = 'classify'
        verbose_name = 'classify'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.name

class Comment(models.Model):
    name = models.CharField(verbose_name='评论人', max_length=20)
    email = models.EmailField(verbose_name='评论人邮箱', max_length=50, null=True)
    userinfo = models.ForeignKey('UserInfo', on_delete=models.CASCADE, null=True)
    content = models.TextField(verbose_name='评论内容')
    # image = models.ImageField(verbose_name='评论照片', upload_to='../static/image/')
    create_time = models.DateTimeField(verbose_name='评论时间', auto_now_add=True)
    update_time = models.DateTimeField(verbose_name='更新时间', auto_created=True)
    isValid = models.BooleanField(verbose_name='禁用', default=False)
    # 博客和评论，一对多
    blog = models.ForeignKey('Blog', on_delete=models.CASCADE, verbose_name='博客评论')

    class Meta:
        db_table = 'comment'
        verbose_name = 'comment'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.name

class Label(models.Model):
    name = models.CharField(verbose_name='标签名', max_length=20)
    create_time = models.DateTimeField(verbose_name='创建时间', auto_now_add=True)
    update_time = models.DateTimeField(verbose_name='更新时间', auto_created=True)
    isValid = models.BooleanField(verbose_name='禁用', default=False)
    # 博客与标签，一对多
    blog = models.ForeignKey('Blog', on_delete=models.CASCADE, verbose_name='博客标签')

    class Meta:
        db_table = 'label'
        verbose_name = 'label'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.name



class ClientInfo(models.Model):
    ip = models.CharField(verbose_name='客户端ip', max_length=30)
    user_agent = models.CharField(verbose_name='请求头', max_length=500)
    method = models.CharField(verbose_name='请求方式', max_length=10)
    path = models.CharField(verbose_name='请求路径', max_length=50)
    cookie = models.CharField(verbose_name='请求cookie', max_length=100)
    date = models.DateTimeField(verbose_name='请求时间', auto_created=True)
    count = models.CharField(verbose_name='请求次数', max_length=50)
    is_spider = models.BooleanField(verbose_name='爬虫', default=False)

    class Meta:
        db_table = 'client_info'
        verbose_name = 'client_info'
        verbose_name_plural = verbose_name
    def __str__(self):
        return self.ip

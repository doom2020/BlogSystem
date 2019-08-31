$(function () {
    /*用户登陆事件以及ajax请求*/
    $("#luname").on('blur',function () {
        var luname = $(this).val();
        if(luname){
            $(this).parent().siblings('span').html('');
            return true;
        }else{
            $(this).parent().siblings('span').html('用户名不能为空!');
            return false;
        }
    });
    $("#lupwd").on('blur',function () {
        $("#captcha_show").css("display","block");
        var lupwd = $(this).val();
        if(lupwd){
            $(this).parent().siblings('span').html('');
            return true;
        }else{
            $(this).parent().siblings('span').html('密码不能为空!');
            return false
        }
    });
    $("#login_btn").on('click',function () {
        var luname = $("#luname").val();
        var lupwd = $("#lupwd").val();
        var captcha = $("#captcha_show").val();
        var rem_pwd = $("#rem_pwd").prop("checked");
        if(luname && lupwd){
            $.ajax({
                url:'./',
                data:{"post_type":"post_login","luname":luname,"lupwd":lupwd,"rem_pwd":rem_pwd,"captcha":captcha},
                type:"post",
                dataType:"json",
                async:"true",
                success:function (data,status,xhr) {
                    if(data.result){
                    //    登陆成功,跳转至主页
                        alert("登陆成功");
                        window.location.href = "/blog/";
                    }else{
                    //    登陆失败,刷新页面
                        alert("用户名或密码错误");
                        window.location.href = "/blog/login";
                    }
                },
                error:function (status,xhr,error) {
                        return false;
                }
            })
        }else{
            alert("请输入完整信息");
            return false;
        }
    });

});
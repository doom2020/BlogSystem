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
        $(this).attr('disabled', 'disabled').attr('class', 'btn btn-default');
        var luname = $("#luname").val();
        var lupwd = $("#lupwd").val();
        var rem_pwd = $("#rem_pwd").prop("checked");
        var captcha = $('#captcha').val();
        if(luname && lupwd){
            $.ajax({
                url:'./',
                data:{"post_type":"post_login","luname":luname,"lupwd":lupwd,"rem_pwd":rem_pwd,"captcha":captcha},
                type:"post",
                dataType:"json",
                async:"true",
                success:function (data,status,xhr) {
                    var flag = data.result;
                    var info = data.data;
                    if(flag){
                    //    登陆成功,跳转至主页
                        window.location.href = "/blog/1";
                    }else{
                    //    登陆失败,刷新页面
                        alert(info);
                        window.location.href = "/blog/login";
                        $('#login_btn').removeAttr('disabled').attr('class', 'btn btn-primary');
                    }
                },
                error:function (status,xhr,error) {
                        return false;
                }
            })
        }else{
            alert("请输入完整信息");
            $('#login_btn').removeAttr('disabled').attr('class', 'btn btn-primary');
            return false;
        }
    });

});
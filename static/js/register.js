$(function () {
    /*用户注册姓名事件绑定以及ajax请求*/
    $("#uname").on('blur',function () {
        var uname = $(this).val();
        if(uname.length>0 && uname.length<5){
            $.ajax({
                url:"./",
                data:{"post_type":"post_uname","uname":uname},
                type:"post",
                dataType:"json",
                async:"true",
                success:function (data,status,xhr) {
                    if(data.result){
                        $("#uname").parent().siblings("span").removeClass("glyphicon glyphicon-remove");
                        $("#uname").parent().siblings("span").addClass("glyphicon glyphicon-ok");
                        $("#uname").addClass("has-success");
                        return true;
                    }else{
                        $("#uname").parent().siblings("span").removeClass("glyphicon glyphicon-ok");
                        $("#uname").removeClass("has-success");
                        $("#uname").parent().siblings("span").addClass("glyphicon glyphicon-remove");
                        return false;
                    }
                },
                error:function (status,xhr,error) {
                    return false;
                }
            });
        }else{
            $(this).parent().siblings("span").removeClass("glyphicon glyphicon-ok");
            $(this).removeClass("has-success");
            $(this).parent().siblings("span").addClass("glyphicon glyphicon-remove");
            return;
        }
    });

    $("#uphone").on('blur',function () {
        var uphone = $(this).val();
        if(uphone.length == 11 && uphone[0] == 1){
            $.ajax({
                url:"./",
                data:{"post_type":"post_uphone","uphone":uphone},
                type:'post',
                dataType:'json',
                async:'true',
                success:function (data,status,xhr) {
                    if(data.result){
                        $("#uphone").parent().siblings("span").removeClass("glyphicon glyphicon-remove");
                        $("#uphone").parent().siblings("span").addClass("glyphicon glyphicon-ok");
                        $("#uphone").addClass("has-success");
                        return true;
                    }else{
                        $("#uphone").parent().siblings("span").removeClass("glyphicon glyphicon-ok");
                        $("#uphone").removeClass("has-success");
                        $("#uphone").parent().siblings("span").addClass("glyphicon glyphicon-remove");
                        return false;
                    }
                },
                error:function (status,xhr,error) {
                    return false
                }
            })
        }else{
            $(this).parent().siblings("span").removeClass("glyphicon glyphicon-ok");
            $(this).removeClass("has-success");
            $(this).parent().siblings("span").addClass("glyphicon glyphicon-remove");
            return false;
        }
    });
    $("#uemail").on('blur',function () {
        var uemail = $(this).val();
        if(uemail.substr(-4)==".com" && uemail.indexOf("@") != -1){
            $.ajax({
                url:"./",
                data:{"post_type":"post_uemail","uemail":uemail},
                type:"post",
                dataType:'json',
                async:"true",
                success:function (data,status,xhr) {
                    if(data.result){
                        $("#uemail").parent().siblings("span").removeClass("glyphicon glyphicon-remove");
                        $("#uemail").parent().siblings("span").addClass("glyphicon glyphicon-ok");
                        $("#uemail").addClass("has-success");
                        return true;
                    }else{
                        $("#uemail").parent().siblings("span").removeClass("glyphicon glyphicon-ok");
                        $("#uemail").removeClass("has-success");
                        $("#uemail").parent().siblings("span").addClass("glyphicon glyphicon-remove");
                        return false;
                    }
                },
                error:function (status,xhr,error) {
                    return false
                }
            })
        }else{
            $(this).parent().siblings("span").removeClass("glyphicon glyphicon-ok");
            $(this).removeClass("has-success");
            $(this).parent().siblings("span").addClass("glyphicon glyphicon-remove");
            return false;
        }
    });
    $("#upwd").on('blur',function () {
        var upwd = $(this).val();
        if(upwd){
            $(this).parent().siblings("span").removeClass("glyphicon glyphicon-remove");
            $(this).parent().siblings("span").addClass("glyphicon glyphicon-ok");
            $(this).addClass("has-success");
            return true;
        }else{
            $(this).parent().siblings("span").removeClass("glyphicon glyphicon-ok");
            $(this).removeClass("has-success");
            $(this).parent().siblings("span").addClass("glyphicon glyphicon-remove");
            return false;
        }
    });
    $("#cpwd").on('blur',function () {
        var upwd = $("#upwd").val();
        var cpwd = $("#cpwd").val();
        if(cpwd === upwd && cpwd){
            $(this).parent().siblings("span").removeClass("glyphicon glyphicon-remove");
            $(this).parent().siblings("span").addClass("glyphicon glyphicon-ok");
            $(this).addClass("has-success");
            return true;
        }else{
            $(this).parent().siblings("span").removeClass("glyphicon glyphicon-ok");
            $(this).removeClass("has-success");
            $(this).parent().siblings("span").addClass("glyphicon glyphicon-remove");
            return false;
        }
    });
    /*注册提交按钮事件*/
    $("#register_btn").on('click',function () {
        $(this).attr('disabled', 'disabled').attr('class', 'btn btn-success');
        var uname_has = $("#uname").hasClass("has-success");
        var uphone_has = $("#uphone").hasClass("has-success");
        var uemail_has = $("#uemail").hasClass("has-success");
        var upwd_has = $("#upwd").hasClass("has-success");
        var cpwd_has = $("#cpwd").hasClass("has-success");
        var uname = $("#uname").val();
        var uphone = $("#uphone").val();
        var uemail = $("#uemail").val();
        var upwd = $("#upwd").val();
        var cpwd = $("#cpwd").val();
        if(uname_has && uphone_has && uemail_has && upwd_has && cpwd_has){
            $.ajax({
                url:"./",
                data:{"post_type":"register_btn","uname":uname,"uphone":uphone,"uemail":uemail,"upwd":upwd,"cpwd":cpwd},
                type:"post",
                dataType: "json",
                async: "true",
                success:function (data,status,xhr) {
                    if(data.result){
                    //    注册成功
                        alert("注册成功");
                        //注册成功跳转至主页
                        window.location.href = "/blog/1";
                    }else{
                    //    注册失败
                        alert("注册失败,用户名已存在");
                        window.location.href = "/blog/register";
                        $('#register_btn').removeAttr('disabled').attr('class', 'btn btn-primary');
                        return false;
                    }
                },
                error:function (status,xhr,error) {
                    $('#register_btn').removeAttr('disabled').attr('class', 'btn btn-primary');
                    return false;
                }
            })
        }else{
            alert("请填写完整信息");
            $('#register_btn').removeAttr('disabled').attr('class', 'btn btn-primary');
            return false;
        }
    });

});
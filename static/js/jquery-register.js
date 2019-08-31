//用户名请求
$(function () {
   $("#uname").blur(function () {
       var uname = $("#uname").val();
       if(uname == ""){
           $("#uname_info").text("用户名不能为空");
           $("#uname_info").css("color","red");
           return
       }
       if(uname.length <= 3){
           $("#uname_info").text("请输入3位以上");
           $("#uname_info").css("color","orange");
           return
       }
       var choose = "uname";
       $.ajax({
           url:"/shop/check_register/",
           data:{"choose":choose,"uname":uname},
           type:"post",
           dataType:"json",
           async:"true",
           success:function (data,status,xhr) {
               var result = data.flage;
               if(result == "1"){
                   $("#uname_info").text("该用户名已注册");
                   $("#uname_info").css("color","orange");
                   return
               }else{
                   $("#uname_info").text("该用户名可用");
                   $("#uname_info").css("color","green");
               }
           },
           error:function (status,xhr,error) {
           },
       })
   })
});

//用户密码请求
$(function () {
    $("#upwd").blur(function () {
        var upwd = $("#upwd").val();
        if(upwd == ""){
            $("#upwd_info").text("密码不能为空");
            $("#upwd_info").css("color","red");
            return
        }else if(upwd.length <= 6){
            $("#upwd_info").text("请输入6位以上");
            $("#upwd_info").css("color","orange");
            return
        }else{
            $("#upwd_info").text("密码可用");
            $("#upwd_info").css("color","green");
        }
    });
    $("#cpwd").blur(function () {
        var upwd = $("#upwd").val();
        var cpwd = $("#cpwd").val();
        if(cpwd == ""){
            $("#cpwd_info").text("确认密码不能为空");
            $("#cpwd_info").css("color","red");
            return
        }else if(cpwd != upwd){
            $("#cpwd_info").text("两次密码输入不一致");
            $("#cpwd_info").css("color","orange");
            return
        }else{
            $("#cpwd_info").text("密码确认OK");
            $("#cpwd_info").css("color","green");
        }
    });
});

//用户手机
$(function () {
    $("#uphone").blur(function () {
        var uphone = $("#uphone").val();
        if(uphone == ""){
            $("#uphone_info").text("手机号不能为空");
            $("#uphone_info").css("color","red");
            return
        }else if(uphone.length != 11 || uphone[0] != "1"){
            $("#uphone_info").text("手机号不合法");
            $("#uphone_info").css("color","orange");
            return
        }
        var choose = "uphone";
        $.ajax({
            url:"/shop/check_register/",
            data: {"choose":choose,"uphone":uphone},
            type: "post",
            dataType: "json",
            async: "true",
            success:function (data,status,xhr) {
                var result = data.flage;
                if(result == "1"){
                    $("#uphone_info").text("该手机号已注册");
                    $("#uphone_info").css("color","orange");
                    return
                }else{
                    $("#uphone_info").text("该手机号可用");
                    $("#uphone_info").css("color","green");
                }
            },
            error:function (status,xhr,error) {
            },
        })
    })
});

//用户邮箱
$(function () {
    $("#uemail").blur(function () {
        var uemail = $("#uemail").val();
        var pattern = new RegExp('.*?@.com');
        if(uemail == ""){
            $("#uemail_info").text("用户邮箱不能为空");
            $("#uemail_info").css("color","red");
            return
        }else if(uemail.indexOf("@") == -1 ||  pattern.test(uemail) != true){
            $("#uemail_info").text("格式不正确");
            $("#uemail_info").css("color","orange");
            return
        }
        var choose = "uemail";
        $.ajax({
            url:"/shop/check_register/",
            data:{"choose":choose,"uemail":uemail},
            type:"post",
            dataType:"json",
            async:"true",
            success:function (data,status,xhr) {
                var result = data.flage;
                if(result == "1"){
                    $("#uemail_info").text("该邮箱已注册");
                    $("#uemail_info").css("color","orange");
                    return
                }else{
                    $("#uemail_info").text("该邮箱可用");
                    $("#uemail_info").css("color","green");
                }
            },
            error:function (status,xhr,error) {
            },
        })
    })
});

//提交表单
$(function () {
    $("#sub").click(function () {
        var uname = $("#uname").val();
        var upwd = $("#upwd").val();
        var cpwd = $("#cpwd").val();
        var uphone = $("#uphone").val();
        var uemail = $("#uemail").val();
        if(uname == ""){
           $("#uname_info").text("用户名不能为空");
           $("#uname_info").css("color","red");
           return
       }
       if(uname.length <= 3){
           $("#uname_info").text("请输入3位以上");
           $("#uname_info").css("color","orange");
           return
       }
       if(cpwd == ""){
            $("#cpwd_info").text("确认密码不能为空");
            $("#cpwd_info").css("color","red");
            return
        }else if(cpwd != upwd){
            $("#cpwd_info").text("两次密码输入不一致");
            $("#cpwd_info").css("color","orange");
            return
        }
       if(uphone == ""){
            $("#uphone_info").text("手机号不能为空");
            $("#uphone_info").css("color","red");
            return
        }else if(uphone.length != 11 || uphone[0] != "1"){
            $("#uphone_info").text("手机号不合法");
            $("#uphone_info").css("color","orange");
            alert("手机号异常");
            return
        }
       if(uemail == ""){
            $("#uemail_info").text("用户邮箱不能为空");
            $("#uemail_info").css("color","red");
            return
        }else if(uemail.indexOf("@") == -1 || uemail[0] == "@" || uemail[-4] != "." || uemail[-3] != "c" || uemail[-2] != "o" || uemail[-1] != "m"){
            $("#uemail_info").text("格式不正确");
            $("#uemail_info").css("color","orange");
            return
        }
    })
});
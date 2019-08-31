$(function () {
    /*输入框查询页面ajax*/
    $("#home_search").on('click',function () {
        var search_input = $("#search_input").val();
        if(search_input){
            var token = $('input[name=csrfmiddlewaretoken]').val();
            $.ajax({
                url:'./',
                data:{"post_type":"post_search","search_input":search_input,"csrfmiddlewaretoken": token},
                type:'post',
                dataType:'json',
                async:'true',
                success:function (data,status,xhr) {
                    if(data.result){
                        $("#home_body").html('<div class="table-responsive">\n' +
                            '        <table class="table table-striped">\n' +
                            '            <thead>\n' +
                            '                <tr>\n' +
                            '                    <th>ID</th>\n' +
                            '                    <th>姓名</th>\n' +
                            '                    <th>手机号</th>\n' +
                            '                    <th>邮箱</th>\n' +
                            '                    <th>注册时间</th>\n' +
                            '                    <th>是否禁用</th>\n' +
                            '                </tr>\n' +
                            '            </thead>\n' +
                            '            <tbody>\n' +
                            '                <tr>\n' +
                            '                    <td>1</td>\n' +
                            '                    <td>老毛</td>\n' +
                            '                    <td>111111</td>\n' +
                            '                    <td>laomao@123.com</td>\n' +
                            '                    <td>20190728</td>\n' +
                            '                    <td>否</td>\n' +
                            '                </tr>\n' +
                            '                <tr>\n' +
                            '                    <td>2</td>\n' +
                            '                    <td>老毛</td>\n' +
                            '                    <td>111111</td>\n' +
                            '                    <td>laomao@123.com</td>\n' +
                            '                    <td>20190728</td>\n' +
                            '                    <td>否</td>\n' +
                            '                </tr>\n' +
                            '                <tr>\n' +
                            '                    <td>3</td>\n' +
                            '                    <td>老毛</td>\n' +
                            '                    <td>111111</td>\n' +
                            '                    <td>laomao@123.com</td>\n' +
                            '                    <td>20190728</td>\n' +
                            '                    <td>否</td>\n' +
                            '                </tr>\n' +
                            '                <tr>\n' +
                            '                    <td>4</td>\n' +
                            '                    <td>老毛</td>\n' +
                            '                    <td>111111</td>\n' +
                            '                    <td>laomao@123.com</td>\n' +
                            '                    <td>20190728</td>\n' +
                            '                    <td>否</td>\n' +
                            '                </tr>\n' +
                            '                <tr>\n' +
                            '                    <td>5</td>\n' +
                            '                    <td>老毛</td>\n' +
                            '                    <td>111111</td>\n' +
                            '                    <td>laomao@123.com</td>\n' +
                            '                    <td>20190728</td>\n' +
                            '                    <td>否</td>\n' +
                            '                </tr>\n' +
                            '            </tbody>\n' +
                            '        </table>\n' +
                            '    </div>');
                        return;
                    }else{
                        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
                        $("#home_body").text("today is nice day");
                        return;
                    }
                },
                error:function (status,xhr,error) {
                    console.log("请求失败");
                },
            })
        }
        else{
            $("#search_input").attr("placeholder","查找的关键词不能为空!!").addClass("has-error");
            console.log("关键词不能为空");
            return false;
        }
    });

});
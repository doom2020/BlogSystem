$(function () {
    $('#btn_cancel_blog').on('click', function () {
        $('#create_blog').modal('hide').attr('class', 'modal fade');
    });
    $('#btn_save_blog').on('click', function () {
        var blog_title = $('#modal_blog_title').val();
        // alert(blog_title);
        //1.类型
        var blog_classify = $('#modal_blog_classify_choose').val();
        //2.标签
        var blog_label = $('#modal_blog_label_choose').val();
        var blog_content = $('#modal_blog_content').val();
        // alert(blog_title);
        // alert(blog_classify);
        // alert(blog_label);
        // alert(blog_content);
        if(blog_title && blog_classify && blog_label && blog_content){
            $.ajax({
                url: './../all/',
                data: {'post_type': 'create_blog', 'blog_title': blog_title, 'blog_classify': blog_classify, 'blog_label': blog_label, 'blog_content': blog_content},
                type: 'post',
                dataType: 'json',
                success: function (data, xhr, status) {
                    var result = data.result;
                    // alert(result);
                    if(result){
                        alert('create blog success');
                        // 可以做一个弹出框
                        $('#create_blog').modal('hide').attr('class', 'modal fade');
                        window.location.href = "/blog/1";
                        return true;
                    }else{
                        alert('create blog fail');
                        return false;
                    }
                },
                error: function () {
                    $('#create_blog').modal('hide').attr('class', 'modal fade');
                    return false;
                }
            })
        }
        else{
            $('#modal_blog_title').css('border', "3px solid red");
            $('#modal_blog_classify_choose').css('border', "3px solid red");
            $('#modal_blog_label_choose').css('border', "3px solid red");
            $('#modal_blog_content').css('border', "3px solid red");
            return false;
        }
    });
    $('#btn_second_create').on('click', function () {
        //1.ajax请求将表单数据传入后端写入数据库(执行save click事件)
        $(':input', '#modal_form')
            .not(':button', ':reset', ':hidden', ':submit')
            .val('')
            .removeAttr('checked')
            .removeAttr('selected');
        return true;
    })
});
$(function () {
    $('#btn_cancel_blog').on('click', function () {
        $('#create_blog').modal('hide').attr('class', 'modal fade');
    });
    $('#btn_save_blog').on('click', function () {
        var blog_title = $('#modal_blog_title').val();
        // alert(blog_title);
        //1.类型
        var blog_classify = '';
        //2.标签
        var blog_label = '';
        var blog_content = $('#modal_blog_content').val();
        // alert(blog_content);
        if(blog_title && blog_classify && blog_label && blog_content){
            $.ajax({
                url: './',
                data: {},
                type: 'post',
                dataType: 'json',
                success: function (data, xhr, status) {
                    var result = data.result;
                    alert(result);
                    $('#create_blog').modal('hide').attr('class', 'modal fade');
                    return true;
                },
                error: function () {
                    $('#create_blog').modal('hide').attr('class', 'modal fade');
                    return true;
                }
            })
        }
        else{
            // alert('hahah');
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
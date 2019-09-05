$(function () {
   $('#height_search').on('click', function () {
       var status = $('#height_search_form').attr('style');
       if('display: none' === status){
           $('#height_search_form').removeAttr('style');
       }else{
           $('#height_search_form').attr('style', 'display: none');
       }
   });
    $('#btn_clear_content').on('click', function () {
        $(':input', '#search_form')
            .not(':button', ':reset', ':hidden', ':submit')
            .val('')
            .removeAttr('checked')
            .removeAttr('selected');
    });
    $('#btn_height_query').on('click', function () {
        var search_id = $('#search_id').val();
        var search_title = $('#search_title').val();
        var search_name = $('#search_name').val();
        var search_classify = $('#search_classify').val();
        var search_label = $('#search_label').val();
        var search_date = $('#search_data').val();
        $('#height_search_form').attr('style', 'display: none');
        var post_type = 'height_query';
        $.ajax({
            url:'./height_query/',
            data:{'post_type': post_type,'search_id': search_id, 'search_title': search_title, 'search_name': search_name, 'search_classify': search_classify, 'search_label': search_label, 'search_date': search_date},
            type:'post',
            dataType:'json',
            async:'true',
            success:function (data,xhr,status) {
                var result = data.result;
                alert(result);
                alert('高级搜索ajax请求成功,返回table数据');
                //显示table数据
            },
            error:function () {
                return false;
            }

        })
    })
});
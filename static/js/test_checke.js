$(function () {
    $('#all_choose').on('click', function () {
        var all_choose = $(this).is(':checked');
        if(all_choose){
            $('#btn_disable').removeAttr('disabled');
            $('#btn_delete').removeAttr('disabled');
            $('#show_data tbody tr td input').attr('checked', 'checked');
            return true;
        }
        else{
            $('#btn_disable').attr('disabled', 'disabled');
            $('#btn_delete').attr('disabled', 'disabled');
            $('#show_data tbody tr td input').removeAttr('checked');
        }

    })
});
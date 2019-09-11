$(function () {
    $('#all_choose').on('click', function () {
        var all_choose = $(this).is(':checked');
        if(all_choose){
            $('#btn_disable').removeAttr('disabled');
            $('#btn_delete').removeAttr('disabled');
            $('#show_data tbody tr td input[type="checkbox"]').prop("checked",true).attr('checked', 'checked');
            return true;
        }
        else{
            $('#btn_disable').attr('disabled', 'disabled');
            $('#btn_delete').attr('disabled', 'disabled');
            $('#show_data tbody tr td input[type="checkbox"]').prop("checked",false).removeAttr('checked');
        }

    });
    // $('#show_data tbody tr td input[type="checkbox"]').each(function () {
    //     if($(this).attr("checked","checked")){
    //         $('#btn_disable').removeAttr('disabled');
    //         $('#btn_delete').removeAttr('disabled');
    //     }
    // })
});
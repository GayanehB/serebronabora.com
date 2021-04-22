function hideHints(sender) {
    jQuery(sender).parent().find('label').hide();
}
function restoreHints(sender) {
    if (!jQuery(sender).parent().find('input').val()) {
        jQuery(sender).parent().find('label').show();
    }
}

jQuery(document).ready(function(){

    jQuery('#conferenceSchedule').on('click', 'table tbody tr', function(){ jQuery(this).find('.more').fadeToggle(200); return false; });
    jQuery('#conferenceRegistration').on('click', 'label', function(){
        jQuery(this).siblings('input').focus();
    });
    jQuery('#conferenceRegistration').on('focus', 'input', function(){
        hideHints(this);
    });
    jQuery('#conferenceRegistration').on('focusout', 'input', function(){
        restoreHints(this);
    });
    jQuery('#conferenceRegistration').on('click', 'a.register', function(){
        jQuery("#conferenceRegistration form").show();
        jQuery(this).parents('.description:first').hide();

        return false;
    });
    jQuery('#conferenceRegistration .save').on('click', 'a', function(){

        var form = jQuery(this).parents('form:first');
        if (!form.find('input[name*=fullName]').val().length || !form.find('input[name*=email]').val().length) {
            jQuery('#conferenceRegistration').find('.errorRequired').show();
        } else {
            jQuery('#conferenceRegistration').find('.errorRequired').hide();


            jQuery.ajax({
                url: form.attr('action'),
                type: 'post',
                dataType: 'json',
                data: form.serialize(),
                beforeSend: function() {
                    jQuery('#conferenceRegistration').find('.serverError, .error').hide();
                    jQuery('#conferenceRegistration').find('.sending').show();
                },
                success: function (data) {
                    if (data['status'] && data['status'] == 'ok') {
                        jQuery('#conferenceRegistration').find('.success, .thankYou').show();
                        form.hide();
                    } else {
                        jQuery('#conferenceRegistration').find('.serverError').show();
                    }
                },
                complete: function() {
                    jQuery('#conferenceRegistration').find('.sending').hide();
                }

            });

        }


        return false;
    });

});
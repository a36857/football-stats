"use strict";

$(document).ready(function() {

    $(".delete-team-form").submit(function(e) {
        e.preventDefault();

        var team = $(this).find('[name="team"]').val();
        $("#t"+team).hide();
        $("#l"+team).show();

        $.ajax({
            url     : $(this).attr('action'),
            type    : $(this).find('[name="_method"]').val(),
            data    : $(this).serialize(),
            success : function(response) {
                $("#t"+team).remove();
                $("#l"+team).hide();
            },
            error   : function(){
                $("#l"+team).hide();
                $("#t"+team).show();
            }
        });

        return false;
    });

});
"use strict";

$(document).ready(function() {

    $(".delete-team-form").submit(function(e) {
        e.preventDefault();

        var team = $(this).find('[name="team"]').val();

        $.ajax({
            url     : $(this).attr('action'),
            type    : $(this).find('[name="_method"]').val(),
            data    : $(this).serialize(),
            success : function(response) {
                $("#"+team).remove();
            }
        });

        return false;
    });

});
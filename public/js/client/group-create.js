"use strict";

$(document).ready(function() {
   // var submitting = false; //cause some bug when user goes crazy on the submit button

    $('#group-form').submit(function(e) {
        e.preventDefault();
        //if(!submitting) { submitting = true;

            var input = $("#input-group").val();
            $('#loader').show();

            $.ajax({
                url: $(this).attr('action'),
                type: $(this).attr('method'),
                data: $(this).serialize(),
                success: function (response) {
                    insertNewGroup(response, input);
                    $('#loader').hide();
          //          submitting = false;
                },
                error: function () {
                    $('#loader').hide();
            //        submitting = false;
                }
            });
        //}
        return false;
    });

    function insertNewGroup(id,name) {
        var li = document.createElement("li");
        var a  = document.createElement("a");

        a.setAttribute("href","/groups/" + id);
        a.setAttribute("class","well well-small");
        a.innerHTML = name;

        li.appendChild(a);
        document.getElementById("groups").appendChild(li);
    }
});

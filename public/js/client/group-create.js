"use strict";

$(document).ready(function() {
    $('#group-form').submit(function(e) {
        e.preventDefault();

        var input = $("#input-group").val();

        $.ajax({
            url     : $(this).attr('action'),
            type    : $(this).attr('method'),
            data    : $(this).serialize(),
            success : function(response) {
                insertNewGroup(response,input);
            }
        });

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

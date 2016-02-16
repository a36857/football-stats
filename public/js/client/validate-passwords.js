"use strict";

function validatePasswords() {
    var pass = document.forms["registration-form"]["password"].value;
    var confpass = document.forms["registration-form"]["confirmPassword"].value;

    if(pass!=confpass) {
        $("#error-password").removeClass('hidden');
        if($('#error').length) $("#error").remove();
        return false;
    }
    else
        return true;
}

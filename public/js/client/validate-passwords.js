"use strict";

const passwordLenght = 6;

function validatePasswords() {
    let pass = document.forms["registration-form"]["password"].value;
    let confpass = document.forms["registration-form"]["confirmPassword"].value;

    if(pass.length < passwordLenght || confpass.length < passwordLenght) {
        return false;
    }
    else if(pass!=confpass) {
        $("#error-password").removeClass('hidden');
        if($('#error').length) $("#error").remove();
        return false;
    }
    else
        return true;
}

function verifyLength(id,input) {
    let parent = $('#'+id);

    if(input.length == 0) {
        parent.find('.ok').addClass('hidden');
        parent.find('.remove').addClass('hidden');
    }
    else {
        if(input.length < passwordLenght) {
            parent.find('.ok').addClass('hidden');
            parent.find('.remove').removeClass('hidden');
        }
        else {
            parent.find('.remove').addClass('hidden');
            parent.find('.ok').removeClass('hidden');
        }
    }
}
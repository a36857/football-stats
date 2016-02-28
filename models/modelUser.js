"use strict";

const mapper  = require('./../data_mapper/db/users_mapper/users-mapper');
const onError = require('./../utils/handler-error').onError;


function User(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
}

module.exports.post = function(username,email,password,cb) {
    mapper.getAll(onError(cb,function(users) {
        var exists = false;
        for(let k in users) {
            let user = users[k];
            if(user.username==username){
                exists = true;
            }
        }
        exists ? cb(true,null) : mapper.post(new User(username,email,password),cb);
    }));
}

module.exports.get = function(id,cb) {
    mapper.get(id,cb);
}

module.exports.getAll = function(cb) {
    mapper.getAll(cb);
}

module.exports.put = function(id,oldPassword,newPassword,cb) {
    mapper.get(id,onError(cb,function(user) {
        if(user.password == oldPassword) {
            user.password = newPassword;
            mapper.put(id,user,cb);
        }
        else {
            cb(true,null);
        }
    }));
}
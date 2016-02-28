const async   = require('async');
const onError = require('./../utils/handler-error').onErrorObj;

const nav = require('./navbar-info');
const mg  = require('./../models/modelGroup');


module.exports.get = function(user,id,cb) {
    var info = {
        navInfo : null,
        group   : null
    }
    var error = {
        error : null
    }

    async.parallel([getNavbarInfo,getGroupDetails],end);

    function getNavbarInfo(finish) {
        nav.get(user,onError(error,finish,function(data) {
            info.navInfo = data;
            finish();
        }));
    }
    function getGroupDetails(finish) {
        mg.get(id,onError(error,finish,function(data) {
            info.group = data;
            finish();
        }));
    }

    function end() {
        cb(error.error,info);
    }
}
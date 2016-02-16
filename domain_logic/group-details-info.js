const async = require('async');
const e     = require('./../utils/handler-error');

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
        nav.get(user,e.onErrorObj(error,finish,function(data) {
            info.navInfo = data;
            finish();
        }));
    }
    function getGroupDetails(finish) {
        mg.get(id,e.onErrorObj(error,finish,function(data) {
            info.group = data;
            finish();
        }));
    }

    function end() {
        cb(error.error,info);
    }
}
const async = require('async');
const e     = require('./../utils/handler-error');

const nav = require('./navbar-info');
const mt  = require('./../models/modelTeam');


module.exports.get = function(user,id,cb) {
    var info = {
        navInfo : null,
        team    : null
    }
    var error = {
        error : null
    }

    async.parallel([getNavbarInfo,getTeam],end);

    function getNavbarInfo(finish) {
        nav.get(user,e.onErrorObj(error,finish,function(data) {
            info.navInfo = data;
            finish();
        }));
    }
    function getTeam(finish) {
        mt.get(id,e.onErrorObj(error,finish,function(data) {
            info.team = data;
            finish();
        }));
    }

    function end() {
        cb(error.error,info);
    }
}
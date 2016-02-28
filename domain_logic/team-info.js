const async   = require('async');
const onError = require('./../utils/handler-error').onErrorObj;

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
        nav.get(user,onError(error,finish,function(data) {
            info.navInfo = data;
            finish();
        }));
    }
    function getTeam(finish) {
        mt.get(id,onError(error,finish,function(data) {
            info.team = data;
            finish();
        }));
    }

    function end() {
        cb(error.error,info);
    }
}
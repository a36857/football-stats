const async   = require('async');
const onError = require('./../utils/handler-error').onErrorObj;

const nav = require('./navbar-info');
const mlt = require('./../models/modelLeagueTable');


module.exports.get = function(user,id,cb) {
    var info = {
        navInfo : null,
        table   : null
    }
    var error = {
        error : null
    }

    async.parallel([getNavbarInfo,getLeagueTable],end);

    function getNavbarInfo(finish) {
        nav.get(user,onError(error,finish,function(data) {
            info.navInfo = data;
            finish();
        }));
    }
    function getLeagueTable(finish) {
        mlt.get(id,onError(error,finish,function(data) {
            info.table = data;
            finish();
        }));
    }

    function end(){
        cb(error.error,info);
    }
}
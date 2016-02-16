const async = require('async');
const e     = require('./../utils/handler-error');

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
        nav.get(user,e.onErrorObj(error,finish,function(data) {
            info.navInfo = data;
            finish();
        }));
    }
    function getLeagueTable(finish) {
        mlt.get(id,e.onErrorObj(error,finish,function(data) {
            info.table = data;
            finish();
        }));
    }

    function end(){
        cb(error.error,info);
    }
}
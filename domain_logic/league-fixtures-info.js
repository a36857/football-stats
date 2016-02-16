const async = require('async');
const e     = require('./../utils/handler-error');

const nav = require('./navbar-info');
const mlf = require('./../models/modelLeagueFixtures');


module.exports.get = function(user,id,cb) {
    var info = {
        navInfo : null,
        fix     : null
    }
    var error = {
        error : null
    }

    async.parallel([getNavbarInfo,getLeagueFixtures],end);

    function getNavbarInfo(finish) {
        nav.get(user,e.onErrorObj(error,finish,function(data) {
            info.navInfo = data;
            finish();
        }));
    }
    function getLeagueFixtures(finish) {
        mlf.get(id,e.onErrorObj(error,finish,function(data) {
            info.fix = data;
            finish();
        }));
    }

    function end() {
        cb(error.error,info);
    }
}
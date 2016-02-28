const async   = require('async');
const onError = require('./../utils/handler-error').onErrorObj;

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
        nav.get(user,onError(error,finish,function(data) {
            info.navInfo = data;
            finish();
        }));
    }
    function getLeagueFixtures(finish) {
        mlf.get(id,onError(error,finish,function(data) {
            info.fix = data;
            finish();
        }));
    }

    function end() {
        cb(error.error,info);
    }
}
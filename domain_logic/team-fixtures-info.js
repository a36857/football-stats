const async   = require('async');
const onError = require('./../utils/handler-error').onErrorObj;

const nav = require('./navbar-info');
const mtf = require('./../models/modelTeamFixtures');


module.exports.get = function(user,id,cb) {
    var info = {
        navInfo : null,
        fix     : null
    }
    var error = {
        error : null
    }

    async.parallel([getNavbarInfo,getTeamFixtures],end);

    function getNavbarInfo(finish) {
        nav.get(user,onError(error,finish,function(data) {
            info.navInfo = data;
            finish();
        }));
    }
    function getTeamFixtures(finish) {
        mtf.get(id,onError(error,finish,function(data) {
            info.fix = data;
            finish();
        }));
    }

    function end() {
        cb(error.error,info);
    }
}
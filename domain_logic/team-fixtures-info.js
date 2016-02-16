const async = require('async');
const e     = require('./../utils/handler-error');

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
        nav.get(user,e.onErrorObj(error,finish,function(data) {
            info.navInfo = data;
            finish();
        }));
    }
    function getTeamFixtures(finish) {
        mtf.get(id,e.onErrorObj(error,finish,function(data) {
            info.fix = data;
            finish();
        }));
    }

    function end() {
        cb(error.error,info);
    }
}
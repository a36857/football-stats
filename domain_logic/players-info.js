const async = require('async');
const e     = require('./../utils/handler-error');

const nav = require('./navbar-info');
const mtp = require('./../models/modelTeamPlayers');


module.exports.get = function(user,id,cb) {
    var info = {
        navInfo: null,
        teamPlayers: null
    }
    var error = {
        error: null
    }

    async.parallel([getNavbarInfo, getTeamPlayers], end);

    function getNavbarInfo(finish) {
        nav.get(user,e.onErrorObj(error, finish, function (data) {
            info.navInfo = data;
            finish();
        }));
    }

    function getTeamPlayers(finish) {
        mtp.get(id,e.onErrorObj(error, finish, function (data) {
            info.teamPlayers = data;
            finish();
        }));
    }

    function end() {
        cb(error.error, info);
    }
}
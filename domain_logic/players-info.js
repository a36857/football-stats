const async   = require('async');
const onError = require('./../utils/handler-error').onErrorObj;

const nav = require('./navbar-info');
const mtp = require('./../models/modelTeamPlayers');


module.exports.get = function(user,id,cb) {
    var info = {
        navInfo     : null,
        teamPlayers : null
    }
    var error = {
        error: null
    }

    async.parallel([getNavbarInfo, getTeamPlayers], end);

    function getNavbarInfo(finish) {
        nav.get(user,onError(error, finish, function (data) {
            info.navInfo = data;
            finish();
        }));
    }

    function getTeamPlayers(finish) {
        mtp.get(id,onError(error, finish, function (data) {
            info.teamPlayers = data;
            finish();
        }));
    }

    function end() {
        cb(error.error, info);
    }
}
const async   = require('async');
const onError = require('./../utils/handler-error').onErrorObj;

const nav = require('./navbar-info');
const ml  = require('./../models/modelLeague');
const mf  = require('./../models/modelLeagueFixtures');
const mt  = require('./../models/modelLeagueTable');

module.exports.get = function(user,id,cb) {
    var info = {
        navInfo     : null,
        league      : null,
        fixtures    : null,
        leagueTable : null
    }
    var error = {
        error : null
    }

    async.parallel([getNavbarInfo,getLeague,getFixtures,getLeagueTable],end);

    function getNavbarInfo(finish) {
        nav.get(user,onError(error,finish,function(data) {
            info.navInfo = data;
            finish();
        }));
    }
    function getLeague(finish) {
        ml.get(id,onError(error,finish,function(data) {
            info.league = data;
            finish();
        }));
    }
    function getFixtures(finish) {
        mf.get(id,onError(error,finish,function(data) {
            info.fixtures = data;
            finish();
        }));
    }
    function getLeagueTable(finish) {
        mt.get(id,onError(error,finish,function(data){
            info.leagueTable = data;
            finish();
        }));
    }

    function end(){
        cb(error.error,info);
    }
}
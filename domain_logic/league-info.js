const async = require('async');
const e     = require('./../utils/handler-error');

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
        nav.get(user,e.onErrorObj(error,finish,function(data) {
            info.navInfo = data;
            finish();
        }));
    }
    function getLeague(finish) {
        ml.get(id,e.onErrorObj(error,finish,function(data) {
            info.league = data;
            finish();
        }));
    }
    function getFixtures(finish) {
        mf.get(id,e.onErrorObj(error,finish,function(data) {
            info.fixtures = data;
            finish();
        }));
    }
    function getLeagueTable(finish) {
        mt.get(id,e.onErrorObj(error,finish,function(data){
            info.leagueTable = data;
            finish();
        }));
    }

    function end(){
        cb(error.error,info);
    }
}
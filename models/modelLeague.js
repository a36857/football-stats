"use strict";

const fapi    = require('./../data_mapper/fapi/fapi');
const onError = require('./../utils/handler-error').onError;

var leagues;

module.exports.getAll = function(cb) {
    leagues ? cb(null,leagues) : fapi.getLeagues(onError(cb,caching));

    function caching(data) {
        leagues = data;
        cb(null,data);
    }
}

module.exports.get = function(id,cb) {
    leagues ? getLeagueFromCache() : fapi.getLeague(id,cb);

    function getLeagueFromCache() {
        for (let i = 0; i < leagues.length; ++i) {
            let league = leagues[i];
            if(id == league.id) {
                cb(null,league);
                return;
            }
        }
        cb(true,null);
    }
}
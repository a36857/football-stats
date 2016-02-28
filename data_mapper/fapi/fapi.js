"use strict";

const http   = require('./../http/http');
const config = require('./fapiconfig.json');

function Options() {
    this.host = config.host;
    this.path = config.path;
    this.headers = config.headers;
}

module.exports.getLeagues = function(cb) {
   doRequest('/soccerseasons/',cb);
}

module.exports.getTeams = function(id,cb) {
    doRequest('/soccerseasons/' +id + "/teams",cb);
}

module.exports.getLeague = function(id,cb) {
    doRequest('/soccerseasons/' + id,cb);
}

module.exports.getLeagueTable = function(id,cb) {
    doRequest('/soccerseasons/' + id + '/leagueTable',cb);
}

module.exports.getTeam = function(id,cb) {
    doRequest('/teams/' + id,cb);
}

module.exports.getTeamPlayers = function(id,cb) {
    doRequest('/teams/' + id + "/players",cb);
}

module.exports.getLeagueFixtures = function(id,cb) {
    doRequest('/soccerseasons/' + id + '/fixtures',cb);
}

module.exports.getTeamFixtures = function(id,cb) {
    doRequest('/teams/' + id + '/fixtures',cb);
}


function doRequest(path,cb) {
    var options = new Options();
    options.path += path;
    http.httpRequest(options,cb);
}
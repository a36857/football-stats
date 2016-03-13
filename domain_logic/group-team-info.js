"use strict";

const async         = require('async');
const onErrorAsync  = require('./../utils/handler-error').onErrorObj;
const onError       = require('./../utils/handler-error').onError;


const nav = require('./navbar-info');
const mf  = require('./../models/modelTeamFixtures');
const mg  = require('./../models/modelGroup');


module.exports.get = function(user,idTeam,idGroup,n,cb) {
    var info = {
        navInfo: null,
        lastGames: null,
        nextGames: null,
        group: null,
        team: null
    }
    var error = {
        error: null
    }

    async.parallel([getNavbarInfo, getGroup], end);

    function getNavbarInfo(finish) {
        nav.get(user, onErrorAsync(error, finish, function (data) {
            info.navInfo = data;
            finish();
        }));
    }

    function getGroup(finish) {
        mg.get(idGroup, onErrorAsync(error, finish, function (data) {
            info.group = data;
            finish();
        }));
    }

    function end() {
        error.error ? cb(error.error, null) : getTeam(idTeam,info,n,cb);
    }
}

/***
 * Callbacks to run after End Callback on Async
 ****/
function getTeam(idTeam,info,n,cb) {
    info.group.teams.forEach((t)=> {
        if(t.teamID == idTeam) {
            info.team = t.teamName;
        }
    });

    info.team ? getTeamFixtures(idTeam,cb,processFixtures) : cb(404,null);


    function processFixtures(fix) {
        var lastGames=[], nextGames=[];
        var N = n;
        var i= 0, j=0;
        fix.fixtures.forEach((fix) => {
            if(j==N){ return;}
            if(fix.status!="FINISHED"){
                nextGames[j++] = fix;
            }
        });

        fix.fixtures.reverse().forEach((fix) => {
            if(i==N){ return;}
            if(fix.status=="FINISHED"){
                lastGames[i++] = fix;
            }
        });

        info.lastGames = lastGames;
        info.nextGames = nextGames;

        cb(null,info);
    }
}

function getTeamFixtures(id,error,cb) {
    mf.get(id,onError(error,cb));
}
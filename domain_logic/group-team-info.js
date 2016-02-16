"use strict";

const async = require('async');
const e     = require('./../utils/handler-error');

const nav = require('./navbar-info');
const mf  = require('./../models/modelTeamFixtures');
const mg  = require('./../models/modelGroup');


module.exports.get = function(user,idTeam,idGroup,n,cb) {
    var info = {
        navInfo   : null,
        fix       : null,
        lastGames : null,
        nextGames : null,
        group     : null,
        team      : null
    }
    var error = {
        error : null
    }

    async.parallel([getNavbarInfo,getTeamFixtures,getGroup],end);

    function getNavbarInfo(finish) {
        nav.get(user,e.onErrorObj(error,finish,function(data) {
            info.navInfo = data;
            finish();
        }));
    }
    function getTeamFixtures(finish) {
        mf.get(idTeam,e.onErrorObj(error,finish,function(data) {
            info.fix = data;
            finish();
        }));
    }
    function getGroup(finish) {
        mg.get(idGroup,e.onErrorObj(error,finish,function(data) {
            info.group = data;
            finish();
        }));
    }

    function end() {
        if(error.error){ cb(error.error,null);}
        else {
            var lastGames=[], nextGames=[];
            var N = n;
            var i= 0, j=0;
            info.fix.fixtures.forEach((fix) => {
                if(j==N){ return;}
                if(fix.status!="FINISHED"){
                    nextGames[j++] = fix;
                }
            });

            info.fix.fixtures.reverse().forEach((fix) => {
                if(i==N){ return;}
                if(fix.status=="FINISHED"){
                    lastGames[i++] = fix;
                }
            });

            var teamName;
            info.group.teams.forEach((t)=> {
                if(t.teamID==idTeam){
                    teamName = t.teamName;
                }
            });

            info.team = teamName;
            info.lastGames = lastGames;
            info.nextGames = nextGames;

            cb(null,info);
        }
    }
}
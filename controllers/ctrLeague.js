"use strict";

const domain  = require('./../domain_logic/league-info');
const onError = require('./../utils/handler-error').onErrorNext;

const view = 'league';

module.exports.route = '/leagues/:id';

module.exports.handler = function(req,rsp,next) {
    domain.get(req.user.username,req.params.id,onError(next,function(info) {
        rsp.render(view, {
            username        : req.user.username,
            userGroups      : info.navInfo.userGroups,
            leagues         : info.navInfo.leagues,

            leagueID        : info.league.id,
            caption         : info.league.caption,
            league          : info.league.league,
            year            : info.league.year,
            currentMatchday : info.league.currentMatchday,
            numberOfTeams   : info.league.numberOfTeams,
            numberOfGames   : info.league.numberOfGames,

            fixtures :
                info.fixtures.fixtures.filter((v) => { return v.status=="FINISHED"})
                                            .reverse()
                                            .top(info.league.numberOfTeams / 2),

            standing :
                info.leagueTable.standing
        });
    }));
}


Array.prototype.top = function(n) {
    var count = 0;
    var ret = [];
    this.forEach((e)=>{ if(count++ < n) ret.push(e)});
    return ret;
}
const domain = require('./../domain_logic/group-team-info');
const model  = require('./../models/modelGroup');
const e      = require('./../utils/handler-error');

const view = 'group_team';

module.exports.route = '/groups/:groupID/teams/:teamID'; //'cause several groups can use the same team

module.exports.handlerGet = function(req,rsp,next) {
    domain.get(
        req.user.username,
        req.params.teamID,
        req.params.groupID,
        req.query.n,
        e.onErrorNext(next,function(info) {
             rsp.render(view,{
                username    : req.user.username,
                leagues     : info.navInfo.leagues,
                userGroups  : info.navInfo.userGroups,

                team        : info.team,
                nextGames   : info.nextGames,
                lastGames   : info.lastGames,
                groupID     : req.params.groupID,
                teamID      : req.params.teamID
             });
    }));
}


module.exports.handlerDelete = function(req,rsp,next) {
    model.deleteGroupTeam(req.params.teamID,req.params.groupID,e.onErrorNext(next,function(data) {
        rsp.redirect(303, "/groups/" + req.params.groupID);
    }));
}

const domain  = require('./../domain_logic/players-info');
const onError = require('./../utils/handler-error').onErrorNext;

const view = 'team_players';

module.exports.route = '/teams/:id/players';

module.exports.handler = function(req,rsp,next) {
    domain.get(req.user.username,req.params.id,onError(next,function(info) {
        rsp.render(view, {
            username    : req.user.username,
            leagues     : info.navInfo.leagues,
            userGroups  : info.navInfo.userGroups,

            players     : info.teamPlayers.players
        });
    }));
}
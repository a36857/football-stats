const domain = require('./../domain_logic/players-info');
const e      = require('./../utils/handler-error');

const view = 'team_players';

module.exports.route = '/teams/:id/players';

module.exports.handler = function(req,rsp,next) {
    domain.get(req.user.username,req.params.id,e.onErrorNext(next,function(info) {
        rsp.render(view, {
            username    : req.user.username,
            leagues     : info.navInfo.leagues,
            userGroups  : info.navInfo.userGroups,

            players     : info.teamPlayers.players
        });
    }));
}
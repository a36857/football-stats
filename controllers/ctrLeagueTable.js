const domain  = require('./../domain_logic/leaguetable-info');
const onError = require('./../utils/handler-error').onErrorNext;

const view = 'league_table';

module.exports.route = '/leagues/:id/leaguetable';

module.exports.handler = function(req,rsp,next) {
    domain.get(req.user.username,req.params.id,onError(next,function(info) {
        rsp.render(view, {
            username        : req.user.username,
            leagues         : info.navInfo.leagues,
            userGroups      : info.navInfo.userGroups,

            leagueCaption   : info.table.leagueCaption,
            standing        : info.table.standing
        });
    }));
}
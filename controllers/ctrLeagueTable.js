const domain = require('./../domain_logic/leaguetable-info');
const e      = require('./../utils/handler-error');

const view = 'league_table';

module.exports.route = '/leagues/:id/leaguetable';

module.exports.handler = function(req,rsp,next) {
    domain.get(req.user.username,req.params.id,e.onErrorNext(next,function(info) {
        rsp.render(view, {
            username        : req.user.username,
            leagues         : info.navInfo.leagues,
            userGroups      : info.navInfo.userGroups,

            leagueCaption   : info.table.leagueCaption,
            standing        : info.table.standing
        });
    }));
}
const domain = require('./../domain_logic/team-fixtures-info');
const e      = require('./../utils/handler-error');

const view = 'fixtures';

module.exports.route = '/teams/:id/fixtures';

module.exports.handler = function(req,rsp,next) {
    domain.get(req.user.username,req.params.id,e.onErrorNext(next,function(info) {
        rsp.render(view,{
            username    : req.user.username,
            leagues     : info.navInfo.leagues,
            userGroups  : info.navInfo.userGroups,

            fixtures    : info.fix.fixtures.filter((v) => { return v.status=="FINISHED"}).reverse()
        });
    }));
}
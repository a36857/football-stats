const domain  = require('./../domain_logic/league-fixtures-info');
const onError = require('./../utils/handler-error').onErrorNext;

const view = 'fixtures';

module.exports.route = '/leagues/:id/fixtures';

module.exports.handler = function(req,rsp,next) {
    domain.get(req.user.username,req.params.id,onError(next,function(info) {
        rsp.render(view,{
            username    : req.user.username,
            leagues     : info.navInfo.leagues,
            userGroups  : info.navInfo.userGroups,

            fixtures    : info.fix.fixtures.filter((v) => { return v.status=="FINISHED"}).reverse()
        });
    }));
}
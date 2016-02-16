const domain = require('./../domain_logic/team-info');
const model  = require('./../models/modelGroup');
const e      = require('./../utils/handler-error');

const view = 'team';

module.exports.route = "/teams/:id";

module.exports.handler = function (req,rsp,next) {
    domain.get(req.user.username,req.params.id,e.onErrorNext(next,function(info){
        rsp.render(view, {
            username        : req.user.username,
            leagues         : info.navInfo.leagues,
            userGroups      : info.navInfo.userGroups,

            self            : info.team._links.self.href,
            name            : info.team.name,
            code            : info.team.code,
            shortName       : info.team.shortName,
            squadMarketValue: info.team.squadMarketValue,
            crestUrl        : info.team.crestUrl,
            link            : info.team._links.self.href
        });
    }));
}

module.exports.handlerPost = function(req,rsp,next) {
    model.put(req.params.id,req.body.groupID,e.onErrorNext(next,function(data){
        rsp.redirect(303,"/groups/" + req.body.groupID);
    }));
}

const domain  = require('./../domain_logic/group-details-info');
const model   = require('./../models/modelGroup');
const onError = require('./../utils/handler-error').onErrorNext;

const view = 'group_details';

module.exports.route = '/groups/:id';

module.exports.handlerGet = function(req,rsp,next) {
    domain.get(req.user.username,req.params.id,onError(next,function(info) {
        rsp.render(view, {
            username    : req.user.username,
            leagues     : info.navInfo.leagues,
            userGroups  : info.navInfo.userGroups,

            name        : info.group.name,
            teams       : info.group.teams,
            groupID     : req.params.id
        });
    }));
}

module.exports.handlerDelete = function(req,rsp,next) {
    model.deleteGroup(req.params.id,onError(next,function(data) {
        rsp.redirect(303,"/groups");
    }));
}
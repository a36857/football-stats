const navbar  = require('./../domain_logic/navbar-info');
const onError = require('./../utils/handler-error').onErrorNext;

const view = 'index';

module.exports.route = '/';

module.exports.handler = function(req,rsp,next) {
    navbar.get(req.user.username,onError(next,function(data) {
        rsp.render(view,{
            id          : req.user.id,
            username    : req.user.username,

            leagues     : data.leagues,
            userGroups  : data.userGroups
        });
    }));
}

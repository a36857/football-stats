const navbar = require('./../domain_logic/navbar-info');
const e      = require('./../utils/handler-error');

const view = 'index';

module.exports.route = '/';

module.exports.handler = function(req,rsp,next) {
    navbar.get(req.user.username,e.onErrorNext(next,function(data) {
        rsp.render(view,{
            id          : req.user.id,
            username    : req.user.username,

            leagues     : data.leagues,
            userGroups  : data.userGroups
        });
    }));
}

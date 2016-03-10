const model   = require('./../models/modelUser');
const onError = require('./../utils/handler-error').onErrorNext;

const view = 'profile_user';

module.exports.route = '/user';

module.exports.handler = function(req,rsp,next) {
    model.get(req.user.id,onError(next,function(user) {
        rsp.render(view, {
            id       : req.user.id,
            username : req.user.username,
            email    : user.email,
            avatar   : user.avatar,
            changes  : req.query.save
        });
    }));
}
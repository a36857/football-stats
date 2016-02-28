const model   = require('./../models/modelUser');
const onError = require('./../utils/handler-error').onErrorNext;

const view = 'profile_user';

module.exports.route = '/user';

module.exports.handler = function(req,rsp) {
    rsp.render(view, {
        id       : req.user.id,
        username : req.user.username,
        email    : req.user.email,
        avatar   : req.user.avatar,
        changes  : req.query.save
    });
}
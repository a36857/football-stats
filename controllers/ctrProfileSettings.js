const model   = require('./../models/modelUser');
const onError = require('./../utils/handler-error').onErrorNext;

const view = 'profile_settings';

module.exports.route = '/user/settings';

module.exports.handlerGet = function(req,rsp,next) {
    model.get(req.user.id, onError(next,function(user) {
        rsp.render(view, { username: req.user.username, id: req.user.id , email: user.email, avatar: user.avatar});
    }));
}


module.exports.handlerPut = function(req,rsp) {
    model.put(req.user.id,req.body.oldPassword,req.body.password,function(err,user) {
        if(err) {
            rsp.render(view,{
                username    : req.user.username,
                id          : req.user.id,
                email       : user.email,
                avatar      : user.avatar,
                error       : "Error! Old password wrong"
            });
        }
        else rsp.redirect(303,'/user?save='+true);
    });
}
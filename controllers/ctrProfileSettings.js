const model = require('./../models/modelUser');

const view = 'profile_settings';

module.exports.route = '/user/settings';

module.exports.handlerGet = function(req, rsp) {
    rsp.render(view, { username: req.user.username, id: req.user.id , email: req.user.email, avatar: req.user.avatar});
}


module.exports.handlerPut = function(req,rsp) {
    model.put(req.user.id,req.body.oldPassword,req.body.password,function(err,data) {
        if(err) {
            rsp.render(view,{
                username    : req.user.username,
                id          : req.user.id,
                email       : req.user.email,
                avatar      : req.user.avatar,
                error       : "Error! Old password wrong"
            });
        }
        else rsp.redirect(303,'/user?save='+true);
    });
}
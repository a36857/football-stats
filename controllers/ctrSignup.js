const model = require('./../models/modelUser');

const view = 'signup';

module.exports.route = '/signup';

module.exports.handlerGet = function(req,rsp,next) {
    rsp.render(view,{error: req.flash('errormessage')});
}


module.exports.handlerPost = function(req,rsp,next) {
    model.post(req.body.username,req.body.email,req.body.password,
        (err, data) => {
            if(err) rsp.render(view,{error: "Username already exits"});
            else rsp.redirect(303, "/login?signup="+true);
    });
}
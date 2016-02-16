

module.exports.IsAuthenticate = function(req,rsp,next) {
    if(!req.user) rsp.redirect(303,'/login');
    else next();
}
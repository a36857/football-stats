const view = 'login';

module.exports.route = '/login';

module.exports.handler = function(req,rsp) {
    rsp.render(view, { error: req.flash('errormessage'), signup: req.query.signup });
}

module.exports.route = '/logout';

module.exports.handler = function(req, res) {
    req.logout();
    res.redirect(303,'/login');
}
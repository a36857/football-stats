

module.exports.httpMethodOverride = function(req, res) {
    if(req.body && typeof(req.body === 'object') && ('_method' in req.body)){
        var method = req.body._method;
        return method;
    }
}

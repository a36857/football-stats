
const view = '404';

module.exports.route = '*';

module.exports.handlerGet = function(req,rsp) {
    console.log("404 url: %s",req.url);
    send(rsp);
}

module.exports.handler = function(err,req,rsp,next) {
    if(err.status !== 404) {
        return next();
    }
    send(rsp);
}

function send(rsp){
    rsp.status(404);
    rsp.render(view,{});
}
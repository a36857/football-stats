
const view = '5XX'

module.exports.handler = function(err,req,rsp,next) {
    rsp.status(500);
    rsp.render(view);
}
const app   = require('../app');
const debug = require('debug')('Football-APP:server');
const http  = require('http');

const port = Number(process.env.PORT) || 3000;

module.exports.startServer = function (app) {
    var server = http.createServer(app);
    server.on("listening", onListening);
    server.listen(port);

    function onListening() {
        console.log("server open %j", server.address());
        debug("server open %j", server.address());
    }
}
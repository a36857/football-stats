const express            = require('express');

const ctrProfile         = require('./../../controllers/ctrProfile');
const ctrProfileSettings = require('./../../controllers/ctrProfileSettings');

var app = express.Router();


app.get(ctrProfile.route,ctrProfile.handler);
app.route(ctrProfileSettings.route)
    .get(ctrProfileSettings.handlerGet)
    .put(ctrProfileSettings.handlerPut);


module.exports.routes = app;
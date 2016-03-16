const express           = require('express');

const ctrIndex          = require('./../../controllers/ctrIndex');

const ctrLeague         = require('./../../controllers/ctrLeague');
const ctrLeagueFixtures = require('./../../controllers/ctrLeagueFixtures');
const ctrLeagueTable    = require('./../../controllers/ctrLeagueTable');

const ctrTeam           = require('./../../controllers/ctrTeam');
const ctrTeamFixtures   = require('./../../controllers/ctrTeamFixtures');
const ctrTeamPlayers    = require('./../../controllers/ctrTeamPlayers');

const ctrGroups         = require('./../../controllers/ctrGroups');
const ctrGD             = require('./../../controllers/ctrGroupDetails');
const ctrGroupTeam      = require('./../../controllers/ctrGroupTeam');

var app = express.Router();


app.get(ctrIndex.route,ctrIndex.handler);


app.get(ctrLeague.route,ctrLeague.handler);
app.get(ctrLeagueFixtures.route,ctrLeagueFixtures.handler);
app.get(ctrLeagueTable.route,ctrLeagueTable.handler);

app.get(ctrTeam.route,ctrTeam.handler);
app.get(ctrTeamFixtures.route,ctrTeamFixtures.handler);
app.get(ctrTeamPlayers.route,ctrTeamPlayers.handler);


app.route(ctrGroups.route)
        .get(ctrGroups.handlerGet)
        .post(ctrGroups.handlerPost);

app.route(ctrGD.route)
        .get(ctrGD.handlerGet)
        .post(ctrGD.handlerPost)
        .delete(ctrGD.handlerDelete);

app.route(ctrGroupTeam.route)
        .get(ctrGroupTeam.handlerGet)
        .delete(ctrGroupTeam.handlerDelete);


module.exports.routes = app;
const express        = require('express');
const path           = require('path');
const bodyParser     = require('body-parser');
const methodOverride = require('method-override');
const favicon        = require('serve-favicon');

const passport       = require('passport');
const cookieParser   = require('cookie-parser');
const flash          = require('connect-flash');
const configPass     = require('./app/passport');

const session        = require('express-session');
const server         = require('./server/server');
const mo             = require('./middlewares/method-override');
const authorization  = require('./middlewares/authorization');

const ctrSignup      = require('./controllers/ctrSignup');
const ctrLogin       = require('./controllers/ctrLogin');
const ctrLogout      = require('./controllers/ctrLogout');

const fsp            = require('./app/routes/football-stats-pages');
const up             = require('./app/routes/user-pages');
const ctr404         = require('./controllers/ctr404');
const ctr500         = require('./controllers/ctr500');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// register the view helpers/partials
require('./helpers/view-helpers').registerHelpers();
require('hbs').registerPartials('./views/partials');

// middlewares setup
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.urlencoded({ extended: false }));  // parse application/x-www-form-urlencoded
app.use(methodOverride(mo.httpMethodOverride));

// passport setup
app.use(cookieParser());
app.use(session({ secret: 'secret' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

configPass.config(passport);

// always before the authorization middleware

// public routes config
app.route(ctrLogin.route)
    .get(ctrLogin.handler)
    .post(configPass.authenticate(passport));

app.get(ctrLogout.route,ctrLogout.handler);

app.route(ctrSignup.route)
    .get(ctrSignup.handlerGet)
    .post(ctrSignup.handlerPost);

// authorization middleware
app.use("/",authorization.IsAuthenticate);

// routes config
app.use("/", fsp.routes);
app.use("/", up.routes);
app.get(ctr404.route,ctr404.handlerGet); //should always be the last one!!!

// error handlers
app.use(ctr404.handler);
app.use(ctr500.handler);

// start server
server.startServer(app);
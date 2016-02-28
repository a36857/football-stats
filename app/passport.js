const gravatar = require('gravatar');

const ctrIndex = require('./../controllers/ctrIndex');
const ctrLogin = require('./../controllers/ctrLogin');

const model   = require('./../models/modelUser');
const onError = require('./../utils/handler-error').onError;

const LocalStrategy = require("passport-local").Strategy;

const authenticationStrategy = 'local-login';

module.exports.config = function(passport) {
    passport.use(authenticationStrategy,
        new LocalStrategy(
            {
                usernameField: 'username',
                passwordField: 'password',
                passReqToCallback: true
            },
            function(req, username, password, done) {
                return verifyCredentials(req,username,password,done);
            }
        )
    );

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });
}

module.exports.authenticate = function(passport) {
    return passport.authenticate(authenticationStrategy,
        {
            successRedirect : ctrIndex.route, // redirect to the index page
            failureRedirect : ctrLogin.route, // redirect back to the sign in page if there is an error
            failureFlash : true // allow flash messages
        });
}

function verifyCredentials(req, username, password, done) {
    model.getAll(onError(function(err){ return done(err); },
        function(data) {
            for(var k in data) {
                var user = data[k];
                if(user.username != username)
                    continue;
                else if(user.password != password)
                    return done(null, false, req.flash('errormessage', 'Password invalid!'));
                else
                    return done(null, {username: username,
                        id: user._id,
                        email: user.email,
                        avatar: gravatar.url(user.email,{d:'http://www.readingfc.co.uk/images/common/bg_player_profile_default_big.png'})
                    });
            }
            return done(null, false, req.flash('errormessage', 'User does not exist!'));
        }));
}
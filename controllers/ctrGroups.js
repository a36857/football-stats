"use strict";

const navbar = require('./../domain_logic/navbar-info');
const model  = require('./../models/modelGroup');
const e      = require('./../utils/handler-error');

const view = 'groups';

module.exports.route = '/groups';

module.exports.handlerGet = function(req,rsp,next) {
    navbar.get(req.user.username,e.onErrorNext(next,function(data){
        rsp.render(view,{
            username: req.user.username,

            leagues: data.leagues,
            userGroups: data.userGroups
        });
    }));
}


module.exports.handlerPost = function(req,rsp,next) {
    model.post(req.user.username,
            req.body.groupName,
            function(err,data) {
                if(err) {rsp.status(404); rsp.send();}
                else rsp.send(data.id);
    });
}
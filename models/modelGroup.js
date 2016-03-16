"use strict";

const mapper  = require('./../data_mapper/db/groups_mapper/groups-mapper');
const fapi    = require('./../data_mapper/fapi/fapi');
const onError = require('./../utils/handler-error').onError;

function Group(user, name, t) {
    this.user  = user;
    this.name  = name;
    this.teams = t;
}

module.exports.getAll = function(user,cb) {
    mapper.getGroups(onError(cb,function(groups) {
        groups = Object.keys(groups).map(function(k) { return groups[k] });
        cb(null,groups.filter((g)=>{ return g.user == user;}));
    }));
}

module.exports.get = function(id,cb){
    mapper.getGroupDetails(id,cb);
}

module.exports.post = function(user,name,cb) {
    exports.getAll(user,onError(cb,function(groups) {
        var exists = false;
        for(let i=0; i<groups.length; i++) {
            if(groups[i].name == name){
                exists = true;
            }
        }
        exists ? cb(true,null) : mapper.newGroup(new Group(user,name,[]),cb);
    }))
}

module.exports.put = function(groupID,teamID,cb) {
    fapi.getTeam(teamID,onError(cb,function(data) {
        var team = {
            teamID: teamID,
            teamName: data.name
        };
        mapper.updateGroupTeam(groupID,team,cb);
    }));
}

module.exports.deleteGroup = function(id,cb) {
    mapper.deleteGroup(id,cb);
}

module.exports.deleteGroupTeam = function(teamID,groupID,cb) {
    mapper.getGroupDetails(groupID,onError(cb,function(group){
        for(let i = 0; i < group.teams.length; ++i){
            if(group.teams[i].teamID === teamID)
                group.teams.splice(i,1);
        }
        mapper.updateGroup(group,cb);
    }));
}
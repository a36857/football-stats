"use strict";

const db      = require('./../couch/couch');
const config  = require("./../dbconfig.json").groups;
const onError = require('./../../../utils/handler-error').onError;

const dbname = config.database;
const dbpath = "/" + dbname + "/";

var groups = {}

module.exports.getGroups = function(cb) {
    isEmpty() ? db.readAllDocs(dbpath,onError(cb,add)) : cb(null,groups);

    function add(data) {
        groups = data;
        cb(null,data);
    }
}

module.exports.getGroupDetails = function(id,cb) {
    groups[id] ? cb(null,groups[id]) : db.readDoc(dbpath,id,onError(cb,add));

    function add(data) {
        groups[data._id] = data;
        cb(null,data);
    }
}

module.exports.newGroup = function(group,cb) {
    db.createDoc(dbpath,group,onError(cb,add));

    function add(data) {
        group["_id"] = data.id;
        group["_rev"] = data.rev;
        groups[data.id] = group;
        cb(null,data);
    }
}

module.exports.updateGroupTeam = function(id,team,cb) {
    groups[id] ? update(groups[id]) : db.readDoc(dbpath,id,onError(cb,update));

    function update(group){
        if(verifyExistTeam(group)){ cb(null,null);}
        else {
            group.teams[group.teams.length] = team;
            db.updateDoc(dbpath,group,onError(cb,function(data){
                group["_rev"] = data.rev;
                groups[id] = group;
                cb(null,data);
            }));
        }
    }

    function verifyExistTeam(group) {
        for(let i=0; i<group.teams.length; ++i){
            if(group.teams[i].teamID == team.teamID)
                return true;
        }
        return false;
    }
}

module.exports.updateGroup = function(group,cb) {
    db.updateDoc(dbpath,group,onError(cb,function(data){
        group["_rev"] = data.rev;
        groups[data.id] = group;
        cb(null,data);
    }));
}

module.exports.deleteGroup = function(id,cb) {
    if(groups[id]) {
        db.deleteDoc(dbpath,groups[id],onError(cb,function(data){
            delete groups[id];
            cb(null,data);
        }));
    }
    else {
        db.readDoc(dbpath,id,onError(cb,function(group) {
            db.deleteDoc(dbpath,group,cb);
        }));
    }
}


function isEmpty() {
    return Object.keys(groups).length === 0;
}
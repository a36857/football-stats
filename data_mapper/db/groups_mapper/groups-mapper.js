"use strict";

const db     = require('./../couch/couch');
const config = require("./../dbconfig.json").groups;
const e      = require('./../../../utils/handler-error');

const dbname = config.database;
const dbpath = "/" + dbname + "/";


module.exports.getGroups = function(cb) {
    db.readAllDocs(dbpath,cb);
}

module.exports.getGroupDetails = function(id,cb) {
    db.readDoc(dbpath,id,cb);
}

module.exports.newGroup = function(group,cb) {
    db.createDoc(dbpath,group,cb);
}

module.exports.updateGroupTeam = function(id,team,cb) {
    db.readDoc(dbpath,id,e.onError(function(group) {
        if(verifyExistTeam(group)){ cb(null,null);}
        else {
            group.teams[group.teams.length] = team;
            db.updateDoc(dbpath, group, cb);
        }
    }));
    function verifyExistTeam(group) {
        for(let i=0; i<group.teams.length; ++i){
            if(group.teams[i].teamID == team.teamID)
                return true;
        }
        return false;
    }
}

module.exports.updateGroup = function(group,cb) {
    db.updateDoc(dbpath,group,cb);
}

module.exports.deleteGroup = function(id,cb) {
    db.readDoc(dbpath,id, e.onError(function(group){
        db.deleteDoc(dbpath,group,cb);
    }));
}
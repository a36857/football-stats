const db      = require('./../couch/couch');
const config  = require("./../dbconfig.json").users;
const onError = require('./../../../utils/handler-error').onError;

const dbname = config.database;
const dbpath = "/" + dbname + "/";

var users = {}
var gotAllUsers = false;

module.exports.post = function(user,cb) {
    db.createDoc(dbpath,user,onError(cb,function(data){
        user["_id"] = data.id;
        user["_rev"] = data.rev;
        users[data.id] = user;
        cb(null,user);
    }));
}

module.exports.get = function(id,cb) {
    users[id] ? cb(null,users[id]) :
        db.readDoc(dbpath,id,onError(cb,function(user) {
            users[id] = user;
            cb(null,user);
        }));
}

module.exports.getAll = function(cb) {
    gotAllUsers ? cb(null,users) :
        db.readAllDocs(dbpath,onError(cb,function(data) {
            gotAllUsers = true;
            users = data;
            cb(null,data);
        }));
}

module.exports.put = function(id,user,cb) {
    db.updateDoc(dbpath,user,onError(cb,function(data){
        users[id] = user;
        cb(null,user);
    }));
}
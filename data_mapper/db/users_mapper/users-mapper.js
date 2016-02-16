const db     = require('./../couch/couch');
const config = require("./../dbconfig.json").users;
const e      = require('./../../../utils/handler-error');

const dbname = config.database;
const dbpath = "/" + dbname + "/";

var users = {}

module.exports.post = function(user,cb) {
    db.createDoc(dbpath,user,cb);
}

module.exports.get = function(id,cb) {
    if(users[id]) cb(null,users[id]);
    else {
        db.readDoc(dbpath,id,e.onError(function(user) {
            users[id] = user;
            cb(null,user);
        }));
    }
}

module.exports.getAll = function(cb) {
    db.readAllDocs(dbpath,cb);
}

module.exports.put = function(id,user,cb) {
    db.updateDoc(dbpath,user,e.onError(function(data){
        users[id] = user;
        cb(null,data);
    }));
}
const db      = require('./../couch/couch');
const config  = require("./../dbconfig.json").users;
const onError = require('./../../../utils/handler-error').onError;

const dbname = config.database;
const dbpath = "/" + dbname + "/";

var users = {}

module.exports.post = function(user,cb) {
    db.createDoc(dbpath,user,cb);
}

module.exports.get = function(id,cb) {
    if(users[id]) cb(null,users[id]);
    else {
        db.readDoc(dbpath,id,onError(cb,function(user) {
            users[id] = user;
            cb(null,user);
        }));
    }
}

module.exports.getAll = function(cb) {
    db.readAllDocs(dbpath,cb);
}

module.exports.put = function(id,user,cb) {
    db.updateDoc(dbpath,user,onError(cb,function(data){
        users[id] = user;
        cb(null,data);
    }));
}
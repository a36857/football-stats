"use strict";

const http = require('./../../http/http');
const async = require('async');
const config = require('./couchconfig.json');

var docs = {}

function clearDocs() {
    docs = {};
}

function Options(path, m) {
    /*this.host   = config.hostname;
    this.port   = config.port;*/
    this.host   = config.host;
    this.method = m || 'GET';
    this.path   = path || "/_all_dbs";
}

module.exports.createDoc = function(path,doc,cb) {
    var opt = new Options(path,'POST');
    opt.headers = {'Content-Type': 'application/json'};
    http.httpRequest(opt,cb,JSON.stringify(doc));
}

module.exports.readAllDocs = function(path,cb) {
    clearDocs();
    var opt = new Options(path + "_all_docs",'GET');
    var operations = []; //tasks to async.parallel
    http.httpRequest(opt, onRequestDone);

    function onRequestDone(err,result) {
        if(err) cb(err,null);
        else {
            result.rows.forEach((doc) => {
                operations.push((finish) => exports.readDoc(path,doc.id,finish));
            });
            async.parallel(operations,onAsync); //do all tasks & wait for all to run cb
        }
    }

    function onAsync() {
        cb(null,docs);
    }
}

module.exports.readDoc = function(path,id,cb) {
    var opt = new Options(path + id,'GET');
    http.httpRequest(opt, onRequestDone);

    function onRequestDone(err,doc) {
        docs[doc._id] = doc;
        cb(err,doc);
    }
}

module.exports.updateDoc = function(path,doc,cb) {
    var opt = new Options(path + doc._id + '?rev=' + doc._rev,'PUT');
    opt.headers = {'Content-Type': 'application/json'};
    http.httpRequest(opt,cb,JSON.stringify(doc));
}

module.exports.deleteDoc = function(path,doc,cb) {
    clearDocs();
    var opt = new Options(path + doc._id + '?rev=' + doc._rev,'DELETE');
    http.httpRequest(opt,cb);
}

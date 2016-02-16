const async = require('async');
const e     = require('./../utils/handler-error');

const ml = require('./../models/modelLeague');
const mg = require('./../models/modelGroup');


module.exports.get = function(user,cb) {
    var info = {
        leagues : null,
        userGroups: null
    }
    var error = {
        error : null
    }

    async.parallel([getLeagues,getUserGroups],end);

    function getLeagues(finish) {
        ml.getAll(e.onErrorObj(error,finish,function(data) {
            info.leagues = data;
            finish();
        }));
    }
    function getUserGroups(finish) {
        mg.getAll(user,e.onErrorObj(error,finish,function(data) {
            info.userGroups = data;
            finish();
        }));
    }

    function end(){
        cb(error.error,info);
    }
}
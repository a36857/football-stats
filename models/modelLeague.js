const fapi    = require('./../data_mapper/fapi/fapi');
const onError = require('./../utils/handler-error').onError;

var leagues;

module.exports.getAll = function(cb) {
    leagues ? cb(null,leagues) : fapi.getLeagues(onError(cb,caching));

    function caching(data) {
        leagues = data;
        cb(null,data);
    }
}

module.exports.get = function(id,cb) {
    fapi.getLeague(id,cb);
}
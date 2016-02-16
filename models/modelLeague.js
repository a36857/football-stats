const fapi = require('./../data_mapper/fapi/fapi');

var leagues;

module.exports.getAll = function(cb) {
    leagues ? cb(null,leagues) : fapi.getLeagues(caching);

    function caching(err,data) {
        leagues = data;
        cb(err,data);
    }
}

module.exports.get = function(id,cb) {
    fapi.getLeague(id,cb);
}
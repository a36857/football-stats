const fapi = require('./../data_mapper/fapi/fapi');

module.exports.get = function(id,cb){
    fapi.getTeamFixtures(id,cb);
}

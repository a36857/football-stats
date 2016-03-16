const handlebars = require('hbs');


module.exports.registerHelpers = function () {
    handlebars.registerHelper('home', function() {
        return "/";
    });

    handlebars.registerHelper('logout', function() {
        return '/logout';
    });

    handlebars.registerHelper('login', function() {
        return '/login';
    });

    handlebars.registerHelper('singup', function() {
        return '/signup';
    });

    handlebars.registerHelper('profileLink', function(user) {
        return '/user';
    });

    handlebars.registerHelper('profileSettingsLink', function(user) {
        return '/user/settings';
    });

    handlebars.registerHelper('groupsSaveLink',function(link){
        return "/teams/" + getID(link,"/teams/") + "/groups";
    });

    handlebars.registerHelper('groupsLink', function() {
        return "/groups";
    });

    handlebars.registerHelper('groupDetailsLink', function(id) {
        return "/groups/" + id;
    });

    handlebars.registerHelper('leagueLink', function(link) {
        return "/leagues/"+ getID(link,"/soccerseasons/");
    });

    handlebars.registerHelper('leaguetableLink', function(id) {
        return "/leagues/"+ id + "/leaguetable";
    });

    handlebars.registerHelper('teamLink', function(link) {
        return "/teams/" + getID(link,"/teams/");
    });

    handlebars.registerHelper('getTeamID', function(link) {
        return getID(link,"/teams/");
    });

    handlebars.registerHelper('playersLink', function (link) {
        return "/teams/" + getID(link,"/teams/") + "/players";
    });

    handlebars.registerHelper('teamsLink', function (link) {
        return "/leagues/" + getID(link,"/soccerseasons/") + "/teams";
    });

    handlebars.registerHelper('leagueFixturesLink', function(id) {
        return "/leagues/" + id + "/fixtures";
    });

    handlebars.registerHelper('teamFixturesLink', function (link) {
        return "/teams/" + getID(link,"/teams/") + "/fixtures";
    });

    handlebars.registerHelper('groupTeamLink', function (team,group) {
        return "/groups/" + group + "/teams/" + team;
    });



    handlebars.registerHelper('ifequals', function(leftVal, rightVal, options) {
        return leftVal != rightVal ? options.inverse(this) : options.fn(this);
    });


    handlebars.registerHelper('dateHelper', function(date){
        var date = date.split('T');
        return date[0];
    });


    handlebars.registerHelper('seasonHelper', function(league){
        var season = league.split(' ');
        return season[season.length-1];
    });
}



function getID(str,delimiter){
    var split = str.split(delimiter);
    return split[1];
}

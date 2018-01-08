// sheets.js - all the stuff related to the sheets api and pulling player data

var API_KEY = "AIzaSyBwqi6e_o1xg7pnJjyG3pnUa9MsWEXksgQ";
var URL = "https://sheets.googleapis.com/v4/spreadsheets/1sAhE5H_635BE4u4ivV6otl2Vdbq6pwmc0E_MDhL_N5k/values/"

function getTeam(team) {
    return $.ajax( { url: buildTeamUrl(team) + buildKey() } ).done(
        function(a, b, c) {
            console.log(a);
            //alert(a);
        }
    )
}

function buildTeamUrl(team) {
    var range = "C3:AE17";
    return URL + "%27" + team + "%20roster%27%21" + range + buildKey();
}

function buildKey() {
    return "?key=" + API_KEY;
}

function buildPlayerList() {
    var teams = ["BAL", "CLE", "TOR", "BOS", "DET", "TBR",
                 "HOU", "MIN", "SEA", "OAK", "TEX",
                 "MTL", "PHI", "PIT", "WSH", "MIL", "STL",
                 "COL", "ARI", "LAD", "SDP", "SFG"];

    var requests = [];
    for (var i = 0; i < teams.length; i++) {
        requests.push($.ajax(buildTeamUrl(teams[i])));
    }
    
    $.when.apply(null, requests).done(handleData);
}

function handleData() {
    // arguments should contain all the team jsons
    //console.log(arguments);

    var everyPlayer = [];
    for (var i = 0; i < arguments.length; i++) {
        everyPlayer = everyPlayer.concat(parseSpreadsheetData(arguments[i][0]));
    }

    //console.log(everyPlayer);
    window.playerList = everyPlayer;
    $(".loadingContainer").css("display", "none");
}

function parseSpreadsheetData(data) {
    // data is a response from the sheets api

    var names = [];
    var playerRows = data.values;
    for (var i = 0; i < playerRows.length; i++) {
        var nameString = playerRows[i][0];
        var name = nameString.slice(0, nameString.indexOf('(') - 1);
        var username = nameString.slice(nameString.indexOf('(') + 1, nameString.indexOf(')'));

        var handedness = playerRows[i][2];
        var type = playerRows[i][1];

        names.push({
            "name": name,
            "user": username,
            "hand": handedness,
            "type": type
        });
    }

    return names;

    //console.log(names);
}
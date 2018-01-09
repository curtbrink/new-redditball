// sheets.js - all the stuff related to the sheets api and pulling player data

var API_KEY = "AIzaSyBwqi6e_o1xg7pnJjyG3pnUa9MsWEXksgQ";
var URL = "https://sheets.googleapis.com/v4/spreadsheets/1sAhE5H_635BE4u4ivV6otl2Vdbq6pwmc0E_MDhL_N5k/values:batchGet?"

function buildWholeUrl() {
    var dataRange = "C3:AE17";

    var teams = ["BAL", "CLE", "TOR", "BOS", "DET", "TBR",
                 "HOU", "MIN", "SEA", "OAK", "TEX",
                 "MTL", "PHI", "PIT", "WSH", "MIL", "STL",
                 "COL", "ARI", "LAD", "SDP", "SFG"];

    var requestString = URL;
    for (var i = 0; i < teams.length; i++) {
        requestString += buildTeamRange(teams[i]);
    }
    requestString += buildKey();

    return requestString;
}

function buildTeamRange(team) {
    var range = "C3:AE17";
    return "ranges=%27" + team + "%20roster%27%21" + range + "&";
}

function buildKey() {
    return "key=" + API_KEY;
}

function buildPlayerList() {

    $.ajax({
        url: buildWholeUrl()
    }).done(handleData);
}

function handleData() {
    // data passed as arguments

    var everyPlayer = [];
    var pitchers = [];
    var rosters = arguments[0].valueRanges;

    for (var i = 0; i < rosters.length; i++) {
        everyPlayer = everyPlayer.concat(parseSpreadsheetData(rosters[i]));
    }

    pitchers = everyPlayer.filter(player => player.isPitcher);

    window.playerData = {
        playerList: everyPlayer,
        pitcherList: pitchers
    };

    $(".loadingContainer").css("display", "none");
}

function parseSpreadsheetData(data) {
    // data is a response from the sheets api

    var players = [];
    var playerRows = data.values;
    for (var i = 0; i < playerRows.length; i++) {
        if (playerRows[i].length == 0)
            continue;
        
        players.push(new Player(playerRows[i]));
    }

    return players;
}
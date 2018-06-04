// sheets.js - all the stuff related to the sheets api and pulling player data

var API_KEY = "AIzaSyBwqi6e_o1xg7pnJjyG3pnUa9MsWEXksgQ";
var URL = "https://sheets.googleapis.com/v4/spreadsheets/1sAhE5H_635BE4u4ivV6otl2Vdbq6pwmc0E_MDhL_N5k/values:batchGet?"

function buildWholeUrl() {
    var dataRangeMajors = "C3:AE22";

    var majorsTeams = ["BAL", "CLE", "TOR", "BOS", "DET", "TBR",
                       "HOU", "MIN", "SEA", "OAK", "TEX",
                       "MTL", "PHI", "PIT", "WSH", "MIL", "STL",
                       "COL", "ARI", "LAD", "SDP", "SFG",
                       "OFH"];

    var requestString = URL;
    for (var i = 0; i < majorsTeams.length; i++) {
        requestString += buildTeamRange(majorsTeams[i], dataRangeMajors);
    }
    requestString += buildKey();

    return requestString;
}

function buildTeamRange(team, range) {
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

    window.playerData.pitcherList.forEach(function(player) {
        var badge = "BAL";
        if (player.pitcherType == "finesse")
            badge = "FIN";
        else if (player.pitcherType == "strikeout")
            badge = "STR";
        badge += " / ";
        var hand = "R";
        if (player.hand == "Left")
            hand = "L";
        badge += hand;

        $('#pitcherListItems').append('<li class="list-group-item">' + player.playerName + ' (' + player.redditName + ')<span class="badge">' + badge + '</span></li>');
    });

    window.playerData.playerList.forEach(function(player) {
        var badge = "NEU";
        if (player.batterType == "power")
            badge = "POW";
        else if (player.batterType == "contact")
            badge = "CON";
        badge += " / ";
        var hand = "R";
        if (player.hand == "Left")
            hand = "L";
        badge += hand;

        $('#batterListItems').append('<li class="list-group-item">' + player.playerName + ' (' + player.redditName + ')<span class="badge">' + badge + '</span></li>');
    });

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

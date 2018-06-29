// sheets.js - all the stuff related to the sheets api and pulling player data

var API_KEY = "AIzaSyBwqi6e_o1xg7pnJjyG3pnUa9MsWEXksgQ";
var URL = "https://sheets.googleapis.com/v4/spreadsheets/1LeshCWnkQf3RA4nNPD5rEDHqQ-1DnquCRNJstGzk6go/values:batchGet?"

function buildWholeUrl() {
    var requestString = URL + "ranges=%27Calculator%20Info%27%21A2:G421&" + buildKey();
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

    //console.log(arguments[0].valueRanges);

    var playerList = [];
    var playerRanges = arguments[0].valueRanges[0].values;
    for (var i = 0; i < arguments[0].valueRanges[0].values.length; i++) {
        var player = buildPlayer(playerRanges[i]);
        if (player != null) {
            //console.log(player);
            playerList.push(player);
        }
    }

    window.playerList = playerList;
    window.playerList.forEach(function(player) {
        var pitcherBadge, hitterBadge;
        switch(player.pitcherType) {
            case 'Strikeout':
                pitcherBadge = 'STR';
                break;
            case 'Finesse':
                pitcherBadge = 'FIN';
                break;
            case 'Balanced':
                pitcherBadge = 'BAL';
                break;
            case 'Position':
                pitcherBadge = 'POS';
                break;
            default:
                pitcherBadge = '???';
                break;
        }
        
        switch(player.hitterType) {
            case 'Power':
                hitterBadge = 'POW';
                break;
            case 'Contact':
                hitterBadge = 'CON';
                break;
            case 'Neutral':
                hitterBadge = 'NEU';
                break;
            default:
                hitterBadge = '???';
                break;
        }

        switch (player.hand) {
            case 'Left':
                pitcherBadge += " / L";
                hitterBadge += " / L";
                break;
            case 'Right':
                pitcherBadge += " / R";
                hitterBadge += " / R";
                break;
            default:
                pitcherBadge += " / ?";
                hitterBadge += " / ?";
                break;
        }

        $('#pitcherListItems').append('<li class="list-group-item">' + player.name + ' ' + player.user + '<span class="badge">' + pitcherBadge + '</span></li>');
        $('#batterListItems').append('<li class="list-group-item">' + player.name + ' ' + player.user + '<span class="badge">' + hitterBadge + '</span></li>');

    })

    $(".loadingContainer").css("display", "none");
}

function buildPlayer(playerArray) {
    if (playerArray[0] == "") { return null; }

    // columns:
    // 0     1         2       3            4       5             6
    // name, username, unused, hitter type, unused, pitcher type, hand

    player = {};
    player.name = playerArray[0];
    player.user = playerArray[1];

    if (playerArray[3] != "")
        player.hitterType = playerArray[3];
    
    if (playerArray[5] != "")
        player.pitcherType = playerArray[5];
    
    if (playerArray[6] != "")
        player.hand = playerArray[6];
    
    return player;
}
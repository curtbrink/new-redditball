var API_KEY = "AIzaSyBwqi6e_o1xg7pnJjyG3pnUa9MsWEXksgQ";
var URL = "https://sheets.googleapis.com/v4/spreadsheets/1sAhE5H_635BE4u4ivV6otl2Vdbq6pwmc0E_MDhL_N5k/values/"

function getTeam(team) {
    $.ajax( { url: buildTeamUrl(team) + buildKey() } ).done(
        function(a, b, c) {
            console.log(a);
            alert(a);
        }
    )
}

function buildTeamUrl(team) {
    var range = "B3:AD17";
    return URL + "%27" + team + "%20roster%27%21" + range;
}

function buildKey() {
    return "?key=" + API_KEY;
}
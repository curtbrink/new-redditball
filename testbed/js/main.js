function init() {
    // do loading indicator and load player data
    $(".loadingContainer").css("display", "block");

    buildPlayerList();
}

$(init);

// test calc
function testCalc() {
    var batter = window.playerData.playerList[223];
    var pitcher = window.playerData.pitcherList[24];
    var result = getResult(pitcher, 363, batter, 390);

    $("#result").html("Result: " + result.result);
}
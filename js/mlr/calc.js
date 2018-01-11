// calc.js - all the stuff related to calculating an AB
// a lot of this is (c) /u/aviator157

function getDifference(pitch, swing) {
    var max = Math.max(pitch, swing);
    var min = Math.min(pitch, swing);
    var result = Math.min(max - min, 1000 - max + min);
    console.log("Diff: " + result);
    return result;
}

function getResult(pitcher, pitch, batter, swing) {
    var diff = getDifference(pitch, swing);

    var pitcherType, hand;
    if (pitcher.pitcherType == null) {
        pitcherType = "balanced";
        hand = "different";
    } else {
        pitcherType = pitcher.pitcherType;
        if (pitcher.hand == batter.hand)
            hand = "same";
        else
            hand = "different";
    }

    var batterType = batter.batterType;

    var abRow = results_dict[pitcherType][batterType][hand];
    for (var i = 0; i < abRow.length; i++) {

        if (diff >= abRow[i].start_number && diff <= abRow[i].end_number) {
            console.log(pitcher);
            console.log(batter);
            console.log(pitcherType);
            console.log(batterType);
            console.log(hand);
            console.log(abRow[i]);
            return abRow[i];
        }
    }
    return null;
}

function doCalc() {
    console.log("Doing calc");
    var pitcherName = $('.pitcher-text').val();
    var batterName = $('.batter-text').val();

    pitcherName = pitcherName.slice(0, pitcherName.indexOf("(") - 1);
    batterName = batterName.slice(0, batterName.indexOf("(") - 1);

    // lookup
    var pitcher;
    for (var i = 0; i < window.playerData.pitcherList.length; i++) {
        if (pitcherName == window.playerData.pitcherList[i].playerName) {
            pitcher = window.playerData.pitcherList[i];
            break;
        }
    }
    if (!pitcher) {
        $('#result').html('Pitcher not found');
        return;
    }

    var batter;
    for (var i = 0; i < window.playerData.playerList.length; i++) {
        if (batterName == window.playerData.playerList[i].playerName) {
            batter = window.playerData.playerList[i];
            break;
        }
    }
    if (!batter) {
        $('result').html('Batter not found');
        return;
    }
    
    var pitch = parseInt($('.pitcher-number').val());
    var swing = parseInt($('.batter-number').val());

    var result = getResult(pitcher, pitch, batter, swing);
    var diff = getDifference(pitch, swing);

    $('#result').html("Result: " + result.result + " (Diff: " + diff + ")<br/>(" + result.start_number + " - " + result.end_number + ")");
}
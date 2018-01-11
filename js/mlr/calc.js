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
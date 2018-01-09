// calc.js - all the stuff related to calculating an AB

function getDifference(pitch, swing) {
    var max = Math.max(pitch, swing);
    var min = Math.min(pitch, swing);
    return Math.min(max - min, 1000 - max + min);
}
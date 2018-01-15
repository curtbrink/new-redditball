// handlers.js - all the jquery stuff that should run to set up the UI and stuff

// number validation
function checkInputs() {
    var pitch = parseInt($('#pitcherNumber').val());
    var swing = parseInt($('#batterNumber').val());

    if (!isNaN(pitch) && (pitch > 0 && pitch < 1001)) {
        $('#pitcherInfo').removeClass('has-error');
    } else {
        $('#pitcherInfo').addClass('has-error');
    }

    if (!isNaN(swing) && (swing > 0 && swing < 1001)) {
        $('#batterInfo').removeClass('has-error');
    } else {
        $('#batterInfo').addClass('has-error');
    }

    if ($('#batterInfo').hasClass('has-error') || $('#pitcherInfo').hasClass('has-error')) {
        $('#calcButton').addClass('disabled');
    } else {
        $('#calcButton').removeClass('disabled');
    }
}

$(function(){$('#batterNumber').keyup(checkInputs)});
$(function(){$('#pitcherNumber').keyup(checkInputs)});


// player autocomplete
$(function(){
    $('#pitcherText').keyup(function(){
        $('#pitcherListItems').css('display', '');
        var current_query = $('#pitcherText').val().toLowerCase();
        if (current_query !== "") {
            $("#pitcherListItems li").hide();
            $("#pitcherListItems li").each(function(){
                var current_keyword = $(this).text().toLowerCase();
                if (current_keyword.includes(current_query)) {
                    $(this).show();
                }
            })
        } else {
            $("#pitcherListItems li").hide();
        }
    })
});
$(function(){
    $('#batterText').keyup(function(){
        $('#batterListItems').css('display', '');
        var current_query = $('#batterText').val().toLowerCase();
        if (current_query !== "") {
            $("#batterListItems li").hide();
            $("#batterListItems li").each(function(){
                var current_keyword = $(this).text().toLowerCase();
                if (current_keyword.includes(current_query)) {
                    $(this).show();
                }
            })
        } else {
            $("#batterListItems li").hide();
        }
    })
});

$('#pitcherListItems').click(function(e) {
    if (e.target && e.target.nodeName == "LI") {
        var pitcherText = e.target.textContent;
        $('#pitcherText').val(pitcherText.slice(0, pitcherText.indexOf(')')+1));
        $('#pitcherListItems').css('display', 'none');

        // badges
        var pitcherName = $('#pitcherText').val();
        pitcherName = pitcherName.slice(0, pitcherName.indexOf("(") - 1);
        
        var pitcher;
        for (var i = 0; i < window.playerData.pitcherList.length; i++) {
            if (pitcherName == window.playerData.pitcherList[i].playerName) {
                pitcher = window.playerData.pitcherList[i];
                break;
            }
        }
        if (!pitcher) {
            return;
        }

        var type = pitcher.pitcherType.charAt(0).toUpperCase() + pitcher.pitcherType.slice(1, pitcher.pitcherType.length);
        $('#pitcherTypeBadge').html(type);
        $('#pitcherHandBadge').html(pitcher.hand);
    }
});
$('#batterListItems').click(function(e) {
    if (e.target && e.target.nodeName == "LI") {
        var batterText = e.target.textContent;
        $('#batterText').val(batterText.slice(0, batterText.indexOf(')')+1));
        $('#batterListItems').css('display', 'none');

        // badges
        var batterName = $('#batterText').val();
        batterName = batterName.slice(0, batterName.indexOf("(") - 1);
        
        var batter;
        for (var i = 0; i < window.playerData.playerList.length; i++) {
            if (batterName == window.playerData.playerList[i].playerName) {
                batter = window.playerData.playerList[i];
                break;
            }
        }
        if (!batter) {
            return;
        }

        var type = batter.batterType.charAt(0).toUpperCase() + batter.batterType.slice(1, batter.batterType.length);
        $('#batterTypeBadge').html(type);
        $('#batterHandBadge').html(batter.hand);
    }
});

// different calculator tabs
$('#playerCalcLink').click(function() {
    $('#manualCalcLink').removeClass('active');
    $('#manualCalcPanel').css('display', 'none');
    $('#playerCalcLink').addClass('active');
    $('#playerCalcPanel').css('display', '');
});

$('#manualCalcLink').click(function() {
    $('#playerCalcLink').removeClass('active');
    $('#playerCalcPanel').css('display', 'none');
    $('#manualCalcLink').addClass('active');
    $('#manualCalcPanel').css('display', '');
});
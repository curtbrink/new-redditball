// handlers.js - all the jquery stuff that should run to set up the UI and stuff

// number validation
function checkInputs() {
    var pitch = parseInt($('.pitcher-number').val());
    var swing = parseInt($('.batter-number').val());

    if (!isNaN(pitch) && (pitch > 0 && pitch < 1001)) {
        $('#pitcherBox').removeClass('has-error');
    } else {
        $('#pitcherBox').addClass('has-error');
    }

    if (!isNaN(swing) && (swing > 0 && swing < 1001)) {
        $('#batterBox').removeClass('has-error');
    } else {
        $('#batterBox').addClass('has-error');
    }

    if ($('#batterBox').hasClass('has-error') || $('#pitcherBox').hasClass('has-error')) {
        $('#calcButton').addClass('disabled');
    } else {
        $('#calcButton').removeClass('disabled');
    }
}

$(function(){$('.batter-number').keyup(checkInputs)});
$(function(){$('.pitcher-number').keyup(checkInputs)});


// player autocomplete
$(function(){
    $('.pitcher-text').keyup(function(){
        $('#pitcherListItems').css('display', '');
        var current_query = $('.pitcher-text').val().toLowerCase();
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
    $('.batter-text').keyup(function(){
        $('#batterListItems').css('display', '');
        var current_query = $('.batter-text').val().toLowerCase();
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
        $('.pitcher-text').val(pitcherText.slice(0, pitcherText.indexOf(')')+1));
        $('#pitcherListItems').css('display', 'none');

        // badges
        var pitcherName = $('.pitcher-text').val();
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
        $('.batter-text').val(batterText.slice(0, batterText.indexOf(')')+1));
        $('#batterListItems').css('display', 'none');

        // badges
        var batterName = $('.batter-text').val();
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
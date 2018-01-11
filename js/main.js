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
    }
});
$('#batterListItems').click(function(e) {
    if (e.target && e.target.nodeName == "LI") {
        var batterText = e.target.textContent;
        $('.batter-text').val(batterText.slice(0, batterText.indexOf(')')+1));
        $('#batterListItems').css('display', 'none');
    }
});

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
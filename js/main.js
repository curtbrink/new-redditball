

var boxString = `
Start time: when the Colorado GM fails his last final

#COL 1 - 3 MTL

##LINE
||1|2|3|4|5|6|R|H|
:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--
|**COL**|0|0|1|-|-|-|**1**|**1**|
|**MTL**|0|2|**1**|-|-|-|**3**|**5**|

##SCORING PLAYS
Inning|Team|Play|Score
:--|:--|:--|:--
Bot 2|MTL|[Thumb](/u/dropitlolo) home run, [Lindberg](/u/aviator157) scores|2-0 MTL
Top 3|COL|[McScrotington](/u/ConstantQuarreling) home run|2-1 MTL
Bot 3|MTL|[Fielder](/u/nerdfighter1174) home run|3-1 MTL

##BOX
\#|Rockies|Pos|AB|R|H|RBI|BB|SO|BA|\#|Expos|Pos|AB|R|H|RBI|BB|SO|BA|
:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|
**1**|[Kuntz, R.](/u/thorsgrundle)|SS|2|0|0|0|0|0|.400|**1**|[Rangers, T.](/u/TheThreeRangers)|2B|2|0|1|0|0|0|.500
**2**|[Alpha, J.](/u/androidsen)|3B|1|0|0|0|0|0|.000|**2**|[Blee, J.](/u/blee10)|RF|2|0|0|0|0|0|.200
**3**|[Jablome, H.](/u/agmarasco)|RF|1|0|0|0|0|0|.500|**3**|[Verdin, M.](/u/Vauntice)|LF|2|0|0|0|0|0|.000
**4**|[Dick, J.](/u/szabes)|1B|1|0|0|0|0|0|.667|**4**|[Fielder, K.](/u/nerdfighter1174)|1B|2|1|1|1|0|0|.200
**5**|[Kilgannon, J.](/u/dragoncockles)|CF|1|0|0|0|0|0|.500|**5**|[Lindberg, C.](/u/Aviator157)|DH|1|1|1|0|0|0|.500
**6**|[Voss, R.](/u/touchemalljoe)|C|1|0|0|0|0|0|.250|**6**|[Coulson, P.](/u/PHICOU10)|3B|1|0|0|0|0|1|.500
**7**|[McScrotington, D., IV](/u/ConstantQuarreling)|DH|1|1|1|1|0|0|1.000|**7**|[Wally, Y.](/u/whywebuildthewall)|C|1|0|0|0|0|1|.000
**8**|[Smith, R.](/u/mpegevil)|2B|1|0|0|0|0|0|.250|**8**|[Thumb, M.](/u/dropitlolo)|CF|1|1|1|2|0|0|1.000
**9**|[Baret, C.](/u/chadbarrett)|LF|1|0|0|0|0|0|.250|**9**|[Benz, Z.](/u/yoonlee13)|SS|1|0|1|0|0|0|1.000

##PITCHERS
Rockies|IP|H|ER|BB|SO|ERA|Expos|IP|H|ER|BB|SO|ERA|
:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--
[Murphy, H.](/u/squishfacethegloop)|2.2|5|3|0|2|8.18|[Tiberius, C., Jr.](/u/tiberius-jr)|3.0|1|1|0|0|1.33
`

var playerString = /\[(.*?)\]\(\/u\/(\S+)\)\|(.*?)\|(\d)\|(\d)\|(\d)\|(\d)\|(\d)\|(\d)\|(1?\.\d{3})/g;

var usernameString = /\/u\/\S+(?=\))/g;

/* this stuff is parsing box score
var players = [];
var match;
while (match = playerString.exec(boxString)) {
    console.log(match);
    players.push(match[0]);

    var player = new Player(match);
    console.log(player.getPlayer());
}
*/

function doStuff() {
    // do loading indicator and load player data
    $(".loadingContainer").css("display", "block");

    buildPlayerList();
}

doStuff();
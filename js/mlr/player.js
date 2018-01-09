class Player {

    constructor(data) {
        // data is a playerRow:
        // namestring | type | hand | G | PA | AB | H | 2B | 3B | HR | R | RBI | SO | BB | SB | (AVG) | (OBP) | (SLG) | (wOBA) | IP | R | ER | H | HR | BB | K | ERA | WHIP | K/6
        
        this.playerName = data[0].slice(0, data[0].indexOf("(") - 1);
        this.redditName = data[0].slice(data[0].indexOf("(") + 1, data[0].indexOf(")"));

        this.type = data[1];
        this.hand = data[2];

        this.isPitcher = this.type.includes("Balanced") || this.type.includes("Finesse") || this.type.includes("Strikeout");

        this.hittingStats = {
            "G": +data[3],
            "PA": +data[4],
            "AB": +data[5],
            "H": +data[6],
            "2B": +data[7],
            "3B": +data[8],
            "HR": +data[9],
            "R": +data[10],
            "RBI": +data[11],
            "SO": +data[12],
            "BB": +data[13],
            "SB": +data[14]
        };

        this.pitchingStats = {
            "IP": +data[19],
            "R": +data[20],
            "ER": +data[21],
            "H": +data[22],
            "HR": +data[23],
            "BB": +data[24],
            "K": +data[25]
        };

        // calculate formula-based stats
        // average
        this.hittingStats.AVG = this.hittingStats.H / this.hittingStats.AB;

        // on base pct
        this.hittingStats.OBP = (this.hittingStats.H + this.hittingStats.BB) / this.hittingStats.PA;
        
        // slugging
        var singles = this.hittingStats.H - this.hittingStats["2B"] - this.hittingStats["3B"] - this.hittingStats.HR;
        var totalBases = singles + (2 * this.hittingStats["2B"]) + (3 * this.hittingStats["3B"]) + (4 * this.hittingStats.HR);
        this.hittingStats.SLG = totalBases / this.hittingStats.AB;

        // wOBA
        var weightedWalks = 0.75 * this.hittingStats.BB;
        var weightedSingles = 0.9 * singles;
        var weightedDoubles = 1.24 * this.hittingStats["2B"];
        var weightedTriples = 1.56 * this.hittingStats["3B"];
        var weightedHomeRuns = 1.95 * this.hittingStats.HR;
        this.hittingStats.wOBA = (weightedWalks + weightedSingles + weightedDoubles + weightedTriples + weightedHomeRuns) / this.hittingStats.PA;

        console.log(this);
    }

}
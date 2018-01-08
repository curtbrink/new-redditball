class Player {

    constructor(regexMatch) {
        var fields = ["Name", "Username", "Position", "AB", "R", "H", "RBI", "BB", "SO", "BA"];

        for (var i = 1; i < regexMatch.length; i++) {
            this[fields[i-1]] = regexMatch[i];
        }
    }

    getPlayer() {
        return this;
    }

}
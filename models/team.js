var mongoose = require("mongoose"),
    Schema = mongoose.Schema;



//team schema
//team name, array of players
var teamSchema = new Schema({

    name: String,
    players: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Player"
    }]


});


var Team = mongoose.model("Team", teamSchema);
module.exports = Team;
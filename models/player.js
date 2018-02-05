var mongoose = require("mongoose"),
    Schema = mongoose.Schema;


/*
player schema
   -Id, Team, Jersey number, name
*/
var playerSchema = new Schema({
    ID: Number,
    team: String,
    jerseyNum: Number,
    name: String
});



var Player = mongoose.model("Player", playerSchema);


module.exports = Player;
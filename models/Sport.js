var mongoose = require("mongoose"),
    Schema = mongoose.Schema;


/*
Player has 
    -Id, Team, Jersey number, name
Team
    -Name, 
    -players
        -Array of objects,
            -within that object, 
                -reference to player schema
                -name of team

*/
sportSchema = new Schema({

    sportName: String,
    team: [{
    
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
    }],

}); //end schema


const Sport = mongoose.model('Sport', sportSchema);


//export
module.exports = Sport;
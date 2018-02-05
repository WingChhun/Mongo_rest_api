var mongoose = require("mongoose"),
	Schema = mongoose.Schema,
	DB_URL = process.env.DB_URL || "mongodb://localhost/sports_api";



mongoose.set('debug', true);
mongoose.connect(DB_URL);
mongoose.connection
	.once("open", () => {
		//Display to user successfully connected to DB
		console.log("connection made to db")
	})
	.on("error", (error) => {
		//Display Connection to DB error
		console.log("ERROR connecting to db")
	})
mongoose.Promise = Promise; //allow use of promises


//Export Sport schema
module.exports.Team = require("./team");
module.exports.Player = require("./player");
module.exports.Sport = require("./Sport");


var express = require('express'),
    app = express(),
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),
    bodyParser = require("body-parser"),
    port = process.env.PORT || 3000;
//include database 
db = require("./models"),
helper = require("./helper");


//Allow for body parser -json, access to body and res.json fun`ctions
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.set('view engine', 'ejs'); //default template ejs



//GET SPORTS
app.get("/", (req, res) => {
    res.render("index");
});
app.get("/create", (req, res) => {
    res.render("new");
});

//Show all sports
app.get("/sport", helper.getSports);

//CREATE - POST SPORTS
app.post("/sport", helper.postSports);


//CREATE A TEAM WITHIN A SPORT
app.post('/sport/:id', helper.postTeam);

//SHOW ALL TEAMS
app.get("/team", helper.getTeam);
app.get("/team/:id", helper.showTeam)
//CREATE A PLAYER WITHIN A TEAM
//pass in team id, create a player and then push
app.post("/team/:id", helper.createPlayer);

app.get("/players", helper.getPlayers);
//look up an individual player
app.get("/players/:id", helper.showPlayer)

//END REDIORECT ROUTE
app.get("*", (req, res) => {
    res.redirect("/");
});

app.listen(port, function () {
    console.log("server has started on port " + 3000);
});
var express = require('express'),
    app = express(),
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),
    bodyParser = require("body-parser"),
    port = process.env.PORT || 3000;
//include database 
db = require("./models");


//Allow for body parser -json, access to body and res.json functions
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
app.get("/sport", (req, res) => {
    db.Sport.find({}).populate("team").exec()
        .then((Sports) => {

            res.json(Sports);
        })
        .catch((err) => {
            res.send(err);
            console.log(err);
        });

});

//CREATE - POST SPORTS
app.post("/sport", (req, res) => {
    db.Sport.create(req.body)
        .then((newSport) => {
            res.status(201).json(newSport);
        })
        .catch((err) => {
            //display error
            res.send(err);
            console.log(err);
        })
});


//CREATE A TEAM WITHIN A SPORT
app.post('/sport/:id', (req, res) => {
    db.Sport.findById(req.params.id)
        .then((Sport) => {
            //Found sport by id, now
            //now create a team
            db.Team.create(req.body)
                .then((newTeam) => {
                    console.log("created new team " + newTeam);
                    newTeam.save(); //save newTeam
                    Sport.team.push(newTeam);
                    Sport.save();
                    console.log(Sport);
                })
                .then((newTeam) => {

                    res.redirect('/sport');
                })
                .catch((err) => {
                    res.send("Problwm creating a team!");
                    console.log(err);
                }) //error for team creation
        })
        .catch((err) => {
            res.send(err);
            console.log(err);
        })
});

//SHOW ALL TEAMS
app.get("/team", (req, res) => {
    db.Team.find({}).populate("players").exec()
        .then((Teams) => {
            res.status(201).json(Teams);
        })
        .catch((err) => {
            console.log(err);
            console.log("ERROR GETTING TEAMS!");
            res.send("ERROR GETTING TEAMS!");

        })
});
app.get("/team/:id", (req, res) => {
    db.Team.findById(req.params.id)
        .then((Team) => {
            res.status(201).json(Team);
        })
        .catch((err) => {
            console.log(err);
            res.send("ERROR FINDING TEAM");
        })
})
//CREATE A PLAYER WITHIN A TEAM
//pass in team id, create a player and then push
app.post("/team/:id", (req, res) => {
    db.Team.findById(req.params.id)
        .then((foundTeam) => {
            //found the team, now create a new player
            db.Player.create(req.body)
                .then((newPlayer) => {
                    console.log("created a new player! " + newPlayer);
                    newPlayer.save(); //save new player
                    //now push this player into the team array
                    foundTeam.players.push(newPlayer);
                    foundTeam.save();
                    console.log("SUCCESSFULLY SAVED PLAYER IN ARRAY");
                    console.log(foundTeam);
                    res.redirect("/team");
                }).catch((err) => {
                    console.log(err);
                    console.log("ERROR CREATING A NEW PLAYER!");
                }) //end player catch
        })
        .catch((err) => {
            res.send(err);
            console.log(err);
            console.log("ERROR FINDING A TEAM!");
        })
});

app.get("/players", (req, res) => {
    //SHOW ALL PLAYERS
    db.Player.find({})
   .then((players) => {
            res.status(201).json(players);
        })
        .catch((err) => {
            console.log(err);
            console.log("ERROR GETTING PLAYERS!");
            res.send("ERROR GETTING PLAYERS!");

        })
});
//look up an individual player
app.get("/players/:id", (req, res) => {
    db.Player.findById(req.params.id)
        .then((foundPlayer) => {
            res.status(201).json(foundPlayer);
        })
        .catch((err) => {
            res.send("ERROR FETCHING PLAYER");
            console.log(err);
            console.log("ERROR FINDING A PLAYER");
        });
})

//END REDIORECT ROUTE
app.get("*", (req, res) => {
    res.redirect("/");
});

app.listen(port, function () {
    console.log("server has started on port " + 3000);
});
var express = require('express'),
app = express(),
mongoose = require("mongoose"),
methodOverride = require("method-override"),
bodyParser = require("body-parser"),
port = process.env.PORT || 3000;
//include database 
db = require("./models");


app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine','ejs'); //default template ejs


app.get("/",(req,res)=>
{
res.send("ROOT ROUTE");
});

app.get("*", (req,res)=>
{
res.redirect("/");
});

app.listen(port, function(){
console.log("server has started on port " + 3000 );
});
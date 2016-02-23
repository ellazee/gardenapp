var express = require("express");
var db = require("./models");
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });
var bodyParser = require("body-parser");
var app = express();
var session = require('express-session');
var flash = require('connect-flash');
var ejsLayouts = require("express-ejs-layouts");


app.use(express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({extended: false}));
app.set("view engine", "ejs");
app.use("/plants", require("./controllers/plants"));
app.use(ejsLayouts);

app.get('/', function(req, res) {
	db.plant.findAll().then(function(plants){
		res.render('index.ejs', {plantsList:plants});

	});  
  //console.log("foooooooo");
});

app.get("/", function(req, res) {
	var id = req.params.id;
	db.plant.findAll().then(function(plants) {
		res.render("layout.ejs", {plantsList:plants})
	});
});





app.listen(3000);
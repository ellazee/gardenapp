var express = require("express");
var router = express.Router();
var db = require('../models');
var bodyParser = require("body-parser");
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });
var ejsLayouts = require("express-ejs-layouts");
router.use(express.static(__dirname + '/static'));
router.use(ejsLayouts);

// router.get("/", function (req,res) {
// 	res.send("It's working!");
// });

router.get("/", function(req, res) {
	db.plant.findAll().then(function(plants) {
		res.render("plants.ejs", {plantsList:plants});
	});
});





router.get("/newplant", function(req, res) {
	db.plant.findOrCreate({
		where: {
			name: "Sweet Corn" },
		defaults: {	
			category: "Corn",
			image:"",
			info: "70-90 days to harvest. Sow in early June, planting seeds an inch deep in rows 8-12 inches apart.",
			S1: 6,
			H1: 9,
			S2: null,
			H2: null
		}
	}).spread(function(plant, created) {
		if(!created) {
			res.send("Plant already created");
		} else {
			res.send("Created plant name: "+ plant.name);
		}
	});
});

router.get("/:id", function(req,res) {
	var id = req.params.id;
	db.plant.findAll().then(function(plants){
		db.plant.findById(id).then(function(plant) {
			res.render("showplant.ejs", {plant:plant, plantsList: plants});

		});
	});
});

router.get("/:id", function(req, res) {
	var id = req.params.id;
	db.plant.findAll().then(function(plants) {
		res.render("layout.ejs", {plantsList:plants});

	});
});




module.exports = router;
var express = require("express");
var router = express.Router();
var db = require('../models');
var bodyParser = require("body-parser");
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });

router.use(express.static(__dirname + '/static'));

router.get("/", function(req, res) {
	db.plant.findAll().then(function(plants) {
		res.render("plants.ejs", {plantsList:plants});
	});
});


router.get("/newplant", function(req, res) {
	db.plant.findOrCreate({
		where: {
			name: "Spinach" },
		defaults: {	
			category: "Greens",
			image:"",
			info: "45 days. Sow in the fall for winter harvests or in the early spring for early summer harvests.",
			S1: 2,
			H1: 8,
			S2: 3,
			H2: 11
		}
	}).spread(function(plant, created) {
		if(!created) {
			res.send("Plant already created");
		} else {
			res.send("Created plant name: "+ plant.name);
		}
	});
});

router.get("/garden", function(req, res) {
	if(req.session.userId) {
	  db.user.findById(req.session.userId, {
	  	include:[db.plant]
	  	}).then(function(user) {
	       res.render("garden.ejs", {user:user});       
	  	});
	} else  {res.render('loginerror.ejs')}
}); 

router.post("/:id", function(req, res) {
	var id = req.params.id;
	db.user.findById(req.session.userId).then(function(post) {
		db.plant.findById(id).then(function(myplant) {
			post.addPlant(myplant).then(function() {
				res.redirect("/plants/garden");
			});
		});
	});		
});

router.get("/:id", function(req,res) {
	var id = req.params.id;
	 db.plant.findAll().then(function(plants){
		db.plant.findById(id,{
			include:[db.tag]
			}).then(function(plant) {
			res.render("showplant.ejs", {plant:plant, plantsList: plants});

		});
	 });
});

router.delete("/:id", function(req, res) {
	db.user.findById(req.session.userId).then(function(user) {
		db.plant.findById(req.params.id).then(function(plant) {
			user.removePlant(plant);
				res.send("success");
		});
	});
});



module.exports = router;
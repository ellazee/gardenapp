var express = require("express");
var router = express.Router();
var db = require('../models');
router.use(express.static(__dirname + '/static'));


router.get("/newmonth", function(req, res) {
	db.month.findOrCreate({
		where: {
			name: "December" }
	}).spread(function(month, created) {
		if(!created) {
			res.send("Month already created");
		} else {
			res.send("Created plant name: "+ month.name);
		}
	});
});

// router.get("/", function(req, res) {
// 	db.month.findAll({
// 		include: [db.plant]
// 	})
// 	.then(function(month) {
// 		res.render("calendar.ejs", {month:month});
// 	});
// });

router.get("/:id", function(req,res) {
	var id = req.params.id;
	var foo;
	var bar;

	db.plant.findAll({

		where: {
			S1:id
		}
		// include: [db.month]
	}).then(function(sow) {		
		foo = sow;
	});

	db.plant.findAll({
		where: {
			H1:id
		}
		// include: [db.month]
	}).then(function(sow) {
		bar = sow;
		res.render("showmonth", {foo: foo, bar:bar});
		// res.send(bar);
	});
		// res.render("showmonth.ejs", {month:month});

});

module.exports = router;
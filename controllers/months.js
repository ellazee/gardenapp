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

router.get("/:id", function(req,res) {
	var id = req.params.id;
	db.month.findById(id).then(function(month){
		
			res.render("showmonth.ejs", {month:month});
	});
});

module.exports = router;
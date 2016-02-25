var express = require('express');
var db = require('../models');
var router = express.Router();



router.post("/:id", function (req, res) {
	var id = req.params.id;
	var name = req.body.name;
	db.plant.findById(id).then(function(plant){
		db.tag.findOrCreate({
			where: {
				name:name
			}
		}).spread(function (tag, created) {
			db.plantsTags.create({
				plantId:id,
				tagId:tag.id
			}).then(function(){
				res.redirect('/tags/'+id);
			});
		});
	});	
});

router.get("/:id", function (req, res) {
	var id = req.params.id;
	db.plant.findById(id).then(function(plant){
		plant.getTags().then(function(tag){
			res.render('tags.ejs', {
				plant:plant,
				tag:tag
			});
		});
	});
});

router.get("/showtags/:id", function (req, res) {
	var id = req.params.id;
	db.tag.findById(id).then(function(tag) {
		tag.getPlants().then(function(plant) {
			res.render('showtags', {
				tag:tag,
				plant:plant
			});
		});
	});
});

module.exports = router;
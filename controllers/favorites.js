var express = require("express");
var router = express.Router();
var db = require('../models');

var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({extended: false}));

// router.get("/", function (req, res) {
// 	res.render('favorites.ejs')

// });

router.get("/", function (req, res) {
	db.favorite.findAll().then(function(favplant) {
		res.render('showfavorites.ejs', {favplant:favplant})
	});
});

router.post("/", function(req, res) {
	var name = req.body.favPlant;
	
	db.favorite.findOrCreate({
		where: { imdbid: imdb },
		defaults: {
		title: title,
		year: year
		}
	}).spread(function(favorite, create) {
		console.log(favorite.get());
		res.redirect("/movies/"+imdb);
	//console.log(title, year, imdb);
	});
	

});






module.exports = router;
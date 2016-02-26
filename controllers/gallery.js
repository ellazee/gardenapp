var express = require("express");
var router = express.Router();
var db = require('../models');
var cloudinary = require('cloudinary');
var multer  = require('multer');
router.use(express.static(__dirname + '/static'));


var upload = multer({ dest: './uploads/'});
var images = [];



router.get('/', function(req, res) {
	if(req.session.userId) {
	db.image.findAll().then(function(images){
		 res.render('gallery.ejs', {images:images,
  									cloudinary:cloudinary});
		});
	} else {
		res.render('loginerror.ejs');
	}
});

router.get('/:id/edit', function (req, res) {
	db.image.findById(req.params.id).then(function(image) {
		if(image) {
			res.render('editimage.ejs', {image:image});
		} else {
			res.render('error.ejs');
		}
	}).catch(function(err) {
		res.render('error.ejs');
	});
});


router.post('/:id', function (req, res) {
	db.image.findById(req.params.id).then(function(image) {
		if(image) {
			image.updateAttributes({
				text: req.body.caption
			}).then(function() {
				// res.send({msg: 'success'});
				res.redirect("/gallery");
			});
		} else {
			res.render('error');
		}
	}).catch(function(err) {
		res.send({msg: 'error'});
	});
});



router.post('/', upload.single('userImage'), function(req, res) {
	 // res.send(req.file);
	cloudinary.uploader.upload(req.file.path, function(result) {
		images.push(result.public_id);
		db.user.findById(req.session.userId).then(function(user) {
			user.createImage({
				image:result.public_id
			}).then(function(image) {
				res.redirect('/gallery/');
			});
		});
	});
});



module.exports = router;
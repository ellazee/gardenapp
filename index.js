var express = require("express");
var db = require("./models");
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });
var bodyParser = require("body-parser");
var app = express();
var session = require('express-session');
var flash = require('connect-flash');
var ejsLayouts = require("express-ejs-layouts");
var plantsCtrl = require("./controllers/plants");

app.use("/plants", require("./controllers/plants"));
app.use(express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({extended: false}));
app.set("view engine", "ejs");
app.use(ejsLayouts);

//auth index.js pasted from example



app.use(session({
  secret: 'qpwoeiruutsjdhgh',
  resave: false,
  saveUninitialized: true
}));
app.use(flash());

app.use(function(req, res, next) {
  if (req.session.userId) {
    db.user.findById(req.session.userId).then(function(user) {
      req.currentUser = user;
      res.locals.currentUser = user;
      next();
    });
  } else {
    req.currentUser = false;
    res.locals.currentUser = false;
    next();
  }
});

app.get('/', function(req, res) {
  res.render('index', {alerts: req.flash()});
});

// app.get('/secret', function(req, res) {
//   if (req.currentUser) {
//     res.render('secret');
//   } else {
//     req.flash('danger', 'You must be logged in to view this page');
//     res.redirect('/');
//   }
// });

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


app.use('/auth', require('./controllers/auth'));


app.listen(3000);
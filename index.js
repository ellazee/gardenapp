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
app.use(ejsLayouts);

app.use(express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({extended: false}));
app.set("view engine", "ejs");


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

app.use(function(req, res, next){
	db.plant.findAll().then(function(plants){
		res.locals.plantsList = plants;
		//console.log(res.locals)
		next();
	});
});

app.use(function(req, res, next){
  db.month.findAll().then(function(months){
    res.locals.months = months;
  //  console.log(res.locals)
    next();
  });
});

//this route didn't work and made my page hang
// app.use(function(req,res, next) {
//   db.usersPlants.findAll().then(function(userplants) {
//     res.locals.userplants = userplants;
//     console.log("userplants is: "+userplants);
//   });
// });

app.get('/', function(req, res) {
  res.render('index', {alerts: req.flash()});
});


app.get('/', function(req, res) {
		res.render('index.ejs');
  //console.log("foooooooo");
});

// router.get("/:id", function(req,res) {
//   var id = req.params.id;
//   db.month.findById(id).then(function(month){
    
//       res.render("showmonth.ejs", {month:month});
//   });
// });

// router.get("/:id", function(req,res) {
//   var id = req.params.id;
//   db.plant.findAll().then(function(plants){
//     db.plant.findById(id).then(function(plant) {
//       res.render("showplant.ejs", {plant:plant, plantsList: plants});

//     });
//   });
// });

// app.get("/garden", function(req, res) {
//   db.user.findById(req.session.userId).then(function(user){
//     db.plant.findAll().then(function(plant) {
//        res.render("garden.ejs", {user:user, plant:plant});
//     });   
//   });
//   var userId = req.session.userId;

//   db.user.findById(req.session.userId).then(function(myplants) {
//     db.usersPlants.findAll().then(function(list) {
//         where: {
//       userId:req.session.userId}
      
//     console.log("userId is: "+userId);
//     console.log("myplants is: "+myplants);
//     });
    
//   });
  
//});

app.use("/tags", require("./controllers/tags"));
app.use("/months", require("./controllers/months"));
app.use("/plants", require("./controllers/plants"));
app.use('/auth', require('./controllers/auth'));



app.listen((process.env.PORT || 3000);
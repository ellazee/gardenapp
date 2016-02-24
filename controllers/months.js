var express = require("express");
var router = express.Router();
var db = require('../models');
router.use(express.static(__dirname + '/static'));






module.exports = router;
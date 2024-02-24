var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
    res.render("projects/index",{title: "This is a Project Tracker 2024"})
});

router.get('/add', function(req, res, next) {
    res.render("projects/add",{title: "This is a Project Tracker 2024"})
});

module.exports = router;

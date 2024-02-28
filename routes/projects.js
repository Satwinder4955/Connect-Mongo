var express = require('express');
var router = express.Router();
const Project = require('../models/project');


router.get('/', async (req, res, next) => {
    let projects = await Project.find();
    res.render("projects/index",
      {title: "This is a Project Tracker 2024",
      dataset:projects});
  });

router.get('/add', function(req, res, next) {
    res.render("projects/add",{title: "This is New project"})
});

//post/projects/add
router.post("/add",function (req,res){
// use project module to save the data the DB
// use the new Project() Method of the model
// map the fields with the data from the request
// if the operation is successful

let newProject= new Project({
    name : req.body.name,
    Id : req.body.Id,
    date : req.body.date,
    course: req.body.course
})


// save changes
newProject.save();
res.redirect("/projects");


});

module.exports = router;

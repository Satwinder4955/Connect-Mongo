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

// Get/projects/delete/_id
// router.get("/delete/:_id", async (req, res, next) => {
//   let projectId = req.params._id;
//   await Project.findByIdAndRemove({ _id: projectId });
//   res.redirect("/projects");
// });

// router.get("/delete/:_id", async (req, res, next) => {
//     let projectId = req.params._id;
//     await Project.findByIdAndRemove({ _id: projectId });
//     res.redirect("/projects");
//   });

router.get("/delete/:_id", async (req, res, next) => {
    let projectId = req.params._id;
    await Project.findOneAndDelete({ _id: projectId });
    res.redirect("/projects");
  });

  //GET/projects/edit/_id
router.get("/edit/:_id", async (req, res, next) => {
    let projectId= req.params._id;
    let projectData=await Project.findById(projectId);
    res.render("projects/edit",{
      title:"Edit Project info",
      project:projectData,
    })
    });
  //POST/projects/edit/_id
    router.post("/edit/:_id",async (req,res,next)=>{
      let projectId= req.params._id;
      await Project.findByIdAndUpdate(
     {_id:projectId},
     {
     name: req.body.name,
      dueDate: req.body.dueDate,
      course: req.body.course,
      status: req.body.status,
     });
     res.redirect("/projects");
    });


module.exports = router;

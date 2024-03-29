const express = require("express");
const router = express.Router();
const User = require("../models/User");
const passport = require("passport");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
// GET /login
router.get("/login", (req, res, next) => {
  // res.render('login', { title: 'Login' });
  // Obtain session messages if any
  let messages = req.session.messages || [];
  // Clear messages
  req.session.messages = [];
  // Pass messages to view
  res.render("login", { title: "Login", messages: messages });
});

// POST /login
// Syntax will be a bit different since login will be handled by passport
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/projects",
    failureRedirect: "/login",
    failureMessage: "Invalid credentials",
  })
);

// GET /register
router.get("/register", (req, res, next) => {
  res.render("register", { title: "Create a new account" });
});

//POST /register
router.post("/register", (req, res, next) => {
  // Create a new user based on the information from the page
  // three parameters: new user object, password, callback function
  User.register(
    new User({
      username: req.body.username,
    }),
    req.body.password,
    (err, newUser) => {
      if (err) {
        console.log(err);
        // take user back and reload register page
        return res.redirect("/register");
      } else {
        // log user in and redirect
        req.login(newUser, (err) => {
          res.redirect("/projects");
        });
      }
    }
  );
});

// get /logout
router.get("/logout",(res,req,next)=>{

  req.logout((res)=>{
    res.redirect("/login")

  })
})



module.exports = router;

// const express = require("express");
// const router = express.Router();
// const User = require("../models/user");
// const passport = require("passport");

// /* GET home page. */
// router.get("/", function (req, res, next) {
//   res.render("index", { title: "Express" });
// });
// // GET /login
// router.get("/login", (req, res, next) => {
//   // res.render('login', { title: 'Login' });
//   // Obtain session messages if any
//   let messages = req.session.messages || [];
//   // Clear messages
//   req.session.messages = [];
//   // Pass messages to view
//   res.render("login", { title: "Login", messages: messages });
// });

// // POST /login
// // Syntax will be a bit different since login will be handled by passport
// router.post(
//   "/login",
//   passport.authenticate("local", {
//     successRedirect: "/projects",
//     failureRedirect: "/login",
//     failureMessage: true,
//   })
// );

// // Optionally, you can handle the flash message in your route handling for /login
// router.get('/login', (req, res) => {
//   // Get the flash message from the request object
//   const errorMessage = req.flash('error')[0]; // Assuming you're using 'connect-flash' or similar

//   // Render your login page with the error message if it exists
//   res.render('login', { errorMessage });
// });



// // GET /register
// router.get("/register", (req, res, next) => {
//   res.render("register", { title: "Create a new account" });
// });

// //POST /register
// router.post("/register", (req, res, next) => {
//   // Create a new user based on the information from the page
//   // three parameters: new user object, password, callback function
//   User.register(
//     new User({
//       username: req.body.username,
//     }),
//     req.body.password,
//     (err, newUser) => {
//       if (err) {
//         console.log(err);
//         // take user back and reload register page
//         return res.redirect("/register");
//       } else {
//         // log user in and redirect
//         req.login(newUser, (err) => {
//           res.redirect("/projects");
//         });
//       }
//     }
//   );
// });

// // get /logout
// router.get("/logout", (req, res, next) => {
//   req.logout((err) => {
//     if (err) { return next(err); }
//     res.redirect("/login");
//   });
// });

// module.exports = router;

const express = require('express');
const User = require('../models/user');
const wrapAsync = require('../utils/wrapAsync');
const  passport  = require('passport');
const { saveUrl } = require('../middleware');
const router = express.Router({mergeParams:true});
const UserController=require("../controllers/user")

//signUp
router.get("/signup",UserController.renderSignupForm)

router.post("/signup",UserController.signUp)
//login
   router.get("/login",UserController.renderLoginForm)
// login Post
   router.post("/login",saveUrl,passport.authenticate("local",{failureRedirect:"/login", failureFlash:true }),UserController.login)
//   logout
 router.get("/logout",UserController.logout)

module.exports=router;
const express = require('express');
const router = express.Router({mergeParams:true});

const Listing = require("../models/listing")
const wrapAsync = require("../utils/wrapAsync")
const ExpressError = require("../utils/ExpressError")
const Review = require('../models/review');
const {validateReview,isLoggedIn,isAuthor}=require("../middleware")
const ReviewController=require("../controllers/review")


// --------post-------------------Add Review Route-------
router.post("/",isLoggedIn,validateReview,wrapAsync( ReviewController.createReview));

// ---------review delete Route---------------
router.delete("/:reviewid",isLoggedIn,isAuthor,wrapAsync(ReviewController.deleteReview));

module.exports=router;


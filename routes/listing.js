// require('dotenv').config()
const express = require('express');
const router = express.Router();
const Listing = require("../models/listing")
const wrapAsync = require("../utils/wrapAsync")
const { isOwner } = require("../middleware")
const { isLoggedIn } = require("../middleware")
const ExpressError = require("../utils/ExpressError")
const ListingController = require("../controllers/listing")

const { storage } = require("../cloudConfig")

const multer = require('multer')
const upload = multer({ storage })


router.get("/",(req,res)=>{
    res.redirect("/listings")
})
//===create a new listing ===========
router.get("/listings/new", isLoggedIn, ListingController.renderNewForm)





router.route("/listings")
    .get(wrapAsync(ListingController.index))
    .post(isLoggedIn, upload.single('listing[image]'), wrapAsync(ListingController.createListing))
// .post(upload.single('listing[image]'),(req,res)=>{
//     res.send(req.body)

//     console.log(req.file)
// })

// for filtering option 

router.get("/rooms", wrapAsync(ListingController.rooms))
router.get("/IconicCities", wrapAsync(ListingController.IconicCities))
router.get("/Mountain", wrapAsync(ListingController.Mountain))
router.get("/Castles", wrapAsync(ListingController.Castles))
router.get("/AmazingPools", wrapAsync(ListingController.AmazingPools))
router.get("/Camping", wrapAsync(ListingController.Camping))
router.get("/farms", wrapAsync(ListingController.farms))
router.get("/Arctic", wrapAsync(ListingController.Arctic))


// search Bar Route
router.get("/listings/search", wrapAsync(ListingController.search))

// ===-Listing Edit Route============
// edit Route  
router.get("/listings/:id/edit", isLoggedIn, isOwner, wrapAsync(ListingController.renderEditForm))

// updateRoute
router.put("/listings/:id", isLoggedIn, isOwner, upload.single('listing[image]'), wrapAsync(ListingController.updateListing))

// ---individual listing ---show Route------
router.get("/listings/:id", wrapAsync(ListingController.showListing))

// -----------------------------------------------------DELETE ROUTE---------------------------------------
router.post("/listings/:id/delete", isLoggedIn, isOwner, wrapAsync(ListingController.deleteListing))





module.exports = router


const Review=require("../models/review")
const Listing=require("../models/listing")

module.exports.createReview=async (req,res)=>{
    let {id} =await req.params;
    let newListing= await Listing.findById(id)
     let newReview= new Review(req.body.review);
     
     newListing.reviews.push(newReview);
     newReview.author=req.user;
     console.log(newReview)
     await newReview.save()
     await newListing.save();
     req.flash("success","review added successfully")
     res.redirect(`/listings/${newListing._id}`)
}


module.exports.deleteReview=async(req,res)=>{
    let {id}= await req.params;
    let {reviewid}= await req.params;
   // let ListingData=await Listing.findById(id);
   // let reviewData=await Review.findById(reviewid);
   await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewid}});
   await Review.findByIdAndDelete(reviewid)
       // console.log(reviewid)
       req.flash("success","review Deleted  successfully")
       res.redirect(`/listings/${id}`)
}

const Listing=require("./models/listing");
const Review = require("./models/review");
const { reviewSchema } = require('./schemaJoi');


module.exports.isLoggedIn= (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl
        req.flash("error","login to use ")
       return  res.redirect("/login")
       
    }
    next()
}


module.exports.saveUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl
    }
    next();
}
module.exports.isOwner=async(req,res,next)=>{
    let { id } = req.params;
    let listing= await Listing.findById(id);
   
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error","not the owner")
        return res.redirect(`/listings/${id}`)
    }
    next();
    
}

// ------server Side validation  by Joi for review Schema (middleWare) ----------------
module.exports.validateReview=(req,res,next)=>{

    let {error}=reviewSchema.validate(req.body);
    
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",")  
        throw new ExpressError(400,errMsg)
    }
    else{
        next();
    
     }
    };

module.exports.isAuthor=async(req,res,next)=>{
    let {id}= await req.params;
     let {reviewid}= await req.params;
     let review= await Review.findById(reviewid);
     if(!review.author.equals(res.locals.currUser._id) ){
        req.flash("error","not owner of review")
        return res.redirect(`/listings/${id}`);
     }
     next()

}
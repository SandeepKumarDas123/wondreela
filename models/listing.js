const mongoose=require("mongoose");
const Review = require("./review");
const User=require("./user")
const Schema=mongoose.Schema;

const ListingSchema=new Schema({
      title:{
        type:String,
        required:true,
      },
      desc : {
        type:String,

      },
      image: {
       url:String,
       filename:String,
      },
      price:Number,
      location:String,
      country:String,
      reviews:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Review",
      },
      
    ],
    owner:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
    },
    genre:{
      type:String,
      enum:["Rooms","IconicCities","Mountain","Castles","AmazingPools","Camping","farms","Arctic"]
    }
});

ListingSchema.post("findOneAndDelete", async (listing)=>{
  if(listing){
    await Review.deleteMany({_id:{$in:listing.reviews}})
  }
 
})

const Listing =mongoose.model("Listing",ListingSchema);

module.exports=Listing;


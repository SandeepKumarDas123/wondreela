 const Listing=require("../models/listing")
 module.exports.index=async (req, res) => {
    let lists = await Listing.find();
    // console.log(lists)
    res.render("./listings/index.ejs", { lists })  // as index.ejs lies path  in ====>  views->listings->index.ejs
}

module.exports.renderNewForm = (req, res) => {
    res.render("./listings/addnewForm")
}

                                                 
module.exports.createListing=async (req, res) => {
    //-------------------------- way1 (basic) -------------------------------------
    //  let{title,desc,image,price,location,country}=req.body;
    // await  Listing.insertOne({title:title,desc:desc,image:image,price:price,location:location,country:country});
    // res.redirect("/listings")

    // -----------------------  way2    (jS object) ----------------------------------------------------------------------------------------------

    const newlist = new Listing(req.body.listing);          //in form of js object we pass the names in form and now accesing it in form of js object it is easy
    newlist.owner=req.user._id;
    const url=req.file.path
    const filename=req.file.filename
    newlist.image={url,filename}; 
    await newlist.save();  
                                                                      // let newList=req.body.listing;
    // console.log(newlist)                                             // let l=new Listing(newList)
    // l.save()
    req.flash("success","new listing added !")
    res.redirect("/listings")

}


module.exports.renderEditForm=async (req, res) => {
    let { id } = req.params;
    // console.log(id)
    let list = await Listing.findById(id);
    // console.log(list); 
    let originalUrl=list.image.url;
    originalUrl=originalUrl.replace("/upload","/upload/h_100,w_200")
    console.log(originalUrl)
    res.render("./listings/editListingForm", { list ,originalUrl});
}


module.exports.updateListing=async (req, res) => {
    let { id } = req.params;
    // let data = req.body.listing;
    // console.log(data)
    // await Listing.findByIdAndUpdate(id,{title:data.title,desc:data.title,price:data.price,location:data.location,country:data.country})                        
                
    let listing=await Listing.findByIdAndUpdate(id, { ...req.body.listing }) //same thing done as previous step , here in this step  {...req.body.listing} it is a object whr we de-constructing the listing object into different values coming from request body and updating old values with new values
    if( typeof(req.file) !== "undefined"){
    let url=req.file.path
    let filename=req.file.filename;
    listing.image={url,filename}
    await listing.save()
    }

    
    req.flash("success"," Listing updated successfully")
    res.redirect(`/listings/${id}`)                           // redirect to show route i.e = /listing/:id or show.ejs 
}


module.exports.showListing=async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
    // console.log(listing)
    if(!listing){
        req.flash("error","Listing You Trying to find doesn't exists")
        res.redirect("/listings")
    }
    res.render("./listings/show", { listing }) 
    // console.log(chat.title)
}

module.exports.deleteListing=async (req, res) => {
    let { id } = req.params;
    let deleted_data = await Listing.findByIdAndDelete(id);
    console.log(deleted_data)
    req.flash("success","Listing  Deleted successfully ! ")
    res.redirect("/listings")
}
// search Query 
module.exports.search=async (req,res)=>{
    let q=req.query.searchQuery;

    let list1=await Listing.find({title:q})
    let list2=await Listing.find({country:q});
    let list3=await Listing.find({location:q});
    let list4=await Listing.find({genre:q})
   let lists=list1.concat(list2,list3,list4)
   if(lists.length ===0){
    req.flash("error","No Results found!")
    res.redirect("/listings")
   }else{
    // console.log(list2);
    res.render("./listings/index.ejs",{lists})
   }
}

// filters
module.exports.Arctic=async(req,res)=>{
    let lists=await Listing.find({genre:"Arctic"});
    // console.log(listing);
    res.render("./listings/index.ejs",{lists});
}

module.exports.IconicCities=async(req,res)=>{
    let lists=await Listing.find({genre:"IconicCities"});
    
    // console.log(listing);
    res.render("./listings/index.ejs",{lists});
}

module.exports.Mountain=async(req,res)=>{
    let lists=await Listing.find({genre:"Mountain"});
    // console.log(listing);
    res.render("./listings/index.ejs",{lists});
}
module.exports.Castles=async(req,res)=>{
    let lists=await Listing.find({genre:"Castles"});
    // console.log(listing);
    res.render("./listings/index.ejs",{lists});
}
module.exports.AmazingPools=async(req,res)=>{
    let lists=await Listing.find({genre:"AmazingPools"});
    // console.log(listing);
    res.render("./listings/index.ejs",{lists});
}
module.exports.Camping=async(req,res)=>{
    let lists=await Listing.find({genre:"Camping"});
    // console.log(listing);
    res.render("./listings/index.ejs",{lists});
}
module.exports.farms=async(req,res)=>{
    let lists=await Listing.find({genre:"farms"});
    // console.log(listing);
    res.render("./listings/index.ejs",{lists});
}
module.exports.rooms=async(req,res)=>{
    let lists=await Listing.find({genre:"Rooms"});
    // console.log(listing);
    res.render("./listings/index.ejs",{lists});
}
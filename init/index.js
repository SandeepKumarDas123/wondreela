const mongoose=require('mongoose')
const sampleListings=require("./data")
const Listing=require("../models/listing")

let mongo_url="mongodb://127.0.0.1:27017/wondrela"


main()
.then((res)=>{
    console.log('coonected to db')
})
.catch((err)=>{
    console.log(err)
})


async function main() {
    await mongoose.connect(mongo_url);
    
}

Listing.insertMany(sampleListings)
.then((res)=>{
    console.log(res)

})
.catch((err)=>{
    console.log(err)
})
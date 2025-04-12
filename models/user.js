const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const passportLocalMongoose=require("passport-local-mongoose")
const UserSchema=new Schema({
    email :{
        type:String,
        required:true,
    }
})
UserSchema.plugin(passportLocalMongoose) // by default it creates/adds  field  username,hash,salt in schema 

const User=mongoose.model("User",UserSchema);

module.exports=User;
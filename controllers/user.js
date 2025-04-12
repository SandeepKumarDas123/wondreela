

const User=require("../models/user")

module.exports.renderSignupForm=(req,res)=>{
    res.render("./users/signupForm.ejs")
}



module.exports.signUp=async (req,res)=>{
    try{
    let {username,email,password}=req.body;
    // console.log(username)
    let newUser=new User({username,email})

    let result=await User.register(newUser,password)
    // signup after login automatically
    req.login(result,(err)=>{
        if(err){
            next(err)
        }
        req.flash("success","user Registred successfully")
        res.redirect("/listings")
    })
   
    }catch(e){
        req.flash("error","username  already taken")
        res.redirect("/signup")
    }
}

module.exports.renderLoginForm=(req,res)=>{
    res.render("./users/login.ejs")
}

module.exports.login=async (req,res)=>{

    req.flash("success","looged in successfully")
    let redirectUrl= res.locals.redirectUrl || "/listings"
    res.redirect(redirectUrl)
}

module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
           return next(err)
        }
        req.flash("success","you logged out")
        res.redirect("/listings")
    })
 }
require('dotenv').config()

const express = require('express');
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate")
const ExpressError = require("./utils/ExpressError")
const path = require("path");
const wrapAsync = require('./utils/wrapAsync');
const methodOverride = require("method-override")
const session = require("express-session")
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
// auth
const passport = require("passport");
const Localstartegy = require("passport-local")
const User = require("./models/user")





// requiring Routers from routes folder
const listingsRouter = require("./routes/listing")
const reviewsRouter = require("./routes/review");
const userRouter = require("./routes/user");

const app = express();


// let mongo_url = "mongodb://127.0.0.1:27017/wondrela"
let mongo_url = process.env.mongo_url;

const store=MongoStore.create({
    mongoUrl:mongo_url,
    crypto:{
        secret:"mySupersecretCode"
    },
    touchAfter:24*3600,
})

store.on("error",()=>{
    console.log("err in store",err);
    
})
const sessionOption = {
    secret: "mysupersecretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
};



app.set("view engine", "ejs");
app.engine("ejs", ejsMate)
app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"))    // method-override middleWare


main()
    .then((res) => {
        console.log('coonected to db')
    })
    .catch((err) => {
        console.log(err)
    })

async function main() {
    await mongoose.connect(mongo_url);

}


// app.get("/", (req, res) => {
//     res.send("root page")
// })
app.use(session(sessionOption))       //session m/w
app.use(flash());

// passport/ auth implementation
app.use(passport.initialize())
app.use(passport.session())
passport.use(new Localstartegy(User.authenticate()))

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
    res.locals.success = req.flash("success")
    res.locals.error = req.flash("error")
    res.locals.currUser = req.user;
    next();
})

// app.get("/reg",wrapAsync(async (req,res)=>{
//  const fakeUser=new User({email:"abc@gmail.com",username:"abc"})
//  let fake =await User.register(fakeUser, "bbc")
//  res.send(fake)
// }))

// listing route
app.use("/", listingsRouter)
//review route
app.use("/listings/:id/reviews", reviewsRouter)
//user Router
app.use("/", userRouter);
  


// error handling middleware
app.all("*", (req, res, next) => {
    throw new ExpressError(404, "page not Found!")
})

// ----------------
app.use((err, req, res, next) => {
    let { status = 500, message } = err;
    res.status(status).render("error.ejs", { message });
})

app.listen(8000, (req, res) => {
    console.log("app listening to port 8000")
})

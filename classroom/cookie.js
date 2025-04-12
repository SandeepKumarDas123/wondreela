const express=require('express');
const cookieParser=require("cookie-parser")
const app=express();

const session = require('express-session')
app.use(session({secret:"secretkey",resave:false,saveUninitialized:true}))

app.get("/",(req,res)=>{
    res.send('sucesses')
})


app.get("/register",(req,res)=>{
   let {name="anpnymus"}=req.query;
   req.session.name=name;

   console.log(req.session)
   res.redirect("/greet")
})

app.get("/greet",(req,res)=>{
    res.send(`Hello ! ${req.session.name}`)
})
// app.get("/reqCount",(req,res)=>{
//     if(req.session.count){
//         req.session.count++;
//     }

//     else{
//         req.session.count=1;
//     }
//      console.log(req.session)
//     res.send(`requested   ${req.session.count} times `)
// })
app.listen(6969,(req,res)=>{
console.log("server started")
})

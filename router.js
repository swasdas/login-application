const e= require('express');
var express= require("express");
var router= express.Router();

const credential={
    id: "admin@gmail.com", //email
    pw: "admin123" //password
}

//login user
router.post('/login', (req,res)=>{
    if(req.body.id==credential.id && req.body.pw==credential.pw){
        req.session.user= req.body.id;
        res.redirect('/route/dashboard');
        //res.end("Login Successfully..!")
    }else{
        res.end("Invalid Username or Password")
    }
})

//route for dashboard
router.get('/dashboard',(req,res)=>{
    if(req.session.user){
        res.render('dashboard',{user:req.session.user})
    }else{
        res.send("Unauthorize User")
    }
})

//route for logout
router.get('/logout',(req,res)=>{
    req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.send("Error")
        }else{
            res.render("base",{title:"Express", logout:"Logout successfully...!"})
        }
    })
})

module.exports= router;
const express = require('express');
const router = express.Router()
const path = require('path')
const userModel = require('../model/userModel')



router.get('/todolist',function(req,res){
    console.log(req.cookies.userID);
    if(req.cookies.userID){
        res.sendFile(path.join(__dirname,'../views/todolist.html'))
    }else{
        res.redirect('/index/login')
    }
    
})
router.get('/change',function(req,res){
    
    if(req.cookies.userID){
        res.sendFile(path.join(__dirname,'../views/changePass.html'))
    }else{
        res.redirect('/index/login')
    }
})

router.get('/login',function(req,res){
    res.sendFile(path.join(__dirname,'../views/login.html'))
})

router.get('/dangky',function(req,res){
    res.sendFile(path.join(__dirname,'../views/dangky.html'))
})



module.exports = router
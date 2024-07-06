const express = require('express');
const router = express.Router();

router.get('/',async (req,res)=>{
    if(!req.user) return res.render('home',{
        role:false
    })
    const currentUser = req.user

    if(currentUser.role === 'ADMIN'){}
    
    res.render('home',{
        username:currentUser.username,
        role:currentUser.role
    });
})

router.get('/signup',async (req,res)=>{
    res.render('signup');
})

router.get('/signin',async (req,res)=>{
    res.render('signin');
})

module.exports = router;


const express = require('express');
const router = express.Router();

router.get('/',async (req,res)=>{
    res.render('home');
})

router.get('/signup',async (req,res)=>{
    res.render('signup');
})

router.get('/signin',async (req,res)=>{
    res.render('signin');
})

module.exports = router;


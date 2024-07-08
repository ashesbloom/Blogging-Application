const express = require('express');
const router = express.Router();
const blogs = require('../models/blogs.js');

router.get('/',async (req,res)=>{
    const allblogs = await blogs.find({}).sort({ createdAt: -1 })
    const userDestination = 'homepage'
    if(!req.user) return res.render('home',{
        role:false
    })
    const currentUser = req.user

    if(currentUser.role === 'ADMIN'){}
    
    res.render('home',{
        blogs:allblogs,
        path: userDestination,
        username:currentUser.username,
        role:currentUser.role
    });
})

router.get('/add-new',async(req,res)=>{
    const userDestination = 'addpage'
    if(!req.user) return res.render('home',{
        role:false
    })
    const currentUser = req.user

    if(currentUser.role === 'ADMIN'){}
    
    res.render('addBlog',{
        path: userDestination,
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


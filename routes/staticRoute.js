const express = require('express');
const router = express.Router();
const blogs = require('../models/blogs.js');

router.get('/',async (req,res)=>{
    const allblogs = await blogs.find({}).sort({ createdAt: -1 })
    const userDestination = 'homepage'
    if(!req.user) return res.render('home',{
        user:false,
        blogs:allblogs,
        path: userDestination
    })
    const currentUser = req.user

    if(currentUser.role === 'ADMIN'){}
    
    res.render('home',{
        user:currentUser,
        blogs:allblogs,
        path: userDestination
    });
})

router.get('/add-new',async(req,res)=>{
    const userDestination = 'addpage'
    if(!req.user) return res.render('home',{
        user:false,
        path: userDestination
    })
    const currentUser = req.user

    if(currentUser.role === 'ADMIN'){}
    
    res.render('addBlog',{
        user:currentUser,
        path: userDestination,
    });
})

router.get('/edit/:id',async(req,res)=>{
    const blogId = req.params.id;
    const blog = await blogs.findOne({_id:blogId});
    const userDestination = 'addpage'
    if(!req.user) return res.render('editBlog',{
        user:false,
        path: userDestination
    })
    const currentUser = req.user
    res.render('editBlog',{
        blog,
        path: userDestination,
        user:currentUser
    });
})

router.get('/blog/:id',async (req,res)=>{
    const blogId = req.params.id;
    const blog = await blogs.findOne({_id:blogId});
    const userDestination = 'blogpage'
    if(!req.user) return res.render('blogView',{
        user:false,
        blog:blog,
        path: userDestination
    })
    const currentUser = req.user;
    const flag = currentUser._id === blog.createdBy.toString();
    res.render('blogVIew',{
        blog,
        path: userDestination,
        user:currentUser,
        check:flag
    });
})

router.get('/signup',async (req,res)=>{
    if(!req.user) return res.render('signup',{
        user:false,
    })
    res.render('signup',{
        user:req.user,
        registred:'You are already logged in!'
    });
})
router.get('/signin',async (req,res)=>{
    if(!req.user) return res.render('signin',{
        user:false,
    })
    res.render('signin',{
        user:req.user,
        registred:'You are already logged in!'
    });
})

module.exports = router;


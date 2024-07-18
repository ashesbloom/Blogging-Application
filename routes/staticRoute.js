const express = require('express');
const router = express.Router();
const blogs = require('../models/blogs.js');
const {escapeHtmlWithMarkers} = require('../service/textParser.js');
// const users = require('../models/user.js');
const comments = require('../models/comments.js');

router.get('/',async (req,res)=>{
    const allblogs = await blogs.find({}).sort({ createdAt: -1 });
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
    if(!req.user) return res.redirect('/signin');
    const currentUser = req.user

    if(currentUser.role === 'ADMIN'){}
    
    res.render('addBlog',{
        user:currentUser,
        path: userDestination,
    });
})

router.get('/edit/:id',async(req,res)=>{
    if(!req.user) return res.redirect('/signin');
    const blogId = req.params.id;
    const blog = await blogs.findOne({_id:blogId});
    const userDestination = 'addpage';
    const currentUser = req.user;
    res.render('editBlog',{
        blog,
        path: userDestination,
        user:currentUser,
    });
})
router.get('/blog/:id', async (req, res) => {
    const blogId = req.params.id;
    const userDestination = 'blogpage';
    try {
        const blog = await blogs.findById(blogId).populate('createdBy');
        if (!blog) {
            return res.status(404).send('Blog post not found');
        }

        const filteredBody = escapeHtmlWithMarkers(blog.body);
        const Allcomments = await comments.find({ blogId }).sort({ createdAt: -1 }).populate('author').populate(
            { path: 'replies', populate: { path: 'author' } });
        if (!req.user) {
            return res.render('blogView', {
                user: false,
                blog: blog,
                comments: Allcomments,
                body: filteredBody,
                path: userDestination
            });
        }

        const currentUser = req.user;
        const flag = currentUser._id === blog.createdBy._id.toString();
        res.render('blogView', {
            blog,
            comments: Allcomments,
            body: filteredBody,
            path: userDestination,
            user: currentUser,
            check: flag
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

router.get('/signup',async (req,res)=>{
    const userDestination = 'signup';
    if(!req.user) return res.render('signup',{
        user:false,
        path:userDestination
    })
    res.render('signup',{
        user:req.user,
        registred:'You are already logged in!',
        path:userDestination
    });
})
router.get('/signin',async (req,res)=>{
    const userDestination = 'signup';
    if(!req.user) return res.render('signin',{
        user:false,
        path:userDestination
    })
    res.render('signin',{
        user:req.user,
        registred:'You are already logged in!',
        path:userDestination
    });
})

module.exports = router;


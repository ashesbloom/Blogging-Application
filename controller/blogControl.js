const blogs = require('../models/blogs.js');
const comments = require('../models/comments.js');
const {calculateReadingTime} = require('../service/blogHandling.js');
const fs = require('fs');
const path = require('path');


async function handleNewblog(req, res) {
    const currentUser = req.user;
    const userDestination = 'addpage';
    try {
        // Handle file upload error
        if (req.fileUploadError) {
            console.error('Error uploading file:', req.fileUploadError);
            return res.render('addBlog', {
                user: currentUser,
                path: userDestination,
                error: req.fileUploadError
            });
        }
        await new Promise(resolve => setTimeout(resolve, 500));
        const { title, body } = req.body;
        const readingTime = calculateReadingTime(body);
        await new Promise(resolve => setTimeout(resolve, 500));
        // Create new blog entry
        if (req.file) {
            const FileName = req.file.filename;
            await blogs.create({
                title: title,
                body: body,
                createdBy: req.user._id,
                attachment: `uploads/${req.user._id}/${FileName}`,
                readingTime: readingTime,
                userName: req.user.username,
            });
        } else {
            await blogs.create({
                title: title,
                body: body,
                createdBy: req.user._id,
                readingTime: readingTime,
                userName: req.user.username,
            });
        }
        await new Promise(resolve => setTimeout(resolve, 600));
        // Redirect to home page
        return res.redirect(`/`);
    } catch (error) {
        console.error("Error handling new blog:", error);
        return res.redirect('/add-new');
    }
}

async function handleUpdateById(req, res) {
    if (req.fileUploadError) {
        console.error('Error uploading file:', req.fileUploadError);
        return res.status(400).json({ error: req.fileUploadError });
    }
    const blogID = req.params.id;
    if (!blogID) return res.status(404).send('Post not found!');

    const blogPost = await blogs.findById(blogID);
    if (!blogPost) {
        return res.status(404).json({ message: 'Blog post not found' });
    }

    const { title, body } = req.body;

    if (!title) return res.status(400).json({ error: 'Missing required field: title' });
    if (!body) return res.status(400).json({ error: 'Missing required field: content' });

    const readingTime = calculateReadingTime(body);

    try {
        let updateFields = { title, body, readingTime };

        if (req.file) {
            const fileName = req.file.filename;
            const attachmentFilePath = path.resolve(__dirname, '..', 'public', blogPost.attachment);
            fs.access(attachmentFilePath, fs.constants.F_OK, (err) => {
                if (err) {
                    console.error('Attachment file does not exist:', attachmentFilePath);
                } else {
                    fs.unlink(attachmentFilePath, (err) => {
                        if (err) {
                            console.error('Error deleting attachment file:', err);
                        }
                    });
                }
            });
            updateFields.attachment = `uploads/${req.user._id}/${fileName}`;
        }

        const updatedPost = await blogs.findByIdAndUpdate(blogID, updateFields, { new: true });

        if (!updatedPost) {
            return res.status(400).json({ error: 'Failed to update post' });
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
        return res.redirect(`/blog/${updatedPost._id}`);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function handleDeletebyId(req, res) {
    const postId = req.params.id;

    try {
        // Fetch the blog post to get the attachment file path
        const blogPost = await blogs.findById(postId);
        if (!blogPost) {
            return res.status(404).json({ message: 'Blog post not found' });
        }

        // Delete the blog post
        await blogs.findByIdAndDelete(postId);

        // Delete associated comments
        await comments.deleteMany({ blogId: postId });

        // Delete the attachment file if it exists
        if (blogPost.attachment) {
            const attachmentFilePath = path.resolve(__dirname, '..', 'public', blogPost.attachment);
            fs.access(attachmentFilePath, fs.constants.F_OK, (err) => {
                if (err) {
                    console.error('Attachment file does not exist:', attachmentFilePath);
                } else {
                    fs.unlink(attachmentFilePath, (err) => {
                        if (err) {
                            console.error('Error deleting attachment file:', err);
                        }
                    });
                }
            });
        }

        return res.json({ message: 'Post successfully deleted', redirect: '/' });
    } catch (err) {
        console.error('Error deleting post:', err);
        return res.status(500).json({ message: 'Server error' });
    }
}

async function handleNewComment(req,res){
    try {
        const postId = req.params.id;
        const currentUser = req.user;
        const {content , parent} = req.body;
        if (parent) {
            const newComment = new comments({
                name: currentUser.username,
                content,
                author: currentUser._id,
                blogId: postId,
                likes: [],
                replies: [],
                parent: false
            });
            await newComment.save();
            const parentComment = await comments.findById(parent);
            if (!parentComment) {
                return res.status(404).send('Parent comment not found');
            }
            parentComment.replies.push(newComment._id);
            await parentComment.save();
        }else{
            const newComment = new comments({
                name: currentUser.username,
                content,
                author: currentUser._id,
                blogId: postId,
                likes: [],
                replies: []
            });
            await newComment.save();
        }
        return res.redirect(`/blog/${postId}`);
      } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
      }
}

async function handleCommentAction(req, res) {
    const {blogId,id}  = req.params;
    const userId = req.user._id;
    try {
        const comment = await comments.findById(id);
        if (!comment) {
          return res.status(404).json({ error: 'Comment not found' });
        }
        const hasLiked = await comment.likes.includes(userId);
        if (hasLiked) {
            await comments.findByIdAndUpdate(id,{$pull:{likes:userId}});
            return res.json({message:'Post succesfully deleted',redirect:`/blog/${blogId}`,liked:false});
        } else {
            await comments.findByIdAndUpdate(id,{$push:{likes:userId}});
            return res.json({message:'Post succesfully deleted',redirect:`/blog/${blogId}`,liked:true});
        }
      } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Server error' });
      }
}

module.exports={
    handleNewblog,
    handleUpdateById,
    handleDeletebyId,
    handleNewComment,
    handleCommentAction
}
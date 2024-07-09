const blogs = require('../models/blogs.js');
const {calculateReadingTime} = require('../service/blogHandling.js');

async function handleNewblog(req,res){
    const {title,body} = req.body;
    const readingTime = calculateReadingTime(body);
    if (req.file) {
        const FileName = req.file.filename;
        await blogs.create({
            title:title,
            body:body,
            createdBy:req.user._id,
            attachment:`uploads/${req.user._id}/${FileName}`,
            readingTime:readingTime,
            userName:req.user.username,
        });
    } else {
        await blogs.create({
            title:title,
            body:body,
            createdBy:req.user._id,
            readingTime:readingTime,
            userName:req.user.username,
        });
    }
    return res.redirect(`/`);
}
async function handleUpdateById(req, res) {
    const blogID = req.params.id;
    if (!blogID) return res.status(404).send('Post not found!');

    const { title, body } = req.body;

    if (!title) return res.status(400).json({ error: 'Missing required field: title' });
    if (!body) return res.status(400).json({ error: 'Missing required field: body' });

    const readingTime = calculateReadingTime(body);

    try {
        let updateFields = { title, body, readingTime };

        if (req.file) {
            const fileName = req.file.filename;
            updateFields.attachment = `uploads/${req.user._id}/${fileName}`;
        }

        const updatedPost = await blogs.findByIdAndUpdate(blogID, updateFields, { new: true });

        if (!updatedPost) {
            return res.status(400).json({ error: 'Failed to update post' });
        }

        return res.redirect(`/blog/${updatedPost._id}`);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function handleDeletebyId(req,res){
    const postId = req.params.id;
    const currentPost = await blogs.findByIdAndDelete(postId);
    console.log(currentPost);
    return res.redirect('/');
}

module.exports={
    handleNewblog,
    handleUpdateById
}
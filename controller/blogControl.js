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



module.exports={
    handleNewblog
}
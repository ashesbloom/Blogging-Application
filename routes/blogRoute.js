const express = require('express');
const router = express.Router();
const {upload} = require('../service/blogHandling.js');
const {handleNewblog, handleUpdateById, handleDeletebyId, handleNewComment, handleNewReply, handleCommentAction,} = require('../controller/blogControl.js');

router.post('/add-new', (req, res, next) => {
    upload.single('attachment')(req, res, (err) => {
        if (err) {
            req.fileUploadError = err.message;
        }
        next();
    });
},handleNewblog);
router.post('/edit-post/:id',(req, res, next) => {
    upload.single('attachment')(req, res, (err) => {
        if (err) {
            req.fileUploadError = err.message;
        }
        next();
    });
},handleUpdateById)
router.delete('/delete-post/:id',handleDeletebyId);

router.post('/comment/:id',handleNewComment);
router.post('/comment/:blogId/action/:id',handleCommentAction);
module.exports = router;
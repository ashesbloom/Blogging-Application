const express = require('express');
const router = express.Router();
const {upload} = require('../service/blogHandling.js');
const {handleNewblog, handleUpdateById, handleDeletebyId,} = require('../controller/blogControl.js');

router.post('/add-new',upload.single('attachment'),handleNewblog);
router.post('/edit-post/:id',upload.single('attachment'),handleUpdateById)
router.delete('/delete-post/:id',handleDeletebyId);

module.exports = router;
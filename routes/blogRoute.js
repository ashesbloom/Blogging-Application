const express = require('express');
const router = express.Router();
const {upload} = require('../service/blogHandling.js');
const {handleNewblog} = require('../controller/blogControl.js');

router.post('/add-new',upload.single('attachment'),handleNewblog);

module.exports = router;
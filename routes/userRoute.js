const express = require('express');
const router = express.Router();
const {upload} = require('../service/blogHandling.js');
const {handleuserSignin,handleuserSignup, handleuserLogout, handleuserUpdate} = require('../controller/userControl.js');

router.post('/register',handleuserSignup);
router.post('/login',handleuserSignin);
router.post('/logout',handleuserLogout);
router.post('/edit',(req, res, next) => {
    upload.single('attachment')(req, res, (err) => {
        if (err) {
            req.fileUploadError = err.message;
        }
        next();
    });
},handleuserUpdate);

module.exports = router;
const express = require('express');
const router = express.Router();
const users = require('../models/user.js');
const {handleuserSignin,handleuserSignup, handleuserLogout} = require('../controller/userControl.js');

router.post('/register',handleuserSignup);
router.post('/login',handleuserSignin);
router.post('/logout',handleuserLogout);

module.exports = router;
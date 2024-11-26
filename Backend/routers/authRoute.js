const express = require('express');
const { AdminSignup, signIn, createUser } = require('../controllers/authContoller');
const { requireSignin } = require('../middleware/authmiddleware');

const router=express.Router();

router.post('/adminsignup',AdminSignup)
router.post('/signin',signIn)
router.post('/createuser',requireSignin,createUser)

module.exports=router
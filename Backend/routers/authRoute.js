const express = require('express');
const { AdminSignup, signIn, createUser, fetchalluserOfAdmin } = require('../controllers/authContoller');
const { requireSignin } = require('../middleware/authmiddleware');
const { ChangeRole } = require('../controllers/RoleChange');

const router=express.Router();
router.post('/adminsignup',AdminSignup)
router.post('/signin',signIn)
router.post('/createuser',requireSignin,createUser)
router.put('/updateuser',requireSignin,ChangeRole)
//fetch all users of an admin
router.get('/getusers',requireSignin,fetchalluserOfAdmin);

module.exports=router
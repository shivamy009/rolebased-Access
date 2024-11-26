const express = require('express');
const { AdminSignup, signIn, createUser, fetchalluserOfAdmin, deleteuser } = require('../controllers/authContoller');
const { requireSignin } = require('../middleware/authmiddleware');
const { ChangeRole } = require('../controllers/RoleChange');

const router=express.Router();
router.post('/adminsignup',AdminSignup)
router.post('/signin',signIn)
router.post('/createuser',requireSignin,createUser)
router.put('/updateuser',requireSignin,ChangeRole)
//fetch all users of an admin
router.get('/getusers',requireSignin,fetchalluserOfAdmin);
router.post('/deleteuser/:id',deleteuser)
module.exports=router
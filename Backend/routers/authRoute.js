const express = require('express');
const { AdminSignup, signIn, createUser } = require('../controllers/authContoller');
const { requireSignin } = require('../middleware/authmiddleware');
const { ChangeRole } = require('../controllers/RoleChange');

const router=express.Router();
router.post('/adminsignup',AdminSignup)
router.post('/signin',signIn)
router.post('/createuser',createUser)
router.put('/updateuser',ChangeRole)


module.exports=router
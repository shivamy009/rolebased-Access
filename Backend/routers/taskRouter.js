const express = require('express');
// const { aa } = require('../controllers/authContoller');
const { requireSignin } = require('../middleware/authmiddleware');
const { Addtask } = require('../controllers/taskController');

const router=express.Router();

router.post('/addTask',Addtask)



module.exports=router
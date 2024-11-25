const express = require('express');
// const { aa } = require('../controllers/authContoller');
const { requireSignin } = require('../middleware/authmiddleware');
const { Addtask, updateTaskStatus } = require('../controllers/taskController');

const router=express.Router();

router.post('/addTask',Addtask)
router.put('/updateTask',updateTaskStatus)



module.exports=router
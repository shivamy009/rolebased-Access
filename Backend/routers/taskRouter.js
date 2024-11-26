const express = require('express');
// const { aa } = require('../controllers/authContoller');
const { requireSignin } = require('../middleware/authmiddleware');
const { Addtask, updateTaskStatus, getAllTasks, getAllTAskofUser } = require('../controllers/taskController');

const router=express.Router();

router.post('/addTask',requireSignin,Addtask)
router.put('/updateTask',requireSignin,updateTaskStatus)
router.get('/getallTasks',requireSignin,getAllTasks)
router.get('/gettaskByUser',requireSignin,getAllTAskofUser)



module.exports=router
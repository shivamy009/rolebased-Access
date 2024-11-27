const express = require('express');
// const { aa } = require('../controllers/authContoller');
const { requireSignin, isAdmin } = require('../middleware/authmiddleware');
const { Addtask, updateTaskStatus, getAllTasks, getAllTAskofUser, deleteTask, getAlltaskusinid } = require('../controllers/taskController');

const router=express.Router();

router.post('/addTask',requireSignin,isAdmin,Addtask)
router.put('/updateTask',requireSignin,isAdmin,updateTaskStatus)
router.get('/getallTasks',requireSignin,isAdmin,getAllTasks)
router.post('/deletetask/:id',deleteTask)
router.get('/gettaskByUser',requireSignin,getAllTAskofUser)
router.get('/getTask',requireSignin,getAlltaskusinid)



module.exports=router
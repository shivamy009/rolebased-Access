const User = require('../models/userModel')
const Admin = require('../models/adminModel')
const Task = require('../models/tasks')

const bcrypt = require('bcrypt')
// import { nanoid } from 'nanoid'

const jwt = require('jsonwebtoken')

const formateDataforuser=(user)=>{
       const access_token=jwt.sign({id:user._id},process.env.JWT_SECRET)
       return {
        access_token,
        profile_img:user.profile_img,
        email:user.email,
        fullname:user.fullname,
        role:user.role,
        alltasks:user.alltasks
       }
}
const formateDataforadmin=(user)=>{
       const access_token=jwt.sign({id:user._id},process.env.JWT_SECRET)
       return {
        access_token,
        profile_img:user.profile_img,
        email:user.email,
        fullname:user.fullname,
        alltasks:user.alltasks,
        allusers:user.allusers
       }
}


exports.Addtask= async(req,res)=>{
    try {
        let { taskmessage, title, priority, endDate } = req.body; // Assuming `adminId` is passed in the request body.
        let adminId=req.user.id
        console.log(req.user)
        // Check if all fields are provided
        if (!taskmessage || !title || !priority) {
            return res.status(400).json({
                success: false,
                message: "Please enter all required fields",
            });
        }

        // Create a new task
        const task = await new Task({
            Taskmessage: taskmessage,
            title: title,
            priority: priority,
            endDate: endDate, // Optional field
        }).save();

        // Push the task ID into the Admin's alltasks array
        const admin = await Admin.findByIdAndUpdate(
            adminId, // Assuming the Admin's ID is passed in the request body
            { $push: { alltasks: task._id } }, // Push the new task ID into the alltasks array
            { new: true } // Return the updated Admin document
        );

        if (!admin) {
            return res.status(404).json({
                success: false,
                message: "Admin not found",
            });
        }

        // Return success response
        return res.status(200).json({
            success: true,
            message: "Task assigned successfully",
            taskId: task._id, // Optional: Return the task ID
        });
    } catch (e) {
        console.error(e);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while creating the task",
        });
    }
 
}
 exports.updateTaskStatus = async (req, res) => {
    const { taskId, newStatus } = req.body;
  
    try {
      // Validate inputs
      if (!taskId || !newStatus) {
        return res.status(400).json({ message: "Task ID and new status are required." });
      }
  
      // Find the task by ID and update its status
      const updatedTask = await Task.findByIdAndUpdate(
        taskId,
        { status: newStatus },
        { new: true, runValidators: true } // Return the updated task and validate the status
      );
  
      // If task not found
      if (!updatedTask) {
        return res.status(404).json({ message: "Task not found." });
      }
  
      // Return the updated task
      res.status(200).json({
        message: "Task status updated successfully.",
        task: updatedTask,
      });
    } catch (error) {
      console.error("Error updating task status:", error);
      res.status(500).json({
        message: "An error occurred while updating the task status.",
        error: error.message,
      });
    }
  };
exports.createUser= async(req,res)=>{
    try{
        let {fullname,email,password}=req.body
    
        if(!email || !password || !fullname){
            return res.status(400).json({
                success:false,
                message:"Please Enter All field"
            })
    
        }
        if(fullname.lenght<3){
            return res.status(401).json({
                success:false,
                message:"Full name must be greater than 3 letter"
            })
    
        }
        let existinguser= await Admin.findOne({"email":email})
        let existinguser2= await User.findOne({"email":email})
        // const existinguser = await User.findOne({email})

        if(existinguser || existinguser2){
            return res.status(400).json({
                success:false,
                message:"This email is already resistured with us please login or use another email"
            })
     
        }

        let hashpassword = await bcrypt.hash(password,10)

        const admin = await new User ({
                fullname,email,password:hashpassword
        }).save()

        // let sendData=(admin)

        return res.status(200).json({
            success:true,
            message:"User creation success",
            // sendData

        })
    }
    catch(e){
        console.log(e)
        return res.status(400).json({
            success:false,
            message:"Something went wrong while creating registration",

        })
    }
 
}

exports.signIn=async(req,res)=>{
    try{
        const{email,password,role}= req.body;
    
        if(!email || !password || !role){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        let data;
        if(role==="user"){
            data= await User.findOne({"email":email})
            
        }else{
            data= await Admin.findOne({"email":email})

        }

        if(!data){
            return res.status(400).json({
                success:false,
                message:"This user is not registered"
            })

        }

        const match = await bcrypt.compare(password,data.password);
        if(!match){
            return res.status(400).json({
                success:false,
                message:"Password Incorrect"
            })

        }

        //// const token = await jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'})
        // const token = await jwt.sign({_id:user.id},process.env.JWT_SECRET,{expiresIn:'7d'})

        // console.log(user)
        
        // user = user.toObject();
        
        // user.password=undefined;
        // console.log(user)
         let sendData;

         if(role=="user"){
             sendData=formateDataforuser(data)
             
            }else{
                
                sendData=formateDataforadmin(data)
         }

        return res.status(200).json({
            success:true,
            message:"User login success",
           sendData
        })

    }
    catch(err){
        console.log(err)
        return res.status(400).json({
            success:false,
            message:"Error while login"
        })
    }
}
exports.changePassword=async(req,res)=>{
      let {currentPassword,newPassword}=req.body;
    //   console.log(currentPassword,newPassword)
      let userId=req.user.id;
      if(!currentPassword || !newPassword){
        return res.status(403).json({error:"Please fill all field"})
    }

    User.findOne({_id:userId})
    .then((user)=>{
        if(user.google_auth){
            return res.status(403).json({error:"You can't change account password"})
        }

         bcrypt.compare(currentPassword,user.personal_info.password,(err,result)=>{
            if(err){
                return res.status(500).json({error:"Something went wromg while change password"})
            }
            if(!result){
                return res.status(403).json({error:"Incorrect current password"})
            }
            bcrypt.hash(newPassword,10,(err,hashed_password)=>{
              User.findOneAndUpdate({_id:userId},{"personal_info.password":hashed_password})
              .then((u)=>{
                return res.status(200).json({status:"password changed"})
              })
              .catch(err=>{
                return res.status(500).json({error:"Some error occured while saving new password"})
              })
            })
         })

    })
    .catch(err=>{
        console.log(err)
        return res.status(500).json({error:"User not found"})
    })
}

exports.getAllTasks = async (req,res) => {
    try {
        // Find the admin by ID and populate the 'allTasks' field
        let adminId=req.user.id;
        console.log(adminId)
        const admin = await Admin.findById(adminId).populate({
            path:'alltasks',
            
        });
        // console.log(admin)

        // const user = await User.findById(id).populate({
        //     path: 'courses',
        //     select: 'title description price', // Only include title, description, and price fields
        //   });

        if (!admin) {
            return res.status(200).json({
                success:false,
                message:"Somrthing went wrong"       
             })
        }

        // Return the populated tasks
        return res.status(200).json({
       success:true,
       admin:admin.alltasks       
    })
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return { success: false, message: "Failed to fetch tasks", error };
    }
};
exports.getAllUsers=async(req,res)=>{
    try {
        // Find the admin by ID and populate the 'allTasks' field
        let adminId=req.user.id;
        console.log(adminId)
        const admin = await Admin.findById(adminId).populate({
            path:'allusers',
            
        });
        // console.log(admin)

        // const user = await User.findById(id).populate({
        //     path: 'courses',
        //     select: 'title description price', // Only include title, description, and price fields
        //   });

        if (!admin) {
            return res.status(200).json({
                success:false,
                message:"Somrthing went wrong"       
             })
        }

        // Return the populated tasks
        return res.status(200).json({
       success:true,
       admin:admin.alltasks       
    })
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return { success: false, message: "Failed to fetch tasks", error };
    }
}
// exports.uploadData=async(req,res)=>{
//     console.log(req.user)
//        res.send(req.body)
// }

const jwt =require('jsonwebtoken')
const Admin=require('../models/adminModel')

require('dotenv').config()
exports.requireSignin=async(req,res,next)=>{
    try{
        const decode = await jwt.verify(req.headers.authorization,process.env.JWT_SECRET)
        req.user=decode;
        
        next();
       
    }
    catch(err){
        console.log(err)
        return res.status(400).json({
            success:false,
            message:"Failed in token verification"
        })
    }

}

exports.isAdmin = async (req,res,next) => {
    try {
       let id=req.user.id;
       let user1=await Admin.findById(id);
    //    let user2=await Educator.findById(id);
    //    let user3=await Recruiter.findById(id);
      // Proceed to the next middleware
      if(user1){
        next();
        
      }else{
        res.status(400).json({
          success: false,
          message: 'Failed in token verification',
        });
        return;
        
      }
    } catch (err) {
      // console.log(err);
      // Send an error response if verification fails
      res.status(400).json({
        success: false,
        message: 'Failed in token verification',
      });
      return;
    }
  };
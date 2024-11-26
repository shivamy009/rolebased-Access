
const userModel = require("../models/userModel");
const adminSchema = require("../models/adminModel");

exports.ChangeRole = async (req, res) => {
    try {
        const { id, role } = req.body;
        const user = await  userModel.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }   
        // user.role = role;
        const adminData = {
            fullname: user.fullname,
            email: user.email,
            password: user.password,
            profile_img: user.profile_img,
            alltasks: [],
            role: "admin", // Explicitly set the role to admin
          }
          const newAdmin =  new adminSchema(adminData);
            await newAdmin.save();

            //delete from userDAtabase
            await userModel.findByIdAndDelete(id);
            res.status(200).json({ message: "Role changed successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

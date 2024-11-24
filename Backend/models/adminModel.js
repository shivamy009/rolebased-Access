const  mongoose = require("mongoose")
let profile_imgs_name_list = ["Garfield", "Tinkerbell", "Annie", "Loki", "Cleo", "Angel", "Bob", "Mia", "Coco", "Gracie", "Bear", "Bella", "Abby", "Harley", "Cali", "Leo", "Luna", "Jack", "Felix", "Kiki"];
let profile_imgs_collections_list = ["notionists-neutral", "adventurer-neutral", "fun-emoji"];

const adminSchema= new mongoose.Schema({
    
        fullname: {
            type: String,
            lowercase: true,
            required: true,
            minlength: [3, 'fullname must be 3 letters long'],
        },
        role: {
            type: String,
           default:"admmin",
            // required: true,
           
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true
        },
        password: String,
        profile_img: {
            type: String,
            default: () => {
                return `https://api.dicebear.com/6.x/${profile_imgs_collections_list[Math.floor(Math.random() * profile_imgs_collections_list.length)]}/svg?seed=${profile_imgs_name_list[Math.floor(Math.random() * profile_imgs_name_list.length)]}`
            } 
        },
        alltasks: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'tasks'
        },
        allusers: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'users'
        },
}, 
{ 
    timestamps: {
        createdAt: 'joinedAt'
    } 

    
})

module.exports=mongoose.model('admins',adminSchema)
const  mongoose = require("mongoose")
let profile_imgs_name_list = ["Garfield", "Tinkerbell", "Annie", "Loki", "Cleo", "Angel", "Bob", "Mia", "Coco", "Gracie", "Bear", "Bella", "Abby", "Harley", "Cali", "Leo", "Luna", "Jack", "Felix", "Kiki"];
let profile_imgs_collections_list = ["notionists-neutral", "adventurer-neutral", "fun-emoji"];

const taskSchema= new mongoose.Schema({
    
        status: {
            type: String,
            default: "pending",
            required: true,
            
        },
        endDate: {
            type: String,
            required:true,
        },
        Taskmessage:{
            type: String,
            required: true,
        },
        userid:{
            type:String,
        },
        title:{
            type:String
        },
        priority:{
            type:String
        },
        issuedBy:{
            type:String,
            required:true
        },
        issuedTo:{
            type:String,
            required:true
        },  
}, 
{ 
    timestamps: {
        createdAt: 'joinedAt'
    } 

    
})

module.exports=mongoose.model('tasks',taskSchema)
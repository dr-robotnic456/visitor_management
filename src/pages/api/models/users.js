import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    username:{
        type: String,
        required:true
    },
    email:{
        type:String, 
        required:true
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    telephone:{
        type:String,
        required:true
    }, 
    gender:{
        type:String
    }  
})

export default mongoose.models.Users || mongoose.model("Users", UserSchema)
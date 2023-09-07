import mongoose, { Schema } from "mongoose";

const EmployeeSchema = new Schema({
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
    position:{
        type:String,
    },
    department:{
        type:String,
    } 
})

export default mongoose.models.Employees || mongoose.model("Employees", EmployeeSchema)
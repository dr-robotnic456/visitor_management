import mongoose, { Schema } from "mongoose";

const DepartmentSchema = new Schema({
    department:{
        type: String,
        required:true
    },
    hod:{
        type:String, 
        required:true
    }
})

export default mongoose.models.Departments || mongoose.model("Departments", DepartmentSchema)
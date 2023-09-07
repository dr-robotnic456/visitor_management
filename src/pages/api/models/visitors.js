import mongoose, { Schema } from "mongoose";

const VisitorSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    host:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    reason:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["completed", "cancelled", "pending"],
        default:"pending"
    },
    checkIn:{
        type:String
    },
    checkOut:{
        type:String
    }
});

export default mongoose.models.Visitors || mongoose.model("Visitors", VisitorSchema);
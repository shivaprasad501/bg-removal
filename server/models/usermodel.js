import mongoose from "mongoose";
import { type } from "os";


const userschema=new mongoose.Schema({
    clerkId:{type:String,requird:true,unique:true},
    email:{type:String,requird:true,unique:true},
    photo:{type:String,requird:true},
    firstName:{type:String},
    lastName:{type:String},
    creditBalance:{type:Number,default:5}
})


const usermodel=mongoose.models.user||mongoose.model("user",userschema)

export default usermodel
import mongoose from "mongoose";
import { type } from "os";
import { date } from "zod";


const transactionschema=new mongoose.Schema({
    clerkId:{type:String,required:true},
    plan:{type:String,required:true},
    amount:{type:Number,required:true},
    credits:{type:Number,required:true},
    payment:{type:Boolean,default:false },
    date:{type:Number}

})

const transactionmodel=mongoose.models.transaction||mongoose.model('transaction',transactionschema)

export default transactionmodel 
import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import usermodel from "../models/usermodel.js";
//controller function to remove bg
const removebgimage=async(req,res)=>{
    try {
        const {clerkId}=req.body
        const user=await usermodel.findOne({clerkId})
        if(!user){
            return  res.json({success:false,message:"user not found"})
        }
        if(user.creditBalance===0){
            res.json({success:false,message:'no credit balance',creditBalance:user.creditBalance})
        }
        const imagepath=req.file.path

        //read image file
        const imageFile=fs.createReadStream(imagepath)
        const formdata=new FormData()
        formdata.append('image_file',imageFile)

        const {data}=await axios.post('https://clipdrop-api.co/remove-background/v1',formdata,{headers:{
            'x-api-key':process.env.CLIPDROP_API
        },
        responseType:'arraybuffer'
    })
    const Base64Image=Buffer.from(data,"binary").toString('base64')
    const resultimage=`data:${req.file.mimetype};base64,${Base64Image}`
    await usermodel.findByIdAndUpdate(user._id,{creditBalance:user.creditBalance-1})
    res.json({success:true,resultimage,creditBalance:user.creditBalance-1,message:'background removed'})


        
    } catch (error) {
         console.log(error)
        res.json({success:true,message:error.message})
    }
}

export {removebgimage}
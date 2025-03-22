import { Webhook } from "svix"
import usermodel from '../models/usermodel.js'
//api controller function for manage the clerk user with database
const clerkwebhooks=async(req,res)=>{
    try {
        //creating a svix instance  with cleark webhook secret
        const whook=new Webhook(process.env.CLEARK_WEBHOOK_SECRET)
        await whook.verify(JSON.stringify(req.body),{
            "svix-id":req.headers["svix-id"],
            "svix-timestamp":req.headers["svix-timestamp"],
            "svix-signature":req.headers["svix-signature"]
        })
        const {data,type}=req.body
        switch (type) {
            case "user.created":{
                const userData={
                    clerkId: data.id,
                    email: data.email_addresses[0].email_address,
                    firstName: data.first_name, 
                    lastName: data.last_name, 
                    photo: data.image_url
                }
                await usermodel.create(userData)
                res.json({})

                break;
             }
            case "user.updated":{
                const userData={
                    email: data.email_addresses[0].email_address,
                    firstName: data.first_name, 
                    lastName: data.last_name, 
                    photo: data.image_url
                }
                await usermodel.findOneAndUpdate({clerkId:data.id},userData)
                res.json({})

                break;
             }
            case "user.deleted":{
                await usermodel.findOneAndDelete({clerkId:data.id})
                res.json({})

                break;
             }
                
            
        
            default:
                break;
        }
        
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})
        
    }

}
export {clerkwebhooks}
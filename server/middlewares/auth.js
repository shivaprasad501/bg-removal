import  jwt  from "jsonwebtoken";

//middleware to decode  jwt token to get clerkId
const authuser=async(req,res,next)=>{

    try {
        const {token}=req.headers
        if(!token){
            return res.json({success:false,message:'not authorized login again'})
        }
        const token_decode=jwt.decode(token)
        req.body.clerkId=token_decode.clerkId
        next()

    
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})
        
    }

}


export default authuser

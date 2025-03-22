import express from "express"
import{clerkwebhooks} from '../controllers/Usercontroller.js'

const userRouter=express.Router()
userRouter.post("/webhooks",clerkwebhooks)

export default userRouter
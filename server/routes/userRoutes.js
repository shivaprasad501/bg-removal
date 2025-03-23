import express from "express"
import{clerkwebhooks,paymentRazorpay,usercredit, verifyRazorpay} from '../controllers/Usercontroller.js'
import authuser from "../middlewares/auth.js"

const userRouter=express.Router()
userRouter.post("/webhooks",clerkwebhooks)
userRouter.get("/credits",authuser,usercredit)
userRouter.post("/pay-razorpay",authuser,paymentRazorpay)
userRouter.post("/verifyRazorpay",verifyRazorpay)

export default userRouter
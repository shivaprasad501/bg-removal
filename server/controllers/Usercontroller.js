import { Webhook } from "svix"
import usermodel from '../models/usermodel.js'
import razorpay from 'razorpay'
import transactionmodel from "../models/transactionmodel.js"


//api controller function for manage the clerk user with database
const clerkwebhooks = async (req, res) => {
    try {
        //creating a svix instance  with cleark webhook secret
        const whook = new Webhook(process.env.CLEARK_WEBHOOK_SECRET)
        await whook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        })
        const { data, type } = req.body
        switch (type) {
            case "user.created": {
                const userData = {
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
            case "user.updated": {
                const userData = {
                    email: data.email_addresses[0].email_address,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    photo: data.image_url
                }
                await usermodel.findOneAndUpdate({ clerkId: data.id }, userData)
                res.json({})

                break;
            }
            case "user.deleted": {
                await usermodel.findOneAndDelete({ clerkId: data.id })
                res.json({})

                break;
            }



            default:
                break;
        }

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })

    }

}
//api controller function to get user credit data from  database
const usercredit = async (req, res) => {
    try {
        const { clerkId } = req.body
        const userData = await usermodel.findOne({ clerkId })
        res.json({ success: true, credits: userData.creditBalance })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })

    }

}


// payment gateway intialization 
const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

//api to make payment
const paymentRazorpay = async (req, res) => {
    try {
        const { clerkId, planId } = req.body
        const userdata = await usermodel.findOne({ clerkId })
        if (!userdata && planId) {
            return res.json({ success: false, message: "invalid credentials" })
        }
        let credits, plan, amount, date
        switch (planId) {
            case 'Basic':
                plan = 'Basic'
                credits = 100
                amount = 10
                break;

            case 'Advanced':
                plan = 'Advanced'
                credits = 500
                amount = 50
                break;

            case 'Business':
                plan = 'Business'
                credits = 2500
                amount = 250
                break;

            default:
                break;
        }
        date = Date.now()

        //createing transaction
        const transactionData = {
            clerkId, plan, amount, credits, date
        }

        const newtransaction = await transactionmodel.create(transactionData)
        const options = {
            amount: amount*100,
            currency: process.env.CURRENCY,
            receipt: newtransaction._id
        }
        await razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                return res.json({ success: false, message: error })
            }
            return res.json({ success: true, order })

        })


    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })

    }
}
//api controller function to verify razorpay payment
const verifyRazorpay=async(req,res)=>{
    try {
        const {razorpay_order_id}=req.body
        const orderinfo=await razorpayInstance.orders.fetch(razorpay_order_id)
        if(orderinfo.status==='paid'){
            const transactionData= await transactionmodel.findById(orderinfo.receipt)
            if (transactionData.payment) {
                return res.json({ success: false, message: 'Payment Failed' });
            }
            
            // Adding Credits to User Data
            const userData = await usermodel.findOne({ clerkId: transactionData.clerkId });
            const creditBalance = userData.creditBalance + transactionData.credits;
            
            await usermodel.findByIdAndUpdate(userData._id, { creditBalance });
            //making payment true
            await transactionmodel.findByIdAndUpdate(transactionData._id,{payment:true})
            res.json({success:true,message:"credits added"})


        }
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
        
    }
}


export { clerkwebhooks, usercredit ,paymentRazorpay,verifyRazorpay}


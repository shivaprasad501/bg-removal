import express from "express"
import { removebgimage } from "../controllers/imagecontroller.js"
import upload from "../middlewares/multer.js"
import authuser from "../middlewares/auth.js"

const imageRouter=express.Router()

imageRouter.post('/removebg',upload.single('image'),authuser,removebgimage)

export default imageRouter

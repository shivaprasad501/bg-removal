import express from'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './config/Mongodb.js'

//app config
const PORT=process.env.PORT||4000
const app=express()

//middleware
app.use(express.json())
app.use(cors())
await connectDB()

//API routes

app.get('/',(req,res)=>res.send('Api working'))

app.listen(PORT,console.log('server running on '+PORT))
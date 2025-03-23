import React, { useContext } from 'react'
import { assets, plans } from '../assets/assets'
import { Appcontext } from '../context/appcontext'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'
import { toast } from 'react-toastify'
import axios from 'axios'

const BuyCredits = () => {
  const {backendurl,loadcreditdata}=useContext(Appcontext)
  const navigate=useNavigate()
  const{getToken}=useAuth()
  const initpay=async(order)=>{

    const options={
    key:import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount:order.amount,
    currency:order.currency,
    name:'credit Payment',
    description:'credit Payment',
      order_id:order.id,
      receipt:order.receipt,
      handler:async(response)=>{
        const token= await getToken()
        try {
          const {data}=await axios.post(backendurl+"/api/user/verifyRazorpay",response,{headers:{token}})
          if(data.success){
            loadcreditdata()
            navigate('/')
            toast.success('Credits Added')
          }
        } catch (error) {
          console.log(error)
          toast.error(error)
          
        }
      }
    }
   const rzp=new window.Razorpay(options)
   rzp.open()
  }

 const paymentRazorpay=async(planId)=>{
  try {
     const token=await getToken()
     const {data}=await axios.post(backendurl+'/api/user/pay-razorpay',{planId},{headers:{token}})
     if(data.success){
      initpay(data.order)
     }

  } catch (error) {
    console.log(error);
    toast.error(error.message)
    
  }
 }




  return (
    <div className='min-h-[80vh] text-center  mb-10 pt-14'>
      <button className='border border-gray-400 px-10 py-2 rounded-full mb-6'>Our Plans</button>
      <h1 className='text-center text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent mb-6 sm:mb-10 '>Choose the paln that's right for you</h1>
      <div className='flex flex-wrap justify-center gap-6 text-left sm:mb-20'>
        {plans.map((item,index)=>(
          <div className='drop-shadow-sm bg-white  rounded-lg py-12 px-8  text-gray-700 hover:scale-105 transition-all duration-500 ' key={index}>
            <img className='w-10' src={assets.logo_icon} alt="" />
            <p className='mt-3 font-semibold'>{item.id}</p>
            <p className='text-sm'>{item.desc}</p>
            <p className='mt-6'>
              <span className='text-3xl font-medium'>₹{item.price}</span>/{item.credits} Credits
            </p>
            <button onClick={()=>paymentRazorpay(item.id)} className='w-full rounded-md bg-black text-white mt-8 text-sm  min-w-52 py-2.5'>purchase</button>
          </div>
        ))}
      </div>
     
    </div>
  )
}

export default BuyCredits

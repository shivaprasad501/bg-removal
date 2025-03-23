import { useAuth, useClerk, useUser } from "@clerk/clerk-react";
import { createContext, useState } from "react";
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
  

export const Appcontext=createContext()


const AppcontextProvider=(props)=>{

    const[credit,setcredit]=useState(false)
    const[image,setimage]=useState(false)
    const[resultimage,setresultimage]=useState(false)
 



    const backendurl=import.meta.env.VITE_BACKEND_URL
    const {getToken}=useAuth()
    const {isSignedIn}=useUser()
    const {openSignIn}=useClerk()
    const navigate=useNavigate()



    const loadcreditdata=async()=>{
        try {
            const token=await getToken()
            const {data}=await axios.get(backendurl+"/api/user/credits",{headers:{token}})
            if(data.success){
                setcredit(data.credits)
            }
            
        } catch (error) {
            console.log(error)
            toast.error(error.message)
            
        }
    }
 const removebg=async(image)=>{
    try {
        if(!isSignedIn){
          return openSignIn()
        }
        setimage(image)
        setresultimage(false)
        navigate('/result')
        const token= await getToken()
        const formdata=new FormData()
        image&& formdata.append('image',image)
        const {data}=await axios.post(backendurl+"/api/image/removebg",formdata,{headers:{token}})
        if(data.success){
            setresultimage(data.resultimage)
            data.creditBalance && setcredit(data.creditBalance)
        }else{
            toast.error(data.message)
            data.creditBalance && setcredit(data.creditBalance)
            if( data.creditBalance===0){
                 navigate("/buy")
            }
        }

        
    } catch (error) {
        console.log(error)
        toast.error(error.message)
        
    }
 }

     

 const  value={
    credit,setcredit,
    loadcreditdata,backendurl,
    image,setimage,
    removebg,resultimage,setresultimage

 }
 return(
    <Appcontext.Provider value={value}>
        {props.children }
    </Appcontext.Provider>

 )

 

}

export default AppcontextProvider
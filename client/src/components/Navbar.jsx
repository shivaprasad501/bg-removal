import { Link } from 'react-router-dom'
import {assets} from '../assets/assets'
import React from 'react'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'

const Navbar = () => {
  const{openSignIn}=useClerk()
  const {isSignedIn,user}=useUser()
  return (
    <div className=' flex justify-between items-center mx-4 lg:mx-44 py-3 '>
       <Link to='/'><img className='w-32 sm:w-44' src={assets.logo} alt="" /></Link> 
       {
       isSignedIn?
       <div>
        <UserButton/>
       </div>
       : <button onClick={()=>openSignIn({})} className='flex bg-zinc-800 text-white items-center rounded-full gap-4 px-4 py-2 sm:px-8 sn:py-3 text-sm cursor-pointer hover:scale-105 transition-all duration-500 '>
       Get started <img className='w-3 sm:w-4' src={assets.arrow_icon} alt="" />
       </button>
       

       }
       
    </div>
  )
}

export default Navbar

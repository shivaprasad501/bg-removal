import { Link, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import React, { useContext, useEffect } from 'react'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { Appcontext } from '../context/appcontext'

const Navbar = () => {
  const { openSignIn } = useClerk()
  const { isSignedIn, user } = useUser()
  const { credit, loadcreditdata } = useContext(Appcontext)
  const navigate=useNavigate()
  useEffect(() => {
    if (isSignedIn) {
      loadcreditdata()
    }
  }, [isSignedIn])
  return (
    <div className=' flex justify-between items-center mx-4 lg:mx-44 py-3 '>
      <Link to='/'><img className='w-32 sm:w-44' src={assets.logo} alt="" /></Link>
      {
        isSignedIn ?
          <div className='flex items-center gap-2 sm:gap-3'>
            <button  onClick={()=>navigate('/buy')} className='flex items-center gap-2 sm:gap-3  bg-blue-100 px-4 sm:px-7 sm:py-2.5 py-1.5 rounded-full hover:scale-105 transition-all duration-700'>
              <img className='w-3' src={assets.credit_icon} alt="" />
              <p className=' sm:text-sm text-xs font-medium text-gray-600'>Credits : {credit}</p>
              </button>
              <p className='text-gray-600 max-sm:hidden'>Hi , {user.firstName}</p>
            <UserButton />
          </div>
          : <button onClick={() => openSignIn({})} className='flex bg-zinc-800 text-white items-center rounded-full gap-4 px-4 py-2 sm:px-8 sn:py-3 text-sm cursor-pointer hover:scale-105 transition-all duration-500 '>
            Get started <img className='w-3 sm:w-4' src={assets.arrow_icon} alt="" />
          </button>


      }

    </div>
  )
}

export default Navbar

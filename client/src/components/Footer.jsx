import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='flex justify-between items-center gap-4 px-4 lg:px-44 py-3'>
        <img className='w-40' src={assets.logo} alt="" />
        <p className='flex-1 border-l-2 border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden'>Copyright @BgRemoval.com | All right reserved.</p>
        <div className='flex gap-1'>
            <img className='w-10' src={assets.facebook_icon } alt="" />
            <img className='w-10' src={assets.twitter_icon} alt="" />
            <img className='w-10' src={assets.google_plus_icon} alt="" />
        </div>
      
    </div>
  )
}

export default Footer

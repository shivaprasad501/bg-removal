import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { Appcontext } from '../context/appcontext'

const Result = () => {
  const {resultimage,image}=useContext(Appcontext)
  return (
    <div className='mx-4 my-3 lg:m-44 mt-14 min-h-[75vh]'>
      <div className=' drop-shadow-sm px-8 py-6 rounded-lg bg-white'>
        {/* image container */}
        <div className='flex flex-col sm:grid grid-cols-2 gap-8'>
          <div>
            {/* left side */}
            <p className='font-semibold text-gray-600 mb-2'>original</p>
            <img className='rounded-md border border-gray-300' src={image?URL.createObjectURL(image):' '} alt="" />
          </div>
          <div className='flex flex-col'>
            {/* right side */}
            <p className='font-semibold text-gray-600 mb-2'>Background Removed </p>
            <div className='rounded-md border border-gray-300 h-full relative bg-layer overflow-hidden '>
              <img src={resultimage?resultimage:' '} alt="" />
              {
                !resultimage && image && <div className='absolute right-1/2 bottom-1/2 transform  translate-x-1/2  translate-y-1/2'>
                <div className='border-4 border-violet-600 rounded-full  h-12 w-12 border-t-transparent animate-spin'></div>
               </div>
              }
            </div>
          </div>
        </div>
        {/* buttons */}
       { resultimage && <div className='flex justify-center sm:justify-end items-center flex-wrap gap-4 mt-6'>
          <button className='px-8 py-2.5 text-violet-600 text-sm border border-violet-600 rounded-full hover:scale-105 transition-all duration-700'>Try another image </button>
          <a href={resultimage} download className='px-8 py-2.5 text-white text-sm  bg-gradient-to-r from-violet-600 to-fuchsia-500 rounded-full hover:scale-105 transition-all duration-700'>Download image</a>
        </div>}
      </div>

    </div>
  )
}

export default Result

import { Dot } from 'lucide-react'
import React from 'react'

const Hero = () => {
  return (
    <div className='min-h-screen bg-gradient-to-l flex flex-col items-center justify-center text-center from-slate-900 via-purple-900 to-slate-900 text-white'>
      <div className='  rounded-full inline-flex justify-center items-center gap-2 py-1 px-3 border'>
        <span className=' h-2 w-2 animate-pulse bg-green-400 rounded-full anima'></span>
        <span> Over 100K URLs shortned this month</span>
      </div>
      <div className='pt-5'>
        <h1 className='text-5xl font-serif font-bold'> Shorten URLs Instantly</h1>
        <h1 className='text-5xl font-serif font-bold bg-gradient-to-r from-yellow-200 to-orange-500  bg-clip-text text-transparent pb-2'>EasyJmp</h1>
      </div>
    </div>
  )
}

export default Hero
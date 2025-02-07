import React from 'react'
import RecomendedPlans from './RecomendedPlans'

const Recharge = () => {
  return (
    <div className=' max-w-{732px}   bg-white  pt-9 pb-8 ps-5'>
        <div className='p-5 w-max border-gray-600 border-spacing-1 shadow-md rounded-lg px-5'>
            <div className='flex justify-between items-center mb-4'>
                <div className='text-black text-sm font-sans'>Your Plan: Essential</div> 
                <div className='text-black text-sm font-sans'>Available Credits: 15</div>
            </div>
            <div>
                <h2 className='text-black text-xs  font-sans pb-3'>To get the best results post 25-30 videos per month</h2>
            </div>
            <div>
                <h2 className='text-black text-xs  font-sans pb-3'>You can still catch up by buying more credits</h2>
            </div>
            <div>
                <button className='bg-violet-600 hover:bg-violet-600 text-white font-sans text-sm px-11 '>Get 15 more credits at 35% off</button>
            </div>
        </div>
                
    </div>
  )
}

export default Recharge
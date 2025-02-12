import React from 'react'
import Cards from './Cards'
import Slideer from './Slideer'

const RecomendedPlans = () => {
  return (
    <>
        <div className='bg-white h-full ps-4 pb-20'>
            
            <div className='bg-gray-200 h-96 w-80 ps-8 shadow-lg rounded-lg relative '>
            
                <h2 className='font-bold font-sans text-sm text-black pt-8 '>Recommended Plans</h2>
                
                <Slideer/>

                <div className=''>  
                    <div className='pb-2'>
                        <button className='absolute bottom-16 right-12 left-12   bg-violet-600 hover:bg-violet-800 rounded-md px-16 py-2 text-white font-semibold '>See all plans</button>
                        
                    </div>
                    <div className=' absolute bottom-5 right-12 left-12 border border-violet-700  rounded-lg'> 
                        <h2 className='pl-10 pt-1 pb-1 font-bold '>Create custom Plan</h2>
                    </div>
                </div>
                
            </div>     
        </div>
    </>
  )
}

export default RecomendedPlans
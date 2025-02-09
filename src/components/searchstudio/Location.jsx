import React from 'react'
import { IoLocationSharp } from "react-icons/io5";



const Location = () => {
  return (
    <div className='ps-12 pt-4'>
        <div className='w-64 h-12  border border-black border-spacing-3 top-inner-shadow flex'>
            <div className='pt-2 ps-2 '>
                <IoLocationSharp size={30} className='text-blue-950 ' />
            </div>
            <div className='pt-3 ps-12'>
                <h2 className='font-bold text-sm'>Yelechanahalli</h2>
            </div>
        </div>

       
    </div>

    
        
  )
}

export default Location;
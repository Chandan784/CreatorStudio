import React from 'react'

const Cards = () => {
  return (
    <div className='bg-white w-max h-48 border rounded-lg'>
    <h2 className='text-red-800 font-extrabold text-xs py-3 ps-36 pe-3'>5 Platforms</h2>
    <div className='flex justify-between mb-4'>
        <div><h2 className='text-black font-bold text-xs px-3'>25000</h2></div>
        <div><h2 className='text-indigo-600 text-xs pe-3'>View Details</h2></div>
    </div>
    <div className='flex  justify-evenly pt-3'>
        <div>
            <h2 className='text-black text-xs'>Validity</h2>
            <h2 className='text-black text-xs'>45 days</h2>
        </div>
        <div>
            <h2 className='text-black text-xs'>Videos</h2>
            <h2 className='text-black text-xs ps-5'>5</h2>
        </div>
        <div>
            <h2 className='text-black text-xs'>Platforms</h2>
            <h2 className='text-black ps-6 text-xs'>5</h2>
        </div>
    </div>
    <div>
        <div className='flex ps-5 pt-8'>
            <button className='bg-violet-600 hover:bg-violet-800 px-5 py-2 rounded-md text-white '>Buy</button>
        </div>
        
    </div>
</div>

  )
}

export default Cards
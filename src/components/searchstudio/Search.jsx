import React from 'react'
import { FaStar } from "react-icons/fa";

const Search = () => {
  return (
    <div className='max-w-{732px} bg-white '>
        <div className='ps-12'>
            <h2 className='text-black text-xs font-extrabold pb-5 pt-2'>Book your preferred location</h2>
            <div className='w-64 h-16 flex border border-black border-spacing-3   '>
                <div className='pt-2'>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiHQ0-0VSyIB3fjYUp2jkjYaScXPWbWYX9nw&s" alt=""  className='h-12 ps-2 '/>
                </div>
                <div>
                  <h2 className='text-xs font-extrabold text-black pt-2 pl-2'>previous booking</h2>
                  <div className='flex'>
                     <div>
                        {/* <img src="https://static.vecteezy.com/system/resources/thumbnails/002/450/561/small/five-stars-rating-icon-vector.jpg" className='h-5 ps-2' /> */}
                        <div className='flex ps-2'>
                        <FaStar className='text-yellow-400 text-xs'/>
                        <FaStar className='text-yellow-400 text-xs'/>
                        <FaStar className='text-yellow-400 text-xs'/>
                        <FaStar className='text-yellow-400 text-xs'/>
                        <FaStar className='text-yellow-400 text-xs'/>

                        </div>
                        <h2 className='text-black text-xs font-bold pl-2'>999 reviews</h2>
                     </div>
                     <div className='ps-2 pt-1'>
                        <button className='bg-violet-600 hover:bg-violet-500 pl-2 pr-2 text-xs font-semibold text-white py-1 shadow-md rounded-sm'>Book Again</button>
                     </div>
                    </div>
                  </div>
                </div>
            </div>
    </div>
  )
}

export default Search
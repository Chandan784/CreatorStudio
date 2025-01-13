import React from 'react'
import { FaMapMarkerAlt, FaHotel, FaBed, FaUserFriends } from "react-icons/fa";

const Details = () => {
  return (
    <>
      <div className='mt-40 md:mt-20 lg:mt-0 py-16 md:py-[70px] lg:py-20 mx-auto px-4 xl:px-0 max-w-[1200px] grid grid-cols-2 lg:grid-cols-4 gap-5 gap-y-12 text-center'>
        <div>
          <span className="flex justify-center text-red-600 mb-2 text-4xl">
            <FaMapMarkerAlt />
          </span>
          <h3 className='font-bold text-4xl'>80</h3>
          <p className='text-2xl md:text-3xl text-black text-opacity-70'>Countries</p>
        </div>
        <div>
          <span className="flex justify-center text-blue-600 mb-2 text-4xl">
            <FaHotel />
          </span>
          <h3 className='font-bold text-4xl'>25K+</h3>
          <p className='text-2xl md:text-3xl text-black text-opacity-70'>Hotels in India</p>
        </div>
        <div>
          <span className="flex justify-center text-green-600 mb-2 text-4xl">
            <FaBed />
          </span>
          <h3 className='font-bold text-4xl'>1M+</h3>
          <p className='text-2xl md:text-3xl text-black text-opacity-70'>Rooms</p>
        </div>
        <div>
          <span className="flex justify-center text-yellow-600 mb-2 text-4xl">
            <FaUserFriends />
          </span>
          <h3 className='font-bold text-4xl'>90M+</h3>
          <p className='text-2xl md:text-3xl text-black text-opacity-70'>Amilo Guests</p>
        </div>
      </div>
    </>
  )
}

export default Details
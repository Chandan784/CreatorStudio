import React from 'react'
import { FaMapMarkerAlt, FaHotel, FaBed, FaUserFriends } from "react-icons/fa";

const Details = () => {
  return (
    <>
        <div className='pt-80 lg:pt-10 grid grid-cols-2 lg:grid-cols-4 gap-5 text-center'>
            <div>
            <span className="flex justify-center text-red-600 mb-2 text-4xl">
            <FaMapMarkerAlt />
          </span>
              <h3 className='font-bold text-4xl'>80</h3>
              <p className='text-3xl'>Countries</p>
            </div>
            <div>
            <span className="flex justify-center text-blue-600 mb-2 text-4xl">
            <FaHotel />
          </span>
              <h3 className='font-bold text-4xl'>25K+</h3>
              <p className='text-3xl'>Hotels in India</p>
            </div>
            <div>
            <span className="flex justify-center text-green-600 mb-2 text-4xl">
            <FaBed />
          </span>
              <h3 className='font-bold text-4xl'>1M+</h3>
              <p className='text-3xl'>Rooms</p>
            </div>
            <div>
            <span className="flex justify-center text-yellow-600 mb-2 text-4xl">
            <FaUserFriends />
          </span>
              <h3 className='font-bold text-4xl'>90M+</h3>
              <p className='text-3xl'>OYO Guests</p>
            </div>
        </div>
    </>
  )
}

export default Details
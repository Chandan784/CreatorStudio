import React from 'react'
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import { FaPinterestSquare } from "react-icons/fa";
import { FaRupeeSign } from "react-icons/fa";

const Cards = () => {
  return (
    <div className='bg-white w-max h-48 border rounded-lg'>
    <h2 className='text-red-800 font-extrabold text-xs py-3 ps-36 pe-3 text-shadow-lg'>5 Platforms</h2>
    <div className='flex justify-between mb-4'>
        <div className='flex relative'>
            <FaRupeeSign className='pl-2'/>
            <h2 className='text-black font-bold text-xs pl-1'>25000</h2>
        </div>
        <div>
            <h2 className='text-indigo-600 text-xs pe-3'>View Details</h2>
        </div>
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
    <div className='flex justify-between pt-7'>
        <div className='flex ps-5 '>
            <button className='bg-violet-600 hover:bg-violet-800 px-5 py-2 rounded-md text-white '>Buy</button>
        </div>
        <div className='flex pr-1 pt-5'>
            <FaFacebookSquare className='text-blue-600 ' />
            <FaInstagramSquare className=''/>
            <FaLinkedin className='text-blue-700'/>
            <FaYoutube className='text-red-600'/>
            <FaTwitter className='text-blue-400'/>
            <FaPinterestSquare className='text-pink-800'/>

         </div>
    </div>
</div>

  )
}

export default Cards
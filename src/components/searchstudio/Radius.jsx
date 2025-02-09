import React from 'react'
import { LuRadius } from "react-icons/lu";
import { RxCross1 } from "react-icons/rx";

const Radius = () => {
  return (
    <div>
            <div className='ps-12 pt-4'>
            <div className='flex w-64 h-12  border border-black border-spacing-3'>
                <div className='pt-2 pl-2'>
                <LuRadius size={30} className='text-teal-600' />

                </div>
                <div className='pt-3 ps-12'>
                    <h2 className='font-bold text-sm'>Radius</h2>
                </div>
            </div>

            
        </div>

        <div className='flex py-6 ps-12'>
                <div className='flex border w-28 h-10 py-2    bg-pink-100'>
                    <div className='pt-1 pr-3'>
                    <RxCross1 />
                    </div>
                    <h2 className='text-xs font-bold pt-1'>J P Nagar</h2>
                </div>
                <div className='pl-4'>
                    <div className='flex border w-32 h-10 py-2 bg-pink-100'>
                        <div className='pt-1 pr-3'>
                        <RxCross1  />
                        </div>
                        <h2 className='text-xs font-bold pt-1'>H S R Complex</h2>
                    </div>
                </div>
        </div>

        <div className='ps-12'>
        <iframe src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d62212.32628966541!2d77.55069006099117!3d12.954541912683105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sStudio!5e0!3m2!1sen!2sin!4v1739133616093!5m2!1sen!2sin" className='w-64 h-52' ></iframe>
        </div>

        <div className='ps-12 py-8 '>
            <button className='text-white font-bold h-9 w-64 bg-blue-400 hover:bg-blue-500 rounded-md '>Confirm</button>
        </div>
    </div>
  )
}

export default Radius
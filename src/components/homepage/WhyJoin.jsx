import React from 'react'
import { HERE_PARTNERS_CARD_LIST, WHY_JOIN_CARD_LIST } from '../common/Helper'
import Image from 'next/image'

const WhyJoin = () => {
    return (
        <div className='bg-[#f3f5f7]'>
            <div className="max-w-[1200px] px-4 mx-auto xl:px-0 py-16 md:py-[70px] lg:py-20">
                <h2 className="text-center text-3xl md:text-4xl font-bold text-black leading-none text-opacity-90">Why Join AmiloAi</h2>
                <p className='text-base text-center text-black md:text-lg text-opacity-70 leading-none pt-2.5 pb-10 md:pb-12'>Joining the world's largest hospitality network can benefit you in many ways</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {WHY_JOIN_CARD_LIST.map((obj, i) => {
                        return (
                            <div className="bg-white shadow-md border border-gray-700 rounded-md hover:scale-[1.02] p-4 overflow-hidden duration-300" key={i}>
                                <Image src={obj.image} alt={'card'} width={400} height={400} className='w-full rounded h-[250px] object-cover' />
                                <p className='text-base text-center text-black font-bold pt-2.5 md:text-lg leading-none'>{obj.title}</p>
                                <p className='text-sm text-center text-black md:text-base text-opacity-70 leading-none'>{obj.description}</p>
                                <a href="#" className='text-green-600 mt-2 flex justify-center text-center font-semibold text-sm md:text-base leading-none hover:text-orange-600 duration-300'>Learn More</a>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default WhyJoin
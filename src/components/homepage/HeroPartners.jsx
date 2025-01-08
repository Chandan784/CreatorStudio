import React from 'react'
import { HERE_PARTNERS_CARD_LIST } from '../common/Helper'
import Image from 'next/image'

const HerePartners = () => {
    return (
        <div className='bg-[#f3f5f7]'>
            <div className="max-w-[1200px] px-4 mx-auto xl:px-0 py-16 md:py-[70px] lg:py-20">
                <h2 className="text-center text-3xl md:text-4xl font-bold text-black leading-none text-opacity-90">Hear from our Partners</h2>
                <p className='text-base text-center text-black md:text-lg text-opacity-70 leading-none pt-2.5 pb-10 md:pb-12'>Check out our partner success stories in India</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {HERE_PARTNERS_CARD_LIST.map((obj, i) => {
                        return (
                            <div className="bg-white shadow-md rounded-md hover:scale-[1.02] overflow-hidden duration-300" key={i}>
                                <Image src={obj.image} alt={'card'} width={400} height={400} className='w-full h-[250px] object-cover' />
                                <div className="p-6 relative">
                                    <button className='bg-black -top-[18px] absolute block text-white p-1 leading-none text-base font-bold'>Play Button</button>
                                    <p className='text-base text-black font-bold md:text-lg leading-none'>{obj.title}</p>
                                    <p className='text-sm text-black md:text-base text-opacity-70 leading-none'>{obj.description}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default HerePartners
import Image from 'next/image'
import React from 'react'

const RequestCall = () => {
    return (
        <div className="max-w-[1200px] mx-auto w-full px-4 xl:px-0 py-16 md:py-[70px] lg:py-20">
            <div className="flex flex-col md:flex-row items-center justify-center gap-10">
                {/* Left Side - Map */}
                <div className="flex-1">
                    <Image
                        src="/assets/images/home/webp/why-img-one.webp" // Place your image in the public folder
                        alt="World map with red dots"
                        width={600}
                        height={400}
                        className="w-full h-auto"
                    />
                </div>

                {/* Right Side - Content */}
                <div className="flex-1 text-center md:text-left space-y-6">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                        Ready to get started?
                    </h2>
                    <p className="text-gray-700 text-base md:text-lg">
                        Join the world’s fastest-growing hotel chain and unlock the potential
                        of your assets! Request a call today and jump aboard the AmiloAi family.
                    </p>
                    <button className="px-8 py-2.5 md:py-3 bg-green-500 hover:bg-green-600 text-white text-base md:text-lg font-semibold rounded-lg transition">
                        REQUEST A CALL
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RequestCall
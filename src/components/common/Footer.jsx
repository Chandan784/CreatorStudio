import React from 'react'
import Image from 'next/image'
import Icons from './Icon'

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-gray-400 py-8">
            {/* Top Section: Logo and Links */}
            <div className="max-w-7xl mx-auto px-4 flex flex-col">
                {/* Logo and Tagline */}
                <div className="flex flex-col md:flex-row items-center space-x-4">
                    <Image
                        src="/dummy-logo.png" // Replace with your logo in the public folder
                        alt="Company Logo"
                        width={50}
                        height={50}
                    />
                    <h3 className="text-white text-base md:text-lg lg:text-xl font-medium lg:font-bold">
                        The World's Fastest Growing Hotel Chain
                    </h3>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-wrap justify-center md:justify-start space-x-4 pt-6">

                    <a href="#" className="hover:text-white">
                        Our Story
                    </a>
                    <span>|</span>


                    <a href="#" className="hover:text-white">
                        Official AmiloAi Blog
                    </a>

                    <span>|</span>

                    <a href="#" className="hover:text-white">
                        Refer and Earn
                    </a>

                    <span>|</span>

                    <a href="#" className="hover:text-white">
                        Terms & Conditions
                    </a>

                    <span>|</span>

                    <a href="#" className="hover:text-white">
                        Privacy Policy
                    </a>

                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-700 my-8"></div>

            {/* Bottom Section: Social Media Icons and Copyright */}
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                {/* Social Media Icons */}
                <div className="flex space-x-4">
                    <a href="#" aria-label="Instagram" className="hover:text-white">
                        <Icons icon={"instagram"} />
                    </a>
                    <a href="#" aria-label="Twitter" className="hover:text-white">
                    <Icons icon={"twitter"} />
                    </a>
                    <a href="#" aria-label="YouTube" className="hover:text-white">
                    <Icons icon={"youtube"} />
                    </a>
                    <a href="#" aria-label="facebook" className="hover:text-white">
                    <Icons icon={"facebook"} />
                    </a>
                </div>

                {/* Copyright */}
                <p className="text-sm text-gray-500 leading-none">
                    2018-2019 © Oravel Stays Private Limited
                </p>
            </div>
        </footer>
    )
}

export default Footer
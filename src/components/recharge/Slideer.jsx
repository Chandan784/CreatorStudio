'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Cards from './Cards';

// Dynamically import Slider to disable SSR
const Slider = dynamic(() => import('react-slick'), { ssr: false });

const Slideer = () => {
    const settings = {
        dots: true,
        infinite: true,
        autoplay: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
        ]
    };

    return (
        <div className="myContainer pb-40 pb-sm-60 pb-md-80 pb-lg-100">
            {/* <h3 className="text-center ff_primary fs_lg fw_bold color_heading pb-1">Make memories with us</h3> */}
            <Slider {...settings} className="pt-4">
                <div className="px-2">
                    <Cards/>
                </div>
                <div className="px-2 mt-sm-30">
                    <Cards/>
                </div>
                <div className="px-2">
                    <Cards/>
                </div>
               
            </Slider>
        </div>
    );
};

export default Slideer;


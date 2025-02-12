"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { VIDEO_TITLE_DATA_LIST } from '../common/Helper';
import Icons from '../common/Icon';

const VideoTitle = () => {
    const [params, setParams] = useState(VIDEO_TITLE_DATA_LIST[0].tabName);
    const router = useRouter();
    const pathname = router.pathname; // Accessing current pathname
    useEffect(() => {
        const typeParam = new URLSearchParams(window.location.search).get("type");
        if (typeParam) {
            setParams(typeParam);
        }
    }, [pathname]); // Adding pathname to dependency array

    const clickHandler = (obj) => {
        const value = obj.replace(/\s+/g, "-");
        router.push(`?type=${value}`, { scroll: false });
        setParams(value);
    };
    return (
        <div className="max-w-[860px] mx-auto px-4 pt-4">
            <p className='text-black font-semibold text-sm md:text-base'>Video Title</p>
            <h2 className='text-xl md:text-2xl font-extrabold text-black py-3 md:py-4'>An Apple a day Keeps the Doctor Away</h2>
            <p className='text-black font-semibold text-sm md:text-base'>Description</p>
            <p className='text-black font-medium text-sm md:text-base py-3 md:py-4'>Having a Grand Slam offer makes it almost impossible to lose. But why? What gives it such an impact? </p>
            <div className="flex w-full my-6">
                {VIDEO_TITLE_DATA_LIST.map((obj, i) => (
                    <div
                        key={i}
                        button={obj.tabName}
                        onClick={() => clickHandler(obj.tabName)}
                        className={`cursor-pointer border w-full py-[9px] flex items-center justify-center gap-1 text-sm font-medium text-center uppercase ${params === obj.tabName
                            ? "text-[#1976D2] text-opacity-100"
                            : "text-black text-opacity-60"
                            }`}
                    >
                        <span>
                            <Icons icon={'star'} />
                        </span>
                        {obj.tabName}
                    </div>
                ))}

            </div>
            <div className='flex flex-col gap-1 ps-3'>
                {VIDEO_TITLE_DATA_LIST.map((obj, i) => {
                    return (
                        <div key={i} className={`${params === obj.tabName ? "block" : "hidden"}`}>
                            <p className={`text-base md:text-md text-red-600`}>
                                {obj.first}
                            </p>
                            <p className={`text-base md:text-md text-white text-opacity-50`}>
                                {obj.firstDescription}
                            </p>
                            <p className={`text-base md:text-md text-red-600 pt-2`}>
                                {obj.second}
                            </p>
                            <p className={`text-base md:text-md text-white text-opacity-50`}>
                                {obj.secondDescription}
                            </p>
                            <p className={`text-base md:text-md text-red-600 pt-2`}>
                                {obj.third}
                            </p>
                            <p className={`text-base md:text-md text-white text-opacity-50`}>
                                {obj.thirdDescription}
                            </p>
                            <p className={`text-base md:text-md text-red-600 pt-2`}>
                                {obj.four}
                            </p>
                            <p className={`text-base md:text-md text-white text-opacity-50`}>
                                {obj.fourDescription}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default VideoTitle

"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { VIDEO_TITLE_DATA_LIST } from '../common/Helper';
import Icons from '../common/Icon';
import Image from 'next/image';

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
            <p className='text-black font-semibold text-sm md:text-base'>Phases</p>
            <div className="flex w-full pt-2.5">
                {VIDEO_TITLE_DATA_LIST.map((obj, i) => (
                    <div
                        key={i}
                        button={obj.tabName}
                        onClick={() => clickHandler(obj.tabName)}
                        className={`cursor-pointer border w-full py-[9px] flex items-center justify-center gap-1 text-sm font-medium text-center uppercase ${params === obj.tabName
                            ? "text-[#1976D2] text-opacity-100 bg-[#F8DADA]"
                            : "text-black text-opacity-60"
                            }`}
                    >
                        <span>
                            <Icons params={params === obj.tabName} icon={'star'} />
                        </span>
                        {obj.tabName}
                    </div>
                ))}

            </div>
            <div className='pt-2.5'>
                {VIDEO_TITLE_DATA_LIST.map((obj, i) => {
                    return (
                        <div key={i} className={`border px-4 md:px-10 lg:px-20 py-6 border-[#595959] ${params === obj.tabName ? "block" : "hidden"}`}>
                            <p className={`text-sm md:text-base text-black font-bold pb-4`}>
                                {obj.first}
                            </p>
                            <Image className='w-full' src={obj.firstImage} width={300} height={200} alt='resume' />
                            <p className={`text-sm md:text-base text-black font-bold py-4`}>
                                {obj.second}
                            </p>
                            <Image className='w-full' src={obj.secondImage} width={300} height={200} alt='resume' />
                            <Image className='w-full max-w-[204px] sm:max-w-[304px] md:max-w-[404px] mx-auto pt-16' src={obj.thirdImage} width={300} height={200} alt='resume' />

                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default VideoTitle

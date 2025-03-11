"use client"
import { useEffect, useRef } from 'react';
import Icons from './Icon';

const PopUp = ({ setShowPopUp, showPopUp, heading, subheading }) => {
    const iframeRef = useRef(null);
    useEffect(() => {
        if (showPopUp) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
            // Pause the video when the popup is closed
            if (iframeRef.current) {
                const iframeSrc = iframeRef.current.src;
                iframeRef.current.src = ""; // Reset iframe source
                iframeRef.current.src = iframeSrc; // Restore iframe source
            }
        }
        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, [showPopUp]);
    return (
        <>
            <div className="min-h-screen bg-black bg-opacity-30 px-4 flex justify-center items-center fixed top-0 start-0 z-[200] w-full">
                <div onClick={() => setShowPopUp(false)} className='absolute top-0 left-0 w-full h-full'></div>
                <div className="max-w-[600px] w-full h-[50vh] sm:h-[60vh] px-3 bg-black z-[300] rounded-2xl border border-green-yellow relative">
                    <span onClick={() => setShowPopUp(false)} className='absolute top-2 end-2 cursor-pointer'>
                        <Icons icon={'circleCross'} />
                    </span>
                    <div className="flex flex-col justify-center items-center w-full h-full">

                        <iframe
                            ref={iframeRef}
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                            title="YouTube video"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="rounded-lg object-cover"
                        ></iframe>

                    </div>
                </div>
            </div>
        </>
    )
}

export default PopUp
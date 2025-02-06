"use client";

import Icons from "../common/Icon";


const initialScenes = [
    { id: "1", timeSpend: "00:00 to 00:15", text: "Let me tell you how I saved a smoker from losing his lungs by stopping the blood in his cough.", button: "Scene Description" },
    { id: "2", timeSpend: "00:16 to 00:30", text: "Let me tell you how I saved a smoker from losing his lungs by stopping the blood in his cough." },
    { id: "3", timeSpend: "00:30 to 00:45", text: "Let me tell you how I saved a smoker from losing his lungs by stopping the blood in his cough." }
];

const DragDropScenes = () => {


    return (
        <div className="bg-[#d9d9d9] min-h-screen">
            <div className="max-w-[860px] mx-auto px-4 py-[60px] flex flex-col gap-6">
                {initialScenes.map((obj, i) => {
                    return (
                        <div key={i} className="flex flex-col gap-6">
                            <div className="flex items-center gap-3">
                                <p className="text-sm text-[#615F5F] font-extrabold text-center font-inter">{obj.timeSpend}</p>
                                <span>
                                    <Icons icon={'dotsMenu'} />
                                </span>
                                <div className="bg-white p-7 rounded-[10px]">
                                    <p className="font-inter text-sm font-extrabold">{obj.text}</p>
                                </div>
                            </div>
                            {obj.button && <button className="text-black bg-white py-3 rounded-[10px] font-inter text-sm font-extrabold duration-300 hover:text-white hover:bg-black">{obj.button}</button>}
                        </div>
                    )
                })}

            </div>
        </div>
    );
};

export default DragDropScenes;

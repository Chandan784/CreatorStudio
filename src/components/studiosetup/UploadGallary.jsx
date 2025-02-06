"use client";
import React, { useState } from "react";
import Icons from "../common/Icon";

const UploadGallery = () => {
    const [images, setImages] = useState([]);

    // Handle file upload
    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map((file) => URL.createObjectURL(file));
        setImages((prev) => [...prev, ...newImages]);
    };

    // Handle camera capture
    const handleCameraCapture = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            const video = document.createElement("video");
            video.srcObject = stream;
            video.play();

            const track = stream.getVideoTracks()[0];
            const imageCapture = new ImageCapture(track);
            const blob = await imageCapture.takePhoto();
            const imageUrl = URL.createObjectURL(blob);

            setImages((prev) => [...prev, imageUrl]);
            track.stop(); // Stop camera after capture
        } catch (error) {
            console.error("Error accessing camera:", error);
        }
    };

    // Remove image from list
    const handleRemoveImage = (imageToRemove) => {
        setImages((prev) => prev.filter((img) => img !== imageToRemove));
    };

    return (
        <div className="max-w-[860px] mx-auto px-4 min-h-screen pt-4 flex flex-col justify-between">
            <div>
                <h2 className="text-[32px] !leading-[120%] text-black font-semibold">
                    Setup Your Studio
                </h2>
                <p className="text-xl !leading-[160%] text-black font-semibold pt-4 pb-7">
                    Upload photos
                </p>
                <div className="flex flex-col md:flex-row gap-[30px]">
                    <label
                        htmlFor="imageupload"
                        className="bg-black w-full cursor-pointer text-center rounded-xl py-3.5 text-white !leading-[137%] font-semibold"
                    >
                        Upload from gallery
                    </label>
                    <input
                        type="file"
                        id="imageupload"
                        accept="image/*"
                        hidden
                        multiple
                        onChange={handleFileUpload}
                    />
                    <button
                        onClick={handleCameraCapture}
                        className="bg-black cursor-pointer w-full text-center rounded-xl py-3.5 text-white !leading-[137%] font-semibold"
                    >
                        Open Camera
                    </button>
                </div>
                <p className="text-xl !leading-[160%] text-black font-semibold pt-4 pb-7">
                    Uploaded images
                </p>
                <div className="grid grid-cols-3 gap-4">
                    {images.map((img, index) => (
                        <div key={index} className="relative">
                            <img src={img} alt={`Uploaded ${index}`} className="w-full h-32 object-cover rounded-lg" />
                            <span
                                className="absolute top-1 cursor-pointer end-1 p-1"
                                onClick={() => handleRemoveImage(img)}
                            >
                                <Icons icon={'circleCross'} />
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex w-full py-8">
                <button className="bg-black cursor-pointer w-full text-center rounded-xl py-3.5 text-white !leading-[137%] font-semibold">
                    Save Studio Information
                </button>
            </div>
        </div>
    );
};

export default UploadGallery;

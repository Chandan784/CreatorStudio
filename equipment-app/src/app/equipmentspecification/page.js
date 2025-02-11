"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const EquipmentSpecification = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const subCategory = searchParams.get("subCategory");
  const model = searchParams.get("model");
  const imageSrc = "/images/camera.jpg"; // Replace with dynamic image

  const [specifications, setSpecifications] = useState({
    megapixels: "",
    sensor: "CMOS",
    focalLength: "",
    iso: "",
  });

  const handleChange = (e) => {
    setSpecifications({ ...specifications, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">Equipment Specification</h2>

      <div className="bg-white p-4 rounded-lg shadow mt-4">
        <div className="flex items-center">
          <div>
            <p className="text-sm font-medium">Equipment Category: {category}</p>
            <p className="text-sm font-medium">Equipment Sub Category: {subCategory}</p>
            <p className="text-sm font-medium">Model Name: {model}</p>
          </div>
          <img src={imageSrc} alt="Equipment" className="w-16 h-16 ml-auto rounded-lg" />
        </div>
      </div>

      {/* Form Fields */}
      <div className="mt-4 space-y-4">
        <div>
          <label className="text-sm font-medium">Megapixels</label>
          <input
            type="text"
            name="megapixels"
            value={specifications.megapixels}
            onChange={handleChange}
            placeholder="Enter"
            className="w-full border rounded p-2 mt-1"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Sensor</label>
          <select
            name="sensor"
            value={specifications.sensor}
            onChange={handleChange}
            className="w-full border rounded p-2 mt-1"
          >
            <option value="CMOS">CMOS</option>
            <option value="CCD">CCD</option>
            <option value="Foveon">Foveon</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium">Focal Length</label>
          <input
            type="text"
            name="focalLength"
            value={specifications.focalLength}
            onChange={handleChange}
            placeholder="Enter"
            className="w-full border rounded p-2 mt-1"
          />
        </div>

        <div>
          <label className="text-sm font-medium">ISO</label>
          <input
            type="text"
            name="iso"
            value={specifications.iso}
            onChange={handleChange}
            placeholder="Enter"
            className="w-full border rounded p-2 mt-1"
          />
        </div>
      </div>

      {/* Save Equipment Button */}
      <button className="w-full mt-6 bg-black text-white py-2 rounded">
        Save Equipment
      </button>
    </div>
  );
};

export default EquipmentSpecification;

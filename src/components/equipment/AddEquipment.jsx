"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const AddEquipment = () => {
    const router = useRouter();
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [model, setModel] = useState("");

  const categories = ["Camera", "Lights", "Teleprompter", "Microphone"];
  const subCategories = {
    Camera: ["Mirrorless Camera", "DSLR Camera", "Cinematic Camera", "Insta-360"],
    Lights: ["Softbox", "LED Panel", "Ring Light"],
    Teleprompter: ["Basic Teleprompter", "Advanced Teleprompter"],
    Microphone: ["Lavalier", "Shotgun", "USB Microphone"],
  };
  const models = {
    Camera: ["Sony Alpha 500", "Sony Alpha 360", "Nikon E550", "Canon D550"],
    Lights: ["Godox LED 600", "Neewer Ring Light"],
    Teleprompter: ["Teleprompter X1", "Teleprompter Pro"],
    Microphone: ["Rode NTG3", "Shure SM7B"],
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">Add Equipment</h2>

      {/* Equipment Category */}
      <div className="mt-4">
        <label className="block text-sm font-medium">Equipment Category</label>
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setSubCategory(""); 
            setModel(""); 
          }}
          className="w-full border rounded p-2 mt-1"
        >
          <option value="">Select Equipment</option>
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      {/* Equipment Sub-Category */}
      {category && (
        <div className="mt-4">
          <label className="block text-sm font-medium">Equipment Sub-Category</label>
          <select
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-full border rounded p-2 mt-1"
          >
            <option value="">Select Sub-Category</option>
            {subCategories[category]?.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Model Name */}
      {subCategory && (
        <div className="mt-4">
          <label className="block text-sm font-medium">Model Name</label>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full border rounded p-2 mt-1"
          >
            <option value="">Select Model</option>
            {models[category]?.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Submit Button */}
      <button onClick={() => router.push("/equipmentspecification")}
        className="w-full mt-6 bg-black text-white py-2 rounded"
        disabled={!category || !subCategory || !model}
      >
        Add Equipment
      </button>
    </div>
  );
};

export default AddEquipment;

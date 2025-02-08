import { icons } from "lucide-react";
import React from "react";
import { FaCamera } from "react-icons/fa";
import { FaLightbulb } from "react-icons/fa";
import { FaMicrophone } from "react-icons/fa";
import { TbAccessible } from "react-icons/tb";
const categories = [
    { name: "Camera", icon: <FaCamera className="text-sky-400"/> },
    { name: "Lights", icon: <FaLightbulb className="text-pink-500"/> },
    { name: "Microphone", icon: <FaMicrophone className="text-green-500 ml-3"/> },
    { name: "Accessories", icon: <TbAccessible className=" text-red-600 ml-4"/>},
  ];

  export default function CategoryCard() {
    return (
      <div className="flex justify-around my-4">
        {categories.map((cat) => (
          <div key={cat.name} className="text-center bg-slate-200 border rounded-md p-2">
            <div className="text-3xl pl-2">{cat.icon}</div>
            <p>{cat.name}</p>
          </div>
        ))}
      </div>
    );
  }

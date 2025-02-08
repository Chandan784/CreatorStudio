import { icons } from "lucide-react";
import React from "react";
import { FaCamera } from "react-icons/fa";
import { FaLightbulb } from "react-icons/fa";
import { FaMicrophone } from "react-icons/fa";
import { TbAccessible } from "react-icons/tb";
const categories = [
    { name: "Camera", icon: <FaCamera /> },
    { name: "Lights", icon: <FaLightbulb /> },
    { name: "Microphone", icon: <FaMicrophone /> },
    { name: "Accessories", icon: <TbAccessible />},
  ];

  export default function CategoryCard() {
    return (
      <div className="flex justify-around my-4">
        {categories.map((cat) => (
          <div key={cat.name} className="text-center">
            <div className="text-3xl">{cat.icon}</div>
            <p>{cat.name}</p>
          </div>
        ))}
      </div>
    );
  }

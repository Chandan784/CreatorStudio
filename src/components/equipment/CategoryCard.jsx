"use client";
import { icons } from "lucide-react";
import React from "react";
import { FaCamera } from "react-icons/fa";
import { FaLightbulb } from "react-icons/fa";
import { FaMicrophone } from "react-icons/fa";
import { TbAccessible } from "react-icons/tb";
import { usePathname, useRouter } from "next/navigation";

const CategoryCard =()=> {
    const router= useRouter();
    const pathname=usePathname();
const categories = [
    { name: "Camera", icon: <FaCamera className="text-sky-400"/>,route:"./addequipment" },
    { name: "Lights", icon: <FaLightbulb className="text-pink-500"/>,route:"./addequipment"},
    { name: "Microphone", icon: <FaMicrophone className="text-green-500 ml-3"/>,route:"./addequipment" },
    { name: "Accessories", icon: <TbAccessible className=" text-red-600 ml-4"/>,route:"./addequipment"  },
  ];

  
    return (
      <div className="flex justify-around my-4">
        {categories.map((cat) => (
          <div key={cat.name} 
          onClick={()=>router.push(cat.route)}
          className={`text-center bg-slate-200 border rounded-md p-2 ${
            pathname === cat.route ? "text-blue-500" : "text-gray-500"
          }`}>
            <div className="text-3xl pl-2">{cat.icon}</div>
            <p>{cat.name}</p>
          </div>
        ))}
      </div>
    );
  }

  export default CategoryCard;

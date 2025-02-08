"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { FiHome, FiShoppingCart, FiAlignJustify } from "react-icons/fi";
import { TbCategoryMinus } from "react-icons/tb";

const BottomNav = () => {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { label: "Home", icon: <FiHome />, route: "/" },
    { label: "Categories", icon: <TbCategoryMinus />, route: "/categories" },
    { label: "My Cart", icon: <FiShoppingCart />, route: "/cart" },
    { label: "More", icon: <FiAlignJustify />, route: "/more" },
  ];

  return (
    <footer className="fixed bottom-0 left-0 w-full bg-white shadow-t p-4 flex justify-between">
      {navItems.map((item, index) => (
        <button
          key={index}
          onClick={() => router.push(item.route)}
          className={`flex flex-col items-center ${
            pathname === item.route ? "text-blue-500" : "text-gray-500"
          }`}
        >
          <div className="text-lg">{item.icon}</div>
          <p className="text-xs mt-1">{item.label}</p>
        </button>
      ))}
    </footer>
  );
};

export default BottomNav;

"use client";
import { useState } from "react";
import { Home, User, Settings, MoreHorizontal } from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar for desktop */}
      <aside
        className={`bg-gradient-to-b from-indigo-500 to-indigo-700 text-white h-full transition-all duration-300 ease-in-out 
          w-20
      hidden lg:block shadow-lg`}
      >
        <nav className="py-5  mt-10">
          <ul className="space-y-4">
            <SidebarItem icon={<Home />} label="Dashboard" isOpen={isOpen} />
            <SidebarItem
              icon={<User />}
              label="Studio Profile"
              isOpen={isOpen}
            />
            <SidebarItem icon={<Settings />} label="Settings" isOpen={isOpen} />
            <SidebarItem
              icon={<MoreHorizontal />}
              label="More"
              isOpen={isOpen}
            />
          </ul>
        </nav>
      </aside>

      {/* Content area */}
      <div className="flex-1 p-5 bg-gray-50">
        {/* Your content goes here */}
      </div>

      {/* Bottom navigation for mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg flex justify-around items-center py-3 z-10">
        <SidebarItem icon={<Home />} label="Dashboard" isOpen={false} />
        <SidebarItem icon={<User />} label="Profile" isOpen={false} />
        <SidebarItem icon={<Settings />} label="Settings" isOpen={false} />
        <SidebarItem icon={<MoreHorizontal />} label="More" isOpen={false} />
      </div>
    </div>
  );
}

// Sidebar Item Component
function SidebarItem({ icon, label, isOpen }) {
  return (
    <li className="flex items-center space-x-4 transition-all duration-200 ease-in-out">
      <a
        href="#"
        className="flex items-center space-x-3 hover:bg-indigo-600 p-2 rounded-md transition-all duration-200 ease-in-out"
      >
        <span className="text-2xl transition-transform transform hover:scale-110">
          {icon}
        </span>
        {isOpen && (
          <span className="text-sm font-medium transition-all duration-300 ease-in-out">
            {label}
          </span>
        )}
      </a>
    </li>
  );
}

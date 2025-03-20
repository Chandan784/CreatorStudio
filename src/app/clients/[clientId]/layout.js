"use client";

import { useRouter, usePathname } from "next/navigation";
import {
  UserCog,
  Clock,
  FileText,
  PlusCircle,
  CreditCard,
  Settings,
  ChevronLeft,
  Menu,
} from "lucide-react";
import { useState } from "react";

const sidebarOptions = [
  { icon: <UserCog className="w-6 h-6" />, title: "Details", path: "details" },
  { icon: <Clock className="w-6 h-6" />, title: "Tracker", path: "tracker" },
  {
    icon: <FileText className="w-6 h-6" />,
    title: "View Plan",
    path: "view-plan",
  },
  {
    icon: <PlusCircle className="w-6 h-6" />,
    title: "Create Plan",
    path: "create-plan",
  },
  {
    icon: <CreditCard className="w-6 h-6" />,
    title: "Transactions",
    path: "transactions",
  },
  {
    icon: <Settings className="w-6 h-6" />,
    title: "Settings",
    path: "settings",
  },
];

export default function DashboardLayout({ children, params }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Extract clientId from params
  const { clientId } = params;

  // Get the active route
  const activeRoute = pathname.split("/").pop();

  return (
    <div className="flex min-h-screen bg-gray-100 mt-12">
      {/* Sidebar */}
      <div
        className={`bg-white shadow-lg transition-all duration-300 p-6 ${
          isSidebarOpen ? "w-64" : "w-20"
        } hidden md:flex flex-col relative`}
      >
        {/* Sidebar Toggle Button */}
        <button
          className="absolute -right-4 top-6 bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300 transition"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? (
            <ChevronLeft className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>

        {/* Sidebar Navigation */}
        <ul className="space-y-4">
          {sidebarOptions.map((option, index) => (
            <li
              key={index}
              className={`flex items-center p-3 rounded-lg transition cursor-pointer ${
                activeRoute === option.path
                  ? "bg-purple-600 text-white"
                  : "hover:bg-purple-100"
              }`}
              onClick={() => router.push(`/clients/${clientId}/${option.path}`)}
            >
              {option.icon}
              {isSidebarOpen && (
                <span className="ml-3 whitespace-nowrap">{option.title}</span>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {/* Page Content */}
        <div className="bg-white p-6 rounded-lg shadow-sm">{children}</div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 flex justify-around md:hidden">
        {sidebarOptions.map((option, index) => (
          <div
            key={index}
            className={`flex flex-col items-center cursor-pointer ${
              activeRoute === option.path ? "text-purple-600" : "text-gray-600"
            }`}
            onClick={() => router.push(`/clients/${clientId}/${option.path}`)}
          >
            {option.icon}
            <span className="text-xs mt-1">{option.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

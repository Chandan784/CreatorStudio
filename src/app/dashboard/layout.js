"use client";

import { useRouter, usePathname } from "next/navigation";
import {
  Home,
  Calendar,
  Settings,
  Film,
  CreditCard,
  BarChart2,
  Menu,
  ChevronLeft,
} from "lucide-react";
import { useState } from "react";
import Overview from "./overview/page";
import Appointments from "@/app/dashboard/appointments/page";
import Transactions from "@/app/dashboard/transactions/page";
import Recharge from "@/app/dashboard/recharge/page";
import SettingsPage from "@/app/dashboard/settings/page";
import Tracker from "@/app/dashboard/tracker/page";
import ProjectDetails from "./project-details/[projectId]/page";

const sidebarOptions = [
  {
    icon: <Home className="w-6 h-6" />,
    title: "Overview",
    path: "/dashboard/overview",
  },
  {
    icon: <BarChart2 className="w-6 h-6" />,
    title: "Tracker",
    path: "/dashboard/tracker",
  },
  {
    icon: <Calendar className="w-6 h-6" />,
    title: "Appointments",
    path: "/dashboard/appointments",
  },
  {
    icon: <Film className="w-6 h-6" />,
    title: "Transactions",
    path: "/dashboard/transactions",
  },
  {
    icon: <CreditCard className="w-6 h-6" />,
    title: "Recharge",
    path: "/dashboard/recharge",
  },
  {
    icon: <Settings className="w-6 h-6" />,
    title: "Settings",
    path: "/dashboard/settings",
  },
];

export default function DashboardLayout() {
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Function to determine the active page component
  const getActivePage = () => {
    switch (pathname) {
      case "/dashboard/overview":
        return <Overview />;
      case "/dashboard/tracker":
        return <Tracker />;
      case "/dashboard/appointments":
        return <Appointments />;
      case "/dashboard/transactions":
        return <Transactions />;
      case "/dashboard/recharge":
        return <Recharge />;
      case "/dashboard/settings":
        return <SettingsPage />;
      case `/dashboard/project-details/6464`:
        return <ProjectDetails />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className=" mt-20 flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`bg-white shadow-lg transition-all duration-300 p-6 ${
          isSidebarOpen ? "w-64" : "w-24"
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

        {/* Sidebar Title (Visible when expanded) */}
        {isSidebarOpen && <h2 className="text-xl font-bold mb-6">Dashboard</h2>}

        {/* Sidebar Navigation */}
        <ul className="space-y-4">
          {sidebarOptions.map((option, index) => (
            <li
              key={index}
              className={`flex items-center p-3 rounded-lg transition cursor-pointer ${
                pathname === option.path
                  ? "bg-purple-600 text-white"
                  : "hover:bg-purple-100"
              }`}
              onClick={() => router.push(option.path)}
            >
              {option.icon}
              {isSidebarOpen && <span className="ml-3">{option.title}</span>}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content - Expands when Sidebar is Collapsed */}
      <div className={`p-6   transition-all duration-300 flex-1`}>
        {getActivePage()}
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 flex justify-around md:hidden">
        {sidebarOptions.map((option, index) => (
          <div
            key={index}
            className={`flex flex-col items-center cursor-pointer ${
              pathname === option.path ? "text-purple-600" : "text-gray-600"
            }`}
            onClick={() => router.push(option.path)}
          >
            {option.icon}
            <span className="text-xs mt-1">{option.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

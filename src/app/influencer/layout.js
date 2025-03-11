"use client";

import { useRouter, usePathname } from "next/navigation";
import {
  Home,
  Settings,
  FileText,
  CreditCard,
  Menu,
  ChevronLeft,
  LayoutDashboard,
  Activity, // Icon for Tracker
  DollarSign, // Icon for Transactions
} from "lucide-react";
import { useState } from "react";
import Overview from "./overview/page";
import Appointments from "@/app/influencer/appointments/page";
import Transactions from "@/app/influencer/transactions/page";
import SettingsPage from "@/app/influencer/settings/page";
import Tracker from "@/app/creator/tracker/page";
import InfluencerRequirementForm from "@/components/layout/InfluencerDetailsForm";
import InFluencerRequirement from "./requirement/page";

const sidebarOptions = [
  {
    icon: <Home className="w-6 h-6" />,
    title: "Home",
    path: "/influencer/home",
  },
  {
    icon: <LayoutDashboard className="w-6 h-6" />,
    title: "Dashboard",
    path: "/influencer/dashboard",
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: "Requirement",
    path: "/influencer/requirement",
  },
  {
    icon: <CreditCard className="w-6 h-6" />,
    title: "Payments",
    path: "/influencer/payments",
  },
  {
    icon: <Activity className="w-6 h-6" />, // Icon for Tracker
    title: "Tracker",
    path: "/influencer/tracker",
  },
  {
    icon: <DollarSign className="w-6 h-6" />,
    title: "Transactions",
    path: "/influencer/transactions",
  },
  {
    icon: <Settings className="w-6 h-6" />,
    title: "Settings",
    path: "/influencer/settings",
  },
];

export default function DashboardLayout() {
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Function to determine the active page component
  const getActivePage = () => {
    switch (pathname) {
      case "/influencer/home":
        return <Overview />;
      case "/influencer/dashboard":
        return <Tracker />;
      case "/influencer/tracker":
        return <Tracker />;
      case "/influencer/requirement":
        return <InFluencerRequirement />;
      case "/influencer/payments":
        return <SettingsPage />;
      case "/influencer/transactions":
        return <Transactions />;
      case "/influencer/settings":
        return <SettingsPage />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="mt-20 flex min-h-screen bg-gray-100">
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
            <li key={index}>
              <div
                className={`flex items-center p-3 rounded-lg transition cursor-pointer ${
                  pathname === option.path
                    ? "bg-purple-600 text-white"
                    : "hover:bg-purple-100"
                }`}
                onClick={() => router.push(option.path)}
              >
                {option.icon}
                {isSidebarOpen && <span className="ml-3">{option.title}</span>}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content - Expands when Sidebar is Collapsed */}
      <div className={`p-6 transition-all duration-300 flex-1`}>
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

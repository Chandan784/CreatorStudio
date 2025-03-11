"use client";

import { useRouter, usePathname } from "next/navigation";
import {
  Home,
  BarChart2,
  Users,
  CreditCard,
  Settings,
  Menu,
  ChevronLeft,
  ClipboardList,
  FileText, // Icon for Requirement
} from "lucide-react";
import { useState } from "react";
import AgencyDashboard from "./dashboard/page"; // Import your components
import AgencyTrack from "./track/page";
import AgencyLeads from "./leads/page";
import AgencyClients from "./clients/page";
import AgencyPayments from "./payment/page";
import AgencyHome from "./home/page";
import AgencySettings from "./settings/page";
import AgencyRequirement from "./requirement/page"; // Import the Requirement component

// Sidebar options
const sidebarOptions = [
  {
    icon: <Home className="w-6 h-6" />,
    title: "Home",
    path: "/agency/home",
  },
  {
    icon: <ClipboardList className="w-6 h-6" />,
    title: "Dashboard",
    path: "/agency/dashboard",
  },
  {
    icon: <BarChart2 className="w-6 h-6" />,
    title: "Track",
    path: "/agency/track",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Leads",
    path: "/agency/leads",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Clients",
    path: "/agency/clients",
  },
  {
    icon: <FileText className="w-6 h-6" />, // Icon for Requirement
    title: "Requirement",
    path: "/agency/requirement",
  },
  {
    icon: <CreditCard className="w-6 h-6" />,
    title: "Payments",
    path: "/agency/payments",
  },
  {
    icon: <Settings className="w-6 h-6" />,
    title: "Settings",
    path: "/agency/settings",
  },
];

export default function DashboardLayout() {
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Function to determine the active page component
  const getActivePage = () => {
    switch (pathname) {
      case "/agency/home":
        return <AgencyHome />; // Replace with your Home component
      case "/agency/dashboard":
        return <AgencyDashboard />;
      case "/agency/track":
        return <AgencyTrack />;
      case "/agency/leads":
        return <AgencyLeads />;
      case "/agency/clients":
        return <AgencyClients />;
      case "/agency/requirement": // Handle the Requirement route
        return <AgencyRequirement />;
      case "/agency/payments":
        return <AgencyPayments />;
      case "/agency/settings":
        return <AgencySettings />;
      default:
        return <AgencyHome />;
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

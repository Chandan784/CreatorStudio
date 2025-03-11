"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  ChevronLeft,
  Menu,
  FormInputIcon,
} from "lucide-react";
import BusinessDashboardPage from "./dashboard/page";
import BusinessRequirementPage from "./requirement/page";
import { Provider } from "react-redux";
import store from "@/store/store";

export default function DashboardLayout() {
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Define sidebar options
  const sidebarOptions = [
    {
      icon: LayoutDashboard, // Store the component, not the JSX
      title: "Business",
      path: "/business/dashboard",
    },
    {
      icon: FormInputIcon, // Store the component, not the JSX
      title: "Requirement",
      path: "/business/requirement",
    },
  ];

  // Function to determine the active page component
  const getActivePage = () => {
    switch (pathname) {
      case "/business/dashboard":
        return <BusinessDashboardPage />;
      case "/business/requirement":
        return <BusinessRequirementPage />;
      default:
        return <BusinessDashboardPage />;
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
          {sidebarOptions.map((option, index) => {
            const IconComponent = option.icon; // Dynamically render the icon component
            return (
              <li key={index}>
                <div
                  className={`flex items-center p-3 rounded-lg transition cursor-pointer ${
                    pathname === option.path
                      ? "bg-purple-600 text-white"
                      : "hover:bg-purple-100"
                  }`}
                  onClick={() => router.push(option.path)}
                >
                  <IconComponent className="w-6 h-6" /> {/* Render the icon */}
                  {isSidebarOpen && (
                    <span className="ml-3">{option.title}</span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Main Content */}
      <div className={`p-6 transition-all duration-300 flex-1`}>
        <Provider store={store}>{getActivePage()}</Provider>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 flex justify-around md:hidden">
        {sidebarOptions.map((option, index) => {
          const IconComponent = option.icon; // Dynamically render the icon component
          return (
            <div
              key={index}
              className={`flex flex-col items-center cursor-pointer ${
                pathname === option.path ? "text-purple-600" : "text-gray-600"
              }`}
              onClick={() => router.push(option.path)}
            >
              <IconComponent className="w-6 h-6" /> {/* Render the icon */}
              <span className="text-xs mt-1">{option.title}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

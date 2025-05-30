"use client";
import { Suspense } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  LayoutDashboard,
  MoreHorizontal,
  Activity,
  Menu,
  ChevronLeft,
} from "lucide-react";
import { useState } from "react";
import CreatorDashboardPage from "./dashboard/page";
import CreatorDetailsPgae from "./details/page";
import CreatorTrackerPage from "./tracker/page";
import CreatorPlansPage from "./plan/page";
import CreatorProjectDetailsPage from "./project-details/page";
import {useSelector} from "react-redux";
import NotLoggedIn from "@/components/layout/NotLoggedIn";


const sidebarOptions = [
  {
    icon: <LayoutDashboard className="w-6 h-6" />,
    title: "Dashboard",
    path: "/creator/dashboard",
  },
  {
    icon: <MoreHorizontal className="w-6 h-6" />,
    title: "Details",
    path: "/creator/details",
  },
  {
    icon: <Activity className="w-6 h-6" />,
    title: "Plan",
    path: "/creator/plan",
  },
];



function DashboardLayoutContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const planId = searchParams.get("planId");
  const projectId = searchParams.get("projectId");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  let {isLoggedIn} = useSelector( (state) => state.auth)
  if(!isLoggedIn) {
    return <NotLoggedIn />
  }
    
  
 

  const getActivePage = () => {
    
    switch (pathname) {
      case "/creator/dashboard":
        return <CreatorDashboardPage />;
      case "/creator/details":
        return <CreatorDetailsPgae />;
      case "/creator/plan":
        return <CreatorPlansPage />;
      case "/creator/tracker":
        return <CreatorTrackerPage planId={planId} />;
      case "/creator/project-details":
        return <CreatorProjectDetailsPage projectId={projectId} />;
      default:
        return <CreatorDashboardPage />;
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

        {isSidebarOpen && <h2 className="text-xl font-bold mb-6">Dashboard</h2>}

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

      <div className={`p-6 transition-all duration-300 flex-1`}>
        {getActivePage()}
      </div>

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

export default function DashboardLayout() {
  return (
    <Suspense fallback={<div className="mt-20 p-6">Loading dashboard...</div>}>
      <DashboardLayoutContent />
    </Suspense>
  );
}

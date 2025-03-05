"use client";

import { usePathname } from "next/navigation"; // Next.js router hook
import Sidebar from "@/components/layout/Sidebar";
import Dashboard from "./dashboard/page";
import Authentication from "./auth/page";
import StudioList from "./studioList/page";
import StudioOnboardingForm from "./studio-owner/studioOnboard/page";
import HomePage from "./home/page";

// Example of another page

export default function AppPage() {
  const pathName = usePathname();

  // Function to determine which component to render
  const renderComponent = () => {
    if (pathName.startsWith("/")) {
      return <HomePage />;
    } else if (pathName.startsWith("/dashboard")) {
      return <Dashboard />;
    } else if (pathName.startsWith("/auth")) {
      return <Authentication />;
    } else if (pathName.startsWith("/studioOnboard")) {
      return <StudioOnboardingForm />;
    } else if (pathName.startsWith("/studioList")) {
      return <StudioList />;
    }
  };

  return (
    <div className="w-full flex">
      {/* Sidebar Component */}

      {/* Render the main content dynamically based on the path */}
      <div className="w-full  p-4">{renderComponent()}</div>
    </div>
  );
}

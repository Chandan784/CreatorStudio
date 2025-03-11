"use client";
import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function AdminDashboard() {
  // Dummy data for charts
  const usersData = {
    labels: ["Users", "Studio Owners", "Admins"],
    datasets: [
      {
        label: "Number of Users",
        data: [120, 50, 10], // Example data
        backgroundColor: ["#3b82f6", "#f59e0b", "#10b981"],
      },
    ],
  };

  const revenueData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenue (in $)",
        data: [5000, 7000, 3000, 9000, 6000, 4000], // Example data
        backgroundColor: "#3b82f6",
      },
    ],
  };

  const pieData = {
    labels: ["Active Users", "Inactive Users"],
    datasets: [
      {
        data: [85, 15], // Example data
        backgroundColor: ["#3b82f6", "#f59e0b"],
      },
    ],
  };

  return (
    <div className="flex-1 p-8">
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-8 text-blue-600">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-700">Total Users</h2>
          <p className="text-3xl font-bold text-blue-600">1,200</p>
          <p className="text-sm text-gray-500">+5.2% from last month</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-700">Total Revenue</h2>
          <p className="text-3xl font-bold text-green-600">$45,000</p>
          <p className="text-sm text-gray-500">+12.4% from last month</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-700">
            Active Projects
          </h2>
          <p className="text-3xl font-bold text-purple-600">48</p>
          <p className="text-sm text-gray-500">+8.7% from last month</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bar Chart - Revenue */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Monthly Revenue</h2>
          <Bar
            data={revenueData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
              },
            }}
          />
        </div>

        {/* Pie Chart - User Distribution */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">User Distribution</h2>
          <Pie
            data={pieData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
              },
            }}
          />
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white rounded-lg shadow p-6 mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <table className="w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">User</th>
              <th className="p-3 text-left">Action</th>
              <th className="p-3 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-200 hover:bg-gray-50">
              <td className="p-3">John Doe</td>
              <td className="p-3">Updated profile</td>
              <td className="p-3">2023-10-01</td>
            </tr>
            <tr className="border-b border-gray-200 hover:bg-gray-50">
              <td className="p-3">Jane Smith</td>
              <td className="p-3">Created a new project</td>
              <td className="p-3">2023-10-02</td>
            </tr>
            <tr className="border-b border-gray-200 hover:bg-gray-50">
              <td className="p-3">Admin User</td>
              <td className="p-3">Deleted a user</td>
              <td className="p-3">2023-10-03</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

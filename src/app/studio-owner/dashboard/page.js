"use client";

import React from "react";
import { Calendar, DollarSign, Bell, Plus, Settings } from "lucide-react";
import ProgressBar from "@/components/common/ProgressBar";
import { useRouter } from "next/navigation";

export default function StudioOwnerDashboard() {
  let router = useRouter();
  // Sample data
  const studioDetails = {
    name: "Sunset Studios",
    location: "Mumbai, India",
    facilities: ["2 Shooting Floors", "Green Room", "Makeup Room"],
  };

  const bookings = [
    {
      id: 1,
      influencer: "Influencer A",
      date: "2023-10-15",
      status: "Confirmed",
    },
    {
      id: 2,
      influencer: "Influencer B",
      date: "2023-10-16",
      status: "Pending",
    },
  ];

  const earnings = {
    totalEarnings: 25000,
    pendingPayments: 5000,
  };

  const notifications = [
    {
      id: 1,
      message: "New booking request from Influencer C",
      date: "2 hours ago",
    },
    { id: 2, message: "Payment received for booking #123", date: "1 day ago" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6 mt-16">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Studio Owner Dashboard
        </h1>
        <div className="flex items-center space-x-4">
          <Bell className="w-6 h-6 text-gray-600 cursor-pointer" />
          <Settings
            onClick={() => router.push("/studio-owner/setting")}
            className="w-6 h-6 text-gray-600 cursor-pointer"
          />
        </div>
      </div>

      {/* Studio Details */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Studio Details</h2>
        <div className="space-y-2">
          <p className="text-gray-600">
            <span className="font-semibold">Name:</span> {studioDetails.name}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Location:</span>{" "}
            {studioDetails.location}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Facilities:</span>{" "}
            {studioDetails.facilities.join(", ")}
          </p>
        </div>
      </div>

      {/* Earnings */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Earnings</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-3xl font-bold text-purple-600">
              ₹{earnings.totalEarnings}
            </p>
            <p className="text-gray-500">Total Earnings</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-pink-500">
              ₹{earnings.pendingPayments}
            </p>
            <p className="text-gray-500">Pending Payments</p>
          </div>
        </div>
      </div>

      {/* Bookings */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Bookings</h2>
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
            >
              <div>
                <p className="text-gray-800 font-semibold">
                  {booking.influencer}
                </p>
                <p className="text-gray-500 text-sm">{booking.date}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  booking.status === "Confirmed"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {booking.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Notifications</h2>
        <ul className="space-y-4">
          {notifications.map((notification) => (
            <li key={notification.id} className="flex items-center">
              <Bell className="w-5 h-5 text-purple-600 mr-2" />
              <div>
                <p className="text-gray-800">{notification.message}</p>
                <p className="text-gray-500 text-sm">{notification.date}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all">
            <Plus className="w-6 h-6 text-purple-600 mr-2" />
            <span className="text-gray-800">Add Studio</span>
          </button>
          <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all">
            <Calendar className="w-6 h-6 text-purple-600 mr-2" />
            <span className="text-gray-800">Manage Bookings</span>
          </button>
        </div>
      </div>
    </div>
  );
}

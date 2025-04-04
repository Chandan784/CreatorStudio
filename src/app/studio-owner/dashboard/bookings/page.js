"use client"; // Mark as a Client Component

import React, { useState, useEffect } from "react";
import axios from "axios";

export default function StudioOwnerBookingPage() {
  const [bookings, setBookings] = useState([]); // Store bookings from the backend
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state

  // State for filtering bookings
  const [filterDate, setFilterDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // Fetch bookings from the backend
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/bookings`
        );
        if (response.data.success) {
          setBookings(response.data.bookings);
        } else {
          setError("Failed to fetch bookings.");
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setError("Failed to fetch bookings. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Handle booking status change (approve, reject, cancel)
  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/bookings/${bookingId}`,
        {
          status: newStatus,
        }
      );

      if (response.data.success) {
        // Update the local state with the new status
        setBookings((prev) =>
          prev.map((booking) =>
            booking._id === bookingId
              ? { ...booking, status: newStatus }
              : booking
          )
        );
      } else {
        setError("Failed to update booking status.");
      }
    } catch (error) {
      console.error("Error updating booking status:", error);
      setError("Failed to update booking status. Please try again.");
    }
  };

  // Filtered bookings based on date and status
  const filteredBookings = bookings.filter((booking) => {
    const matchesDate = filterDate
      ? booking.date.split("T")[0] === filterDate
      : true;
    const matchesStatus = filterStatus ? booking.status === filterStatus : true;
    return matchesDate && matchesStatus;
  });

  if (loading) {
    return <div className="p-6 text-center text-gray-700">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto font-sans mt-20">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">
        Booking Management
      </h1>

      {/* Filters */}
      <div className="mb-6 flex space-x-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Date
          </label>
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Status
          </label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                User
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Date
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Time Slot
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Status
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((booking) => (
              <tr key={booking._id} className="border-b border-gray-200">
                <td className="px-4 py-2 text-sm text-gray-700">
                  {booking.userId.name} {/* User name */}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {new Date(booking.date).toLocaleDateString()}{" "}
                  {/* Format date */}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {booking.timeSlots
                    .map((slot) => `${slot.startTime} - ${slot.endTime}`)
                    .join(", ")}{" "}
                  {/* Display time slots */}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  <span
                    className={`px-2 py-1 rounded-md text-xs font-medium ${
                      booking.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : booking.status === "approved"
                        ? "bg-green-100 text-green-800"
                        : booking.status === "rejected"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {booking.status} {/* Display status */}
                  </span>
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {booking.status === "pending" && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() =>
                          handleStatusChange(booking._id, "approved")
                        }
                        className="bg-green-500 text-white px-3 py-1 rounded-md text-sm hover:bg-green-600 transition duration-300"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() =>
                          handleStatusChange(booking._id, "rejected")
                        }
                        className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600 transition duration-300"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                  {booking.status === "approved" && (
                    <button
                      onClick={() =>
                        handleStatusChange(booking._id, "cancelled")
                      }
                      className="bg-gray-500 text-white px-3 py-1 rounded-md text-sm hover:bg-gray-600 transition duration-300"
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

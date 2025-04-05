"use client"; // Mark as a Client Component

import React, { useState, useEffect } from "react";
import axios from "axios";

export default function UserBookingsPage() {
  const [bookings, setBookings] = useState([]); // Store bookings from the backend
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state
  let userId = "67c2e9936b645b011c0d0533";
  // Fetch bookings from the backend
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/bookings/user/${userId}`
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

  // Handle booking cancellation
  const handleCancelBooking = async (bookingId) => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/bookings/${bookingId}`,
        {
          status: "cancelled",
        }
      );

      if (response.data.success) {
        // Update the local state with the new status
        setBookings((prev) =>
          prev.map((booking) =>
            booking._id === bookingId
              ? { ...booking, status: "cancelled" }
              : booking
          )
        );
      } else {
        setError("Failed to cancel booking.");
      }
    } catch (error) {
      console.error("Error cancelling booking:", error);
      setError("Failed to cancel booking. Please try again.");
    }
  };

  if (loading) {
    return <div className="p-6 text-center text-gray-700">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto font-sans mt-16">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">
        My Bookings
      </h1>

      {/* Bookings Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Studio
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
            {bookings.map((booking) => (
              <tr key={booking._id} className="border-b border-gray-200">
                <td className="px-4 py-2 text-sm text-gray-700">
                  {booking.studioId.name} {/* Studio name */}
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
                    <button
                      onClick={() => handleCancelBooking(booking._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600 transition duration-300"
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

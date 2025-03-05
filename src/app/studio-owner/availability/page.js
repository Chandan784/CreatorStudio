"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

// Generate slots based on start and end hours
function generateSlots(startHour, endHour) {
  const slots = [];
  for (let hour = startHour; hour < endHour; hour++) {
    slots.push({
      startTime: `${hour.toString().padStart(2, "0")}:00`, // HH:00
      endTime: `${(hour + 1).toString().padStart(2, "0")}:00`, // HH+1:00
      booked: false,
      enabled: true,
    });
  }
  return slots;
}

// Default availability
const defaultAvailability = {
  startHour: 9,
  endHour: 17,
  isDayOff: false,
  slots: generateSlots(9, 17),
};

export default function AvailabilityPage() {
  const [availability, setAvailability] = useState(defaultAvailability);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [studioId, setStudioId] = useState("67c46d65da4907ebf654aacf");
  const [loading, setLoading] = useState(false);
  const [dayData, setDayData] = useState(defaultAvailability);
  const [error, setError] = useState("");

  // Get the day of the week for the selected date
  const getDayOfWeek = (date) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[new Date(date).getDay()];
  };

  const selectedDay = getDayOfWeek(selectedDate);

  // Fetch availability for the selected date
  useEffect(() => {
    const fetchAvailability = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/availability/${studioId}/${selectedDate}`
        );

        if (response.data && response.data.success) {
          // Update dayData with the response from the backend
          setDayData(response.data.dayData);
        } else {
          // Use default availability if no data is found
          setDayData(defaultAvailability);
        }
      } catch (error) {
        console.error("Error fetching availability:", error);
        setError("Failed to fetch availability. Using default settings.");
        setDayData(defaultAvailability); // Use default on error
      } finally {
        setLoading(false);
      }
    };

    fetchAvailability();
  }, [selectedDate, studioId]);

  // Toggle slot availability
  const toggleSlotAvailability = (slotIndex) => {
    setDayData((prev) => ({
      ...prev,
      slots: prev.slots.map((slot, index) =>
        index === slotIndex ? { ...slot, enabled: !slot.enabled } : slot
      ),
    }));
  };

  // Toggle day off
  const toggleDayOff = () => {
    setDayData((prev) => ({
      ...prev,
      isDayOff: !prev.isDayOff,
    }));
  };

  // Save availability
  const handleSave = async () => {
    setLoading(true);
    setError("");
    try {
      const payload = {
        studioId,
        date: selectedDate,
        startHour: dayData.startHour,
        endHour: dayData.endHour,
        isDayOff: dayData.isDayOff,
        slots: dayData.slots,
      };

      const response = await axios.post(
        `http://localhost:8000/api/v1/availability`,
        payload
      );

      if (response.data.success) {
        alert(`Availability updated for ${selectedDate}!`);
      } else {
        setError("Failed to update availability. Please try again.");
      }
    } catch (error) {
      console.error("Error saving availability:", error);
      setError(
        error.response?.data?.message ||
          "Failed to update availability. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto font-sans mt-16">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">
        Availability Management
      </h1>

      {/* Date Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Date
        </label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Loading and Error Messages */}
      {loading && <p className="text-center text-blue-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Availability Settings */}
      <div className="p-4 bg-white rounded-lg shadow-md border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-700">{selectedDay}</h2>
          <button
            onClick={toggleDayOff}
            className={`px-4 py-2 rounded-md ${
              dayData.isDayOff
                ? "bg-red-500 text-white"
                : "bg-green-500 text-white"
            }`}
          >
            {dayData.isDayOff ? "Day Off" : "Working Day"}
          </button>
        </div>

        {!dayData.isDayOff && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {dayData.slots.map((slot, slotIndex) => (
              <div
                key={slotIndex}
                onClick={() => toggleSlotAvailability(slotIndex)}
                className={`p-3 rounded-md cursor-pointer ${
                  slot.enabled
                    ? "bg-green-100 hover:bg-green-200"
                    : "bg-red-100 hover:bg-red-200"
                }`}
              >
                <span className="text-sm font-medium text-gray-700">
                  {slot.startTime} - {slot.endTime}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Save Button */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={handleSave}
          disabled={loading}
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? "Saving..." : "Save Availability"}
        </button>
      </div>
    </div>
  );
}

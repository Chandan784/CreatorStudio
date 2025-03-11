"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

// Generate slots based on start and end hours with a default lunch break
function generateSlots(startHour, endHour) {
  const slots = [];
  for (let hour = startHour; hour < endHour; hour++) {
    const isLunchBreak = hour === 13; // 1 PM to 2 PM is lunch break
    slots.push({
      startTime: `${hour.toString().padStart(2, "0")}:00`, // HH:00
      endTime: `${(hour + 1).toString().padStart(2, "0")}:00`, // HH+1:00
      booked: false,
      enabled: !isLunchBreak, // Disable lunch break by default
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

// Generate dates for the current month
const generateDatesForMonth = (year, month) => {
  const dates = [];
  const date = new Date(year, month, 1);
  while (date.getMonth() === month) {
    dates.push(new Date(date).toISOString().split("T")[0]);
    date.setDate(date.getDate() + 1);
  }
  return dates;
};

export default function StudioAvailabilityPage() {
  const [availability, setAvailability] = useState(defaultAvailability);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [studioId, setStudioId] = useState("67c46d65da4907ebf654aacf");
  const [loading, setLoading] = useState(false);
  const [dayData, setDayData] = useState({});
  const [error, setError] = useState("");
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Generate dates for the current month
  const datesForMonth = generateDatesForMonth(
    currentMonth.getFullYear(),
    currentMonth.getMonth()
  );

  // Fetch availability for all dates in the month
  useEffect(() => {
    const fetchAvailabilityForMonth = async () => {
      setLoading(true);
      setError("");
      try {
        const responses = await Promise.all(
          datesForMonth.map((date) =>
            axios.get(
              `http://localhost:8000/api/v1/availability/${studioId}/${date}`
            )
          )
        );

        const availabilityData = {};
        responses.forEach((response, index) => {
          const date = datesForMonth[index];
          if (response.data && response.data.success) {
            availabilityData[date] = response.data.dayData;
          } else {
            availabilityData[date] = defaultAvailability;
          }
        });
        setDayData(availabilityData);
      } catch (error) {
        console.error("Error fetching availability:", error);
        setError("Failed to fetch availability. Using default settings.");
      } finally {
        setLoading(false);
      }
    };

    fetchAvailabilityForMonth();
  }, [currentMonth, studioId]);

  // Toggle slot availability for a specific date
  const toggleSlotAvailability = (date, slotIndex) => {
    setDayData((prev) => ({
      ...prev,
      [date]: {
        ...prev[date],
        slots: prev[date].slots.map((slot, index) =>
          index === slotIndex ? { ...slot, enabled: !slot.enabled } : slot
        ),
      },
    }));
  };

  // Toggle day off for a specific date
  const toggleDayOff = (date) => {
    setDayData((prev) => ({
      ...prev,
      [date]: {
        ...prev[date],
        isDayOff: !prev[date].isDayOff,
      },
    }));
  };

  // Save availability for all dates
  const handleSave = async () => {
    setLoading(true);
    setError("");
    try {
      const payload = Object.keys(dayData).map((date) => ({
        studioId,
        date,
        startHour: dayData[date].startHour,
        endHour: dayData[date].endHour,
        isDayOff: dayData[date].isDayOff,
        slots: dayData[date].slots,
      }));

      const response = await axios.post(
        `http://localhost:8000/api/v1/availability/bulk`,
        payload
      );

      if (response.data.success) {
        alert("Availability updated for the month!");
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
    <div className="p-6 max-w-7xl mx-auto font-sans mt-16">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">
        Availability Management
      </h1>

      {/* Month Navigation */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() =>
            setCurrentMonth(
              new Date(
                currentMonth.getFullYear(),
                currentMonth.getMonth() - 1,
                1
              )
            )
          }
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Previous Month
        </button>
        <h2 className="text-xl font-semibold text-gray-700">
          {currentMonth.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <button
          onClick={() =>
            setCurrentMonth(
              new Date(
                currentMonth.getFullYear(),
                currentMonth.getMonth() + 1,
                1
              )
            )
          }
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Next Month
        </button>
      </div>

      {/* Loading and Error Messages */}
      {loading && <p className="text-center text-blue-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Date Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {datesForMonth.map((date) => (
          <div
            key={date}
            className="p-4 bg-white rounded-lg shadow-md border border-gray-200"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-700">
                {new Date(date).toLocaleDateString("en-US", {
                  weekday: "short",
                  day: "numeric",
                })}
              </h2>
              <button
                onClick={() => toggleDayOff(date)}
                className={`px-4 py-2 rounded-md ${
                  dayData[date]?.isDayOff
                    ? "bg-red-500 text-white"
                    : "bg-green-500 text-white"
                }`}
              >
                {dayData[date]?.isDayOff ? "Day Off" : "Working Day"}
              </button>
            </div>

            {!dayData[date]?.isDayOff && (
              <div className="grid grid-cols-2 gap-2">
                {dayData[date]?.slots.map((slot, slotIndex) => (
                  <div
                    key={slotIndex}
                    onClick={() => toggleSlotAvailability(date, slotIndex)}
                    className={`p-2 rounded-md cursor-pointer ${
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
        ))}
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

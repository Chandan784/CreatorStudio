"use client"; // Mark as a Client Component

import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function EarningsReportPage() {
  // Sample earnings data (replace with API data)
  const [earningsData, setEarningsData] = useState([
    { date: "2023-10-01", earnings: 200, bookings: 5 },
    { date: "2023-10-02", earnings: 300, bookings: 7 },
    { date: "2023-10-03", earnings: 150, bookings: 3 },
    { date: "2023-10-04", earnings: 400, bookings: 8 },
    { date: "2023-10-05", earnings: 250, bookings: 6 },
  ]);

  // State for date range filter
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Filter earnings data by date range
  const filteredEarningsData = earningsData.filter((entry) => {
    const entryDate = new Date(entry.date);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    if (start && entryDate < start) return false;
    if (end && entryDate > end) return false;
    return true;
  });

  // Calculate total earnings, total bookings, and average earnings
  const totalEarnings = filteredEarningsData.reduce(
    (sum, entry) => sum + entry.earnings,
    0
  );
  const totalBookings = filteredEarningsData.reduce(
    (sum, entry) => sum + entry.bookings,
    0
  );
  const averageEarnings = totalEarnings / (totalBookings || 1);

  // Prepare data for the bar chart
  const chartData = {
    labels: filteredEarningsData.map((entry) => entry.date),
    datasets: [
      {
        label: "Earnings",
        data: filteredEarningsData.map((entry) => entry.earnings),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Earnings by Date",
      },
    },
  };

  return (
    <div className="p-6 max-w-6xl mx-auto font-sans mt-20">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">
        Earnings Report
      </h1>

      {/* Filters */}
      <div className="mb-6 flex space-x-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Start Date
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            End Date
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      {/* Earnings Overview */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-lg shadow-md border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700">
            Total Earnings
          </h2>
          <p className="text-2xl font-bold text-gray-900">${totalEarnings}</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-md border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700">
            Total Bookings
          </h2>
          <p className="text-2xl font-bold text-gray-900">{totalBookings}</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-md border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700">
            Average Earnings per Booking
          </h2>
          <p className="text-2xl font-bold text-gray-900">
            ${averageEarnings.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Earnings Breakdown */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Earnings Breakdown
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Date
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Earnings
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Bookings
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredEarningsData.map((entry) => (
                <tr key={entry.date} className="border-b border-gray-200">
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {entry.date}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    ${entry.earnings}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {entry.bookings}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Earnings Chart */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Earnings Visualization
        </h2>
        <div className="p-4 bg-white rounded-lg shadow-md border border-gray-200">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}

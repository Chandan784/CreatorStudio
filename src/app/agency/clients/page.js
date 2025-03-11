"use client";

import { useState } from "react";

// Dummy data for clients with only current month's progress
const initialClientsData = [
  {
    id: 1,
    clientName: "John Doe",
    managerName: "Alice Johnson",
    currentMonth: "Apr", // Current month
    currentProgress: 75, // Current month's progress
  },
  {
    id: 2,
    clientName: "Jane Smith",
    managerName: "Michael Brown",
    currentMonth: "Apr", // Current month
    currentProgress: 50, // Current month's progress
  },
  {
    id: 3,
    clientName: "Emily Davis",
    managerName: "Chris Wilson",
    currentMonth: "Apr", // Current month
    currentProgress: 90, // Current month's progress
  },
  // Add more clients as needed
];

export default function ClientsPage() {
  const [clientsData, setClientsData] = useState(initialClientsData);

  // Debug: Log the data to ensure it's being passed correctly
  console.log("Clients Data:", clientsData);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Clients</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clientsData.map((client) => {
          // Debug: Log each client to ensure the map function is working
          console.log("Rendering Client:", client);

          return (
            <div
              key={client.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold mb-2">
                {client.clientName}
              </h2>
              <p className="text-gray-600 mb-4">
                <span className="font-medium">Manager:</span>{" "}
                {client.managerName}
              </p>

              {/* Current Month Progress */}
              <div className="mb-4">
                <p className="text-gray-600 font-medium">
                  Current Month Progress:
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-purple-600 h-2.5 rounded-full"
                    style={{ width: `${client.currentProgress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {client.currentMonth}: {client.currentProgress}%
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

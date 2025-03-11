"use client";

import { useState } from "react";
import { Calendar } from "lucide-react";
import { motion } from "framer-motion";

export default function Appointments() {
  const [appointments, setAppointments] = useState([
    { id: 1, date: "2025-03-10", time: "10:00 AM", studio: "Studio A" },
    { id: 2, date: "2025-03-12", time: "2:00 PM", studio: "Studio B" },
  ]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <Calendar className="w-6 h-6 mr-2" /> Appointments
      </h2>
      <div className="bg-white p-4 shadow rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Upcoming Appointments</h3>
        <ul className="space-y-3">
          {appointments.map((appointment) => (
            <li key={appointment.id} className="p-3 bg-gray-50 rounded shadow">
              <p className="font-semibold">Studio: {appointment.studio}</p>
              <p>Date: {appointment.date}</p>
              <p>Time: {appointment.time}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

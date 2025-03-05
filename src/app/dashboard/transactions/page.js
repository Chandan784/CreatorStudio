"use client";

import React, { useState } from "react";

const transactionsData = [
  { id: "#TXN12345", amount: "$250", date: "2025-03-05", status: "Completed" },
  { id: "#TXN12346", amount: "$120", date: "2025-03-04", status: "Pending" },
  { id: "#TXN12347", amount: "$80", date: "2025-03-03", status: "Failed" },
];

const getStatusClass = (status) => {
  switch (status) {
    case "Completed":
      return "text-green-600 bg-green-100";
    case "Pending":
      return "text-yellow-600 bg-yellow-100";
    case "Failed":
      return "text-red-600 bg-red-100";
    default:
      return "";
  }
};

export default function Transactions() {
  const [transactions] = useState(transactionsData);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Transactions</h2>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-white shadow-lg rounded-lg p-4">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-left">Transaction ID</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-50 transition-all"
              >
                <td className="p-3">{txn.id}</td>
                <td className="p-3">{txn.amount}</td>
                <td className="p-3">{txn.date}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusClass(
                      txn.status
                    )}`}
                  >
                    {txn.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {transactions.map((txn, index) => (
          <div
            key={index}
            className="bg-white p-4 shadow-lg rounded-lg flex flex-col space-y-2"
          >
            <div className="flex justify-between">
              <span className="text-gray-500 text-sm">Transaction ID:</span>
              <span className="font-semibold">{txn.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 text-sm">Amount:</span>
              <span className="font-semibold">{txn.amount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 text-sm">Date:</span>
              <span className="font-semibold">{txn.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 text-sm">Status:</span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusClass(
                  txn.status
                )}`}
              >
                {txn.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import {
  Edit,
  MessageCircle,
  User,
  Calendar,
  Flag,
  Check,
  X,
  Phone,
} from "lucide-react";

// Dummy data for leads
const leadsData = [
  {
    id: 1,
    name: "John Doe",
    priority: "High",
    remark: "Interested in product demo",
    date: "2023-10-15",
    details: {
      requirement: "Need a custom solution for their business",
      interestLevel: "High",
      proposalStatus: "Sent",
      callbackStatus: "Pending",
      callbackRequired: true,
      pointOfContact: "Jane Smith",
    },
  },
  {
    id: 2,
    name: "Alice Johnson",
    priority: "Medium",
    remark: "Requested pricing details",
    date: "2023-10-14",
    details: {
      requirement: "Looking for a subscription plan",
      interestLevel: "Medium",
      proposalStatus: "Draft",
      callbackStatus: "Completed",
      callbackRequired: false,
      pointOfContact: "Michael Brown",
    },
  },
  // Add more leads as needed
];

export default function LeadsPage() {
  const [selectedLead, setSelectedLead] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open the edit modal
  const handleEditClick = (lead) => {
    setSelectedLead(lead);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedLead(null);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Leads List */}
      <div className="w-2/3 p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6">Leads</h1>
        <div className="space-y-4">
          {leadsData.map((lead) => (
            <div
              key={lead.id}
              className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
            >
              <div>
                <h2 className="text-xl font-semibold">{lead.name}</h2>
                <p className="text-sm text-gray-600">
                  <Flag className="inline w-4 h-4 mr-1" />
                  Priority: {lead.priority}
                </p>
                <p className="text-sm text-gray-600">
                  <User className="inline w-4 h-4 mr-1" />
                  Remark: {lead.remark}
                </p>
                <p className="text-sm text-gray-600">
                  <Calendar className="inline w-4 h-4 mr-1" />
                  Date: {lead.date}
                </p>
              </div>
              <button
                onClick={() => handleEditClick(lead)}
                className="text-purple-600 hover:text-purple-800"
              >
                <Edit className="w-6 h-6" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Section */}
      <div className="w-1/3 bg-white p-6 border-l border-gray-200">
        <h2 className="text-xl font-bold mb-6">Chat with Client</h2>
        <div className="bg-gray-50 p-4 rounded-lg h-[calc(100vh-10rem)] overflow-y-auto">
          <div className="space-y-4">
            {/* Chat Messages */}
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <p className="text-sm">Hello, I'm interested in your services.</p>
              <p className="text-xs text-gray-500 mt-1">Client - 10:15 AM</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg shadow-sm ml-8">
              <p className="text-sm">
                Hi! Could you share more details about your requirements?
              </p>
              <p className="text-xs text-gray-500 mt-1">You - 10:16 AM</p>
            </div>
            {/* Add more chat messages as needed */}
          </div>
        </div>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Type a message..."
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-1/2">
            <h2 className="text-xl font-bold mb-4">Edit Lead</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  defaultValue={selectedLead.name}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Requirement
                </label>
                <textarea
                  defaultValue={selectedLead.details.requirement}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Interest Level
                </label>
                <select
                  defaultValue={selectedLead.details.interestLevel}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Proposal Status
                </label>
                <select
                  defaultValue={selectedLead.details.proposalStatus}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="Draft">Draft</option>
                  <option value="Sent">Sent</option>
                  <option value="Approved">Approved</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Callback Status
                </label>
                <select
                  defaultValue={selectedLead.details.callbackStatus}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Callback Required
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    defaultChecked={selectedLead.details.callbackRequired}
                    className="w-4 h-4"
                  />
                  <span>Yes</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Point of Contact
                </label>
                <input
                  type="text"
                  defaultValue={selectedLead.details.pointOfContact}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

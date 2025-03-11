"use client";

import { useState } from "react";
import {
  User,
  FileText,
  MessageCircle,
  Edit,
  Calendar,
  Flag,
  Check,
  X,
  Phone,
  Paperclip,
} from "lucide-react";

// Dummy data for leads
const leadsData = [
  {
    id: 1,
    name: "John Doe",
    interestLevel: "High", // Determines card color
    remark: "Interested in product demo",
    date: "2023-10-15",
    requirement: "Need a custom solution for their business",
    proposalStatus: "Sent",
    callbackStatus: "Pending",
    callbackRequired: true,
    pointOfContact: "Jane Smith",
  },
  {
    id: 2,
    name: "Alice Johnson",
    interestLevel: "Medium", // Determines card color
    remark: "Requested pricing details",
    date: "2023-10-14",
    requirement: "Looking for a subscription plan",
    proposalStatus: "Draft",
    callbackStatus: "Completed",
    callbackRequired: false,
    pointOfContact: "Michael Brown",
  },
  // Add more leads as needed
];

export default function LeadsPage() {
  const [selectedLead, setSelectedLead] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null); // Tracks which modal is open

  // Function to open the modal with options
  const handleCardClick = (lead) => {
    setSelectedLead(lead);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedLead(null);
    setActiveModal(null);
  };

  // Function to determine card color based on interest level
  const getCardColor = (interestLevel) => {
    switch (interestLevel) {
      case "High":
        return "bg-red-100";
      case "Medium":
        return "bg-yellow-100";
      case "Low":
        return "bg-green-100";
      default:
        return "bg-gray-100";
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Leads List */}
      <div className="w-full p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6">Leads</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {leadsData.map((lead) => (
            <div
              key={lead.id}
              className={`p-4 rounded-lg shadow-md cursor-pointer ${getCardColor(
                lead.interestLevel
              )}`}
              onClick={() => handleCardClick(lead)}
            >
              <h2 className="text-xl font-semibold">{lead.name}</h2>
              <p className="text-sm text-gray-600">
                <Flag className="inline w-4 h-4 mr-1" />
                Interest: {lead.interestLevel}
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
          ))}
        </div>
      </div>

      {/* Main Modal */}
      {isModalOpen && selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-11/12 md:w-1/2 lg:w-1/3">
            <h2 className="text-xl font-bold mb-4">{selectedLead.name}</h2>
            <div className="space-y-4">
              <button
                onClick={() => setActiveModal("requirement")}
                className="w-full bg-purple-100 p-3 rounded-lg flex items-center space-x-2 hover:bg-purple-200"
              >
                <FileText className="w-5 h-5" />
                <span>View Requirement</span>
              </button>
              <button
                onClick={() => setActiveModal("chat")}
                className="w-full bg-purple-100 p-3 rounded-lg flex items-center space-x-2 hover:bg-purple-200"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Chat</span>
              </button>
              <button
                onClick={() => setActiveModal("edit")}
                className="w-full bg-purple-100 p-3 rounded-lg flex items-center space-x-2 hover:bg-purple-200"
              >
                <Edit className="w-5 h-5" />
                <span>Edit Leads</span>
              </button>
              <button
                onClick={handleCloseModal}
                className="w-full bg-gray-300 p-3 rounded-lg hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Requirement Modal */}
      {activeModal === "requirement" && selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-11/12 md:w-1/2 lg:w-1/3">
            <h2 className="text-xl font-bold mb-4">Requirement Details</h2>
            <p className="text-gray-700">{selectedLead.requirement}</p>
            <button
              onClick={() => setActiveModal(null)}
              className="mt-4 w-full bg-gray-300 p-3 rounded-lg hover:bg-gray-400"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Chat Modal */}
      {activeModal === "chat" && selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-11/12 md:w-1/2 lg:w-1/3">
            <h2 className="text-xl font-bold mb-4">
              Chat with {selectedLead.name}
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg h-64 overflow-y-auto mb-4">
              <div className="space-y-4">
                {/* Chat Messages */}
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <p className="text-sm">
                    Hello, I'm interested in your services.
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Client - 10:15 AM
                  </p>
                </div>
                <div className="bg-purple-100 p-3 rounded-lg shadow-sm ml-8">
                  <p className="text-sm">
                    Hi! Could you share more details about your requirements?
                  </p>
                  <p className="text-xs text-gray-500 mt-1">You - 10:16 AM</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Type a message..."
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              <button className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                <Paperclip className="w-5 h-5" />
              </button>
            </div>
            <button
              onClick={() => setActiveModal(null)}
              className="mt-4 w-full bg-gray-300 p-3 rounded-lg hover:bg-gray-400"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {activeModal === "edit" && selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-11/12 md:w-1/2 lg:w-1/3">
            <h2 className="text-xl font-bold mb-4">Edit Lead</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Interest Level
                </label>
                <select
                  defaultValue={selectedLead.interestLevel}
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
                  defaultValue={selectedLead.proposalStatus}
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
                  defaultValue={selectedLead.callbackStatus}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Remarks
                </label>
                <textarea
                  defaultValue={selectedLead.remark}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Point of Contact
                </label>
                <input
                  type="text"
                  defaultValue={selectedLead.pointOfContact}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
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

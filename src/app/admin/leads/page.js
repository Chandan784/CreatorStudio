"use client";

import { useState, useEffect } from "react";
import axios from "axios";
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
  Search,
  Filter,
} from "lucide-react";

export default function LeadsPage() {
  const [leadsData, setLeadsData] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [editingLeadId, setEditingLeadId] = useState(null); // Track which lead is being edited
  const [editedLead, setEditedLead] = useState({}); // Store edited lead data
  const [viewingLeadId, setViewingLeadId] = useState(null); // Track which lead's details are being viewed

  // Filter states
  const [nameFilter, setNameFilter] = useState("");
  const [interestLevelFilter, setInterestLevelFilter] = useState("");
  const [proposalStatusFilter, setProposalStatusFilter] = useState("");
  const [callStatusFilter, setCallStatusFilter] = useState("");
  const [callbackRequiredFilter, setCallbackRequiredFilter] = useState("");

  // Fetch leads data on component mount
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/leads`
        );
        setLeadsData(data);
        setFilteredLeads(data); // Initialize filtered leads with all data
      } catch (error) {
        console.error("Error fetching leads:", error);
      }
    };

    fetchLeads();
  }, []);

  // Function to handle editing a lead
  const handleEditClick = (lead) => {
    setEditingLeadId(lead._id);
    setEditedLead({ ...lead }); // Initialize editedLead with the current lead data
  };

  // Function to handle saving edited lead
  const handleSaveClick = async (id) => {
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/leads/${id}`, editedLead);
      setLeadsData((prev) =>
        prev.map((lead) => (lead._id === id ? editedLead : lead))
      );
      setFilteredLeads((prev) =>
        prev.map((lead) => (lead._id === id ? editedLead : lead))
      );
      setEditingLeadId(null); // Exit editing mode
    } catch (error) {
      console.error("Error updating lead:", error);
    }
  };

  // Function to handle input changes during editing
  const handleInputChange = (e, field) => {
    setEditedLead((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  // Function to determine section background color based on dropdown value
  const getSectionColor = (value) => {
    switch (value?.toLowerCase()) {
      case "high":
        return "bg-red-400";
      case "medium":
        return "bg-yellow-400";
      case "low":
        return "bg-green-400";
      case "pending":
        return "bg-blue-100";
      case "sent":
        return "bg-purple-100";
      case "approved":
        return "bg-green-100";
      case "not contacted":
        return "bg-gray-100";
      case "contacted":
        return "bg-blue-100";
      case "follow up required":
        return "bg-yellow-100";
      default:
        return "bg-gray-100";
    }
  };

  // Function to apply filters
  const applyFilters = () => {
    let filtered = leadsData;

    if (nameFilter) {
      filtered = filtered.filter((lead) =>
        lead.userId?.name.toLowerCase().includes(nameFilter.toLowerCase())
      );
    }

    if (interestLevelFilter) {
      filtered = filtered.filter(
        (lead) =>
          lead.interestLevel.toLowerCase() === interestLevelFilter.toLowerCase()
      );
    }

    if (proposalStatusFilter) {
      filtered = filtered.filter(
        (lead) =>
          lead.proposalStatus.toLowerCase() ===
          proposalStatusFilter.toLowerCase()
      );
    }

    if (callStatusFilter) {
      filtered = filtered.filter(
        (lead) =>
          lead.callStatus.toLowerCase() === callStatusFilter.toLowerCase()
      );
    }

    if (callbackRequiredFilter !== "") {
      filtered = filtered.filter(
        (lead) => lead.callbackRequired === (callbackRequiredFilter === "true")
      );
    }

    setFilteredLeads(filtered);
  };

  // Reset filters
  const resetFilters = () => {
    setNameFilter("");
    setInterestLevelFilter("");
    setProposalStatusFilter("");
    setCallStatusFilter("");
    setCallbackRequiredFilter("");
    setFilteredLeads(leadsData);
  };

  // Function to handle viewing user details
  const handleViewRequirement = (leadId) => {
    setViewingLeadId(leadId);
  };

  // Function to close the user details section
  const handleCloseUserDetails = () => {
    setViewingLeadId(null);
  };

  return (
    <div className="flex h-screen bg-gray-100 p-6">
      {/* Leads List */}
      <div className="w-full overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">Leads</h1>

        {/* Status-Wise Color Legend */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <h2 className="text-lg font-semibold mb-4 text-center">
            Status Color Legend
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Interest Level Colors */}
            <div className="flex items-center space-x-2 justify-center">
              <div className="w-4 h-4 bg-red-100 rounded-full"></div>
              <span>High Interest</span>
            </div>
            <div className="flex items-center space-x-2 justify-center">
              <div className="w-4 h-4 bg-yellow-100 rounded-full"></div>
              <span>Medium Interest</span>
            </div>
            <div className="flex items-center space-x-2 justify-center">
              <div className="w-4 h-4 bg-green-100 rounded-full"></div>
              <span>Low Interest</span>
            </div>

            {/* Proposal Status Colors */}
            <div className="flex items-center space-x-2 justify-center">
              <div className="w-4 h-4 bg-blue-100 rounded-full"></div>
              <span>Pending Proposal</span>
            </div>
            <div className="flex items-center space-x-2 justify-center">
              <div className="w-4 h-4 bg-purple-100 rounded-full"></div>
              <span>Sent Proposal</span>
            </div>
            <div className="flex items-center space-x-2 justify-center">
              <div className="w-4 h-4 bg-green-100 rounded-full"></div>
              <span>Approved Proposal</span>
            </div>

            {/* Call Status Colors */}
            <div className="flex items-center space-x-2 justify-center">
              <div className="w-4 h-4 bg-gray-100 rounded-full"></div>
              <span>Not Contacted</span>
            </div>
            <div className="flex items-center space-x-2 justify-center">
              <div className="w-4 h-4 bg-blue-100 rounded-full"></div>
              <span>Contacted</span>
            </div>
            <div className="flex items-center space-x-2 justify-center">
              <div className="w-4 h-4 bg-yellow-100 rounded-full"></div>
              <span>Follow Up Required</span>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Name Filter */}
            <div>
              <label className="text-sm text-gray-500">Name</label>
              <input
                type="text"
                placeholder="Search by name"
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>

            {/* Interest Level Filter */}
            <div>
              <label className="text-sm text-gray-500">Interest Level</label>
              <select
                value={interestLevelFilter}
                onChange={(e) => setInterestLevelFilter(e.target.value)}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              >
                <option value="">All</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            {/* Proposal Status Filter */}
            <div>
              <label className="text-sm text-gray-500">Proposal Status</label>
              <select
                value={proposalStatusFilter}
                onChange={(e) => setProposalStatusFilter(e.target.value)}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              >
                <option value="">All</option>
                <option value="pending">Pending</option>
                <option value="sent">Sent</option>
                <option value="approved">Approved</option>
              </select>
            </div>

            {/* Call Status Filter */}
            <div>
              <label className="text-sm text-gray-500">Call Status</label>
              <select
                value={callStatusFilter}
                onChange={(e) => setCallStatusFilter(e.target.value)}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              >
                <option value="">All</option>
                <option value="not contacted">Not Contacted</option>
                <option value="contacted">Contacted</option>
                <option value="follow up required">Follow Up Required</option>
              </select>
            </div>

            {/* Callback Required Filter */}
            <div>
              <label className="text-sm text-gray-500">Callback Required</label>
              <select
                value={callbackRequiredFilter}
                onChange={(e) => setCallbackRequiredFilter(e.target.value)}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              >
                <option value="">All</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex justify-end space-x-4 mt-4">
            <button
              onClick={applyFilters}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center"
            >
              <Filter className="w-4 h-4 mr-2" />
              Apply Filters
            </button>
            <button
              onClick={resetFilters}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Leads Cards */}
        <div className="space-y-4">
          {filteredLeads.map((lead) => (
            <div
              key={lead._id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
                {/* Point of Contact */}
                <div>
                  <label className="text-sm text-gray-500">
                    Point of Contact
                  </label>
                  {editingLeadId === lead._id ? (
                    <input
                      type="text"
                      value={
                        typeof editedLead.pointOfContact === "string"
                          ? editedLead.pointOfContact
                          : editedLead.pointOfContact?.name || ""
                      }
                      onChange={(e) =>
                        setEditedLead((prev) => ({
                          ...prev,
                          pointOfContact: e.target.value,
                        }))
                      }
                      className="w-full p-1 border rounded"
                    />
                  ) : (
                    <p className="font-semibold">
                      {typeof lead.pointOfContact === "string"
                        ? lead.pointOfContact
                        : `${lead.pointOfContact.name} (${lead.pointOfContact.email})`}
                    </p>
                  )}
                </div>

                {/* User Name */}
                <div>
                  <label className="text-sm text-gray-500">User Name</label>
                  <p className="font-semibold">{lead.userId.name}</p>
                </div>

                {/* Interest Level */}
                <div className={getSectionColor(lead.interestLevel)}>
                  <label className="text-sm text-gray-500">
                    Interest Level
                  </label>
                  {editingLeadId === lead._id ? (
                    <select
                      value={editedLead.interestLevel || ""}
                      onChange={(e) => handleInputChange(e, "interestLevel")}
                      className="w-full p-1 border rounded"
                    >
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  ) : (
                    <p className="font-semibold">{lead.interestLevel}</p>
                  )}
                </div>

                {/* Proposal Status */}
                <div className={getSectionColor(lead.proposalStatus)}>
                  <label className="text-sm text-gray-500">
                    Proposal Status
                  </label>
                  {editingLeadId === lead._id ? (
                    <select
                      value={editedLead.proposalStatus || ""}
                      onChange={(e) => handleInputChange(e, "proposalStatus")}
                      className="w-full p-1 border rounded"
                    >
                      <option value="pending">Pending</option>
                      <option value="sent">Sent</option>
                      <option value="approved">Approved</option>
                    </select>
                  ) : (
                    <p className="font-semibold">{lead.proposalStatus}</p>
                  )}
                </div>

                {/* Call Status */}
                <div className={getSectionColor(lead.callStatus)}>
                  <label className="text-sm text-gray-500">Call Status</label>
                  {editingLeadId === lead._id ? (
                    <select
                      value={editedLead.callStatus || ""}
                      onChange={(e) => handleInputChange(e, "callStatus")}
                      className="w-full p-1 border rounded"
                    >
                      <option value="not contacted">Not Contacted</option>
                      <option value="contacted">Contacted</option>
                      <option value="follow up required">
                        Follow Up Required
                      </option>
                    </select>
                  ) : (
                    <p className="font-semibold">{lead.callStatus}</p>
                  )}
                </div>

                {/* Callback Required */}
                <div>
                  <label className="text-sm text-gray-500">
                    Callback Required
                  </label>
                  {editingLeadId === lead._id ? (
                    <select
                      value={editedLead.callbackRequired || ""}
                      onChange={(e) => handleInputChange(e, "callbackRequired")}
                      className="w-full p-1 border rounded"
                    >
                      <option value={true}>Yes</option>
                      <option value={false}>No</option>
                    </select>
                  ) : (
                    <p className="font-semibold">
                      {lead.callbackRequired ? "Yes" : "No"}
                    </p>
                  )}
                </div>

                {/* Date of Follow-Up */}
                <div>
                  <label className="text-sm text-gray-500">
                    Date of Follow-Up
                  </label>
                  {editingLeadId === lead._id ? (
                    <input
                      type="date"
                      value={
                        editedLead.dateOfFollowUp
                          ? editedLead.dateOfFollowUp.split("T")[0]
                          : ""
                      }
                      onChange={(e) => handleInputChange(e, "dateOfFollowUp")}
                      className="w-full p-1 border rounded"
                    />
                  ) : (
                    <p className="font-semibold">
                      {lead.dateOfFollowUp
                        ? new Date(lead.dateOfFollowUp).toLocaleDateString()
                        : "N/A"}
                    </p>
                  )}
                </div>

                {/* Remarks */}
                <div>
                  <label className="text-sm text-gray-500">Remarks</label>
                  {editingLeadId === lead._id ? (
                    <input
                      type="text"
                      value={editedLead.remarks || ""}
                      onChange={(e) => handleInputChange(e, "remarks")}
                      className="w-full p-1 border rounded"
                    />
                  ) : (
                    <p className="font-semibold">{lead.remarks}</p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="mt-4 flex justify-center space-x-2">
                {editingLeadId === lead._id ? (
                  <button
                    onClick={() => handleSaveClick(lead._id)}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                  >
                    Save
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => handleEditClick(lead)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleViewRequirement(lead._id)}
                      className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600"
                    >
                      View Requirement
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* User Details Section */}
      {viewingLeadId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-md p-6 w-11/12 md:w-1/2 lg:w-1/3">
            <h2 className="text-xl font-bold mb-4 text-center">User Details</h2>
            {filteredLeads
              .filter((lead) => lead._id === viewingLeadId)
              .map((lead) => (
                <div key={lead._id} className="space-y-4 text-center">
                  <div>
                    <label className="text-sm text-gray-500">Name</label>
                    <p className="font-semibold">{lead.userId?.name}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Email</label>
                    <p className="font-semibold">{lead.userId?.email}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Phone</label>
                    <p className="font-semibold">
                      {lead.userId?.phoneNumber || "N/A"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Requirement</label>
                    <p className="font-semibold">{lead.requirement}</p>
                  </div>
                  <button
                    onClick={handleCloseUserDetails}
                    className="w-full bg-gray-300 p-3 rounded-lg hover:bg-gray-400"
                  >
                    Close
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

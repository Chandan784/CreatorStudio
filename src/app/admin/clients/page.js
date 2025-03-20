"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

function AdminClientpage() {
  let router = useRouter();
  const [clients, setClients] = useState([
    {
      id: 1,
      name: "Client A",
      email: "clientA@example.com",
      phone: "+1234567890",
      plans: [], // Array to store plans for each client
    },
    {
      id: 2,
      name: "Client B",
      email: "clientB@example.com",
      phone: "+0987654321",
      plans: [],
    },
  ]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("view"); // 'view' or 'create'
  const [planName, setPlanName] = useState("");
  const [frequency, setFrequency] = useState("monthly");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [deliverables, setDeliverables] = useState([]);
  const [isDeliverableFormOpen, setIsDeliverableFormOpen] = useState(false);
  const [deliverableType, setDeliverableType] = useState("");
  const [stages, setStages] = useState([]);
  const [selectedStages, setSelectedStages] = useState([]);
  const [quantity, setQuantity] = useState(1);

  // Open modal for selected client
  const openModal = (client) => {
    setSelectedClient(client);
    setIsModalOpen(true);
    setModalMode("view"); // Default to 'view' mode
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedClient(null);
    resetForm();
  };

  // Reset form fields
  const resetForm = () => {
    setPlanName("");
    setFrequency("monthly");
    setPrice(0);
    setDescription("");
    setDeliverables([]);
    setIsDeliverableFormOpen(false);
    setDeliverableType("");
    setStages([]);
    setSelectedStages([]);
    setQuantity(1);
  };

  // Switch modal mode between 'view' and 'create'
  const switchModalMode = (mode) => {
    setModalMode(mode);
  };

  // Handle adding deliverables
  const handleAddDeliverable = () => {
    setIsDeliverableFormOpen(true);
  };

  // Handle deliverable type selection
  const handleDeliverableTypeChange = (e) => {
    const type = e.target.value;
    setDeliverableType(type);

    // Fetch stages based on deliverable type (mock data)
    if (type === "video") {
      setStages([
        { name: "Script", substages: [] },
        { name: "Shooting", substages: [] },
        { name: "Editing", substages: [] },
        { name: "Upload", substages: ["FB", "Instagram", "YouTube"] },
        { name: "Ads", substages: ["FB", "Instagram", "YouTube"] },
      ]);
    } else if (type === "audio") {
      setStages([
        { name: "Recording", substages: [] },
        { name: "Editing", substages: [] },
        { name: "Mixing", substages: [] },
      ]);
    }
  };

  // Handle stage selection
  const handleStageSelection = (stageName) => {
    if (selectedStages.includes(stageName)) {
      setSelectedStages(selectedStages.filter((stage) => stage !== stageName));
    } else {
      setSelectedStages([...selectedStages, stageName]);
    }
  };

  // Save deliverable
  const saveDeliverable = () => {
    const newDeliverable = {
      type: deliverableType,
      stages: selectedStages,
      quantity,
    };
    setDeliverables([...deliverables, newDeliverable]);
    setIsDeliverableFormOpen(false);
    setDeliverableType("");
    setSelectedStages([]);
    setQuantity(1);
  };

  // Handle plan submission
  const handleSavePlan = () => {
    const newPlan = {
      planName,
      frequency,
      price,
      description,
      deliverables,
    };

    // Add the new plan to the selected client's plans
    const updatedClients = clients.map((client) =>
      client.id === selectedClient.id
        ? { ...client, plans: [...client.plans, newPlan] }
        : client
    );
    setClients(updatedClients);

    console.log("New Plan Created:", newPlan);
    alert(`Plan created for ${selectedClient.name}: ${planName}`);
    closeModal();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Clients</h1>

      {/* Client Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.map((client) => (
          <div
            key={client.id}
            className="bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow duration-200"
            onClick={() => router.push("/clients/67d542b0e7b501e84da58141")}
          >
            <h2 className="text-xl font-semibold text-gray-800">
              {client.name}
            </h2>
            <p className="text-gray-600 mt-2">{client.email}</p>
            <p className="text-gray-600">{client.phone}</p>
          </div>
        ))}
      </div>

      {/* Modal for Viewing/Creating Plan */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 overflow-y-auto max-h-[90vh]">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {selectedClient.name}
            </h2>

            {/* Modal Mode Toggle */}
            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => switchModalMode("view")}
                className={`px-4 py-2 rounded-lg ${
                  modalMode === "view"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                View Plan
              </button>
              <button
                onClick={() => switchModalMode("create")}
                className={`px-4 py-2 rounded-lg ${
                  modalMode === "create"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                Create Plan
              </button>
            </div>

            {/* View Plan Section */}
            {modalMode === "view" && (
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Saved Plans
                </h3>
                {selectedClient.plans.length > 0 ? (
                  selectedClient.plans.map((plan, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg mb-4">
                      <p className="text-lg font-semibold text-gray-800">
                        {plan.planName}
                      </p>
                      <p className="text-gray-600">
                        Frequency: {plan.frequency}
                      </p>
                      <p className="text-gray-600">Price: ${plan.price}</p>
                      <p className="text-gray-600">{plan.description}</p>
                      <div className="mt-2">
                        <h4 className="font-medium text-gray-700">
                          Deliverables:
                        </h4>
                        {plan.deliverables.map((deliverable, i) => (
                          <div key={i} className="ml-4 text-sm text-gray-600">
                            <p>Type: {deliverable.type}</p>
                            <p>Stages: {deliverable.stages.join(", ")}</p>
                            <p>Quantity: {deliverable.quantity}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">No plans found.</p>
                )}
              </div>
            )}

            {/* Create Plan Section */}
            {modalMode === "create" && (
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Create Plan
                </h3>

                {/* Plan Details Form */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Plan Name
                    </label>
                    <input
                      type="text"
                      value={planName}
                      onChange={(e) => setPlanName(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Frequency
                    </label>
                    <select
                      value={frequency}
                      onChange={(e) => setFrequency(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="monthly">Monthly</option>
                      <option value="quarterly">Quarterly</option>
                      <option value="yearly">Yearly</option>
                      <option value="one-time">One-Time</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price
                    </label>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="3"
                    />
                  </div>
                </div>

                {/* Deliverables Section */}
                <div className="mt-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">
                    Deliverables
                  </h4>

                  {/* List of Deliverables */}
                  {deliverables.map((deliverable, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 p-3 rounded-lg mb-2 text-sm text-gray-700"
                    >
                      <p>
                        <strong>Type:</strong> {deliverable.type}
                      </p>
                      <p>
                        <strong>Stages:</strong> {deliverable.stages.join(", ")}
                      </p>
                      <p>
                        <strong>Quantity:</strong> {deliverable.quantity}
                      </p>
                    </div>
                  ))}

                  {/* Add Deliverable Button */}
                  <button
                    onClick={handleAddDeliverable}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 mt-4"
                  >
                    Add Deliverable
                  </button>
                </div>

                {/* Deliverable Form */}
                {isDeliverableFormOpen && (
                  <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                    <h5 className="text-lg font-semibold text-gray-800 mb-4">
                      Add Deliverable
                    </h5>

                    {/* Deliverable Type */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Deliverable Type
                      </label>
                      <select
                        value={deliverableType}
                        onChange={handleDeliverableTypeChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="">Select Type</option>
                        <option value="video">Video</option>
                        <option value="audio">Audio</option>
                      </select>
                    </div>

                    {/* Stages Selection */}
                    {stages.length > 0 && (
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Select Stages
                        </label>
                        <div className="space-y-2">
                          {stages.map((stage, index) => (
                            <div key={index} className="flex items-center">
                              <input
                                type="checkbox"
                                id={`stage-${index}`}
                                value={stage.name}
                                checked={selectedStages.includes(stage.name)}
                                onChange={() =>
                                  handleStageSelection(stage.name)
                                }
                                className="mr-2"
                              />
                              <label
                                htmlFor={`stage-${index}`}
                                className="text-gray-700"
                              >
                                {stage.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Quantity */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Quantity
                      </label>
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    {/* Save Deliverable Button */}
                    <button
                      onClick={saveDeliverable}
                      className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-200"
                    >
                      Save Deliverable
                    </button>
                  </div>
                )}

                {/* Save Plan Button */}
                <button
                  onClick={handleSavePlan}
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-200 mt-6"
                >
                  Save Plan
                </button>
              </div>
            )}

            {/* Close Modal Button */}
            <button
              onClick={closeModal}
              className="w-full bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-200 mt-2"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminClientpage;

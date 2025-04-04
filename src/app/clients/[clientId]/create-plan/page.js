"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function CreatePlanPage({ params }) {
  let { clientId } = params;

  // State for plan details
  const [planName, setPlanName] = useState("");
  const [frequency, setFrequency] = useState("monthly");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  // State for deliverables
  const [deliverables, setDeliverables] = useState([]); // List of deliverables fetched from the backend
  const [selectedDeliverables, setSelectedDeliverables] = useState([]); // Selected deliverables with quantity and stages
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [selectedDeliverableId, setSelectedDeliverableId] = useState(""); // Currently selected deliverable ID
  const [selectedStages, setSelectedStages] = useState([]); // Selected stages and substages for the current deliverable
  const [deliverableQuantity, setDeliverableQuantity] = useState(1); // Quantity of the selected deliverable

  // Fetch deliverables from the backend
  useEffect(() => {
    const fetchDeliverables = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/deliverables`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch deliverables");
        }
        const data = await response.json();
        setDeliverables(data);
        console.log("Fetched deliverables:", data); // Debugging log
      } catch (error) {
        console.error("Error fetching deliverables:", error);
        alert("Failed to fetch deliverables. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDeliverables();
  }, []);

  // Handle selecting a deliverable
  const handleSelectDeliverable = (deliverableId) => {
    console.log("Selected deliverable ID:", deliverableId); // Debugging log
    setSelectedDeliverableId(deliverableId);

    // Find the selected deliverable
    const deliverable = deliverables.find((d) => d._id === deliverableId);
    if (deliverable) {
      console.log("Selected deliverable:", deliverable); // Debugging log

      // Initialize selected stages with all stages and substages
      const stagesWithSelection = deliverable.stages.map((stage) => ({
        ...stage,
        selected: false, // Default to false
        substages: stage.substages.map((substage) => ({
          ...substage,
          selected: false, // Default to false
        })),
      }));

      console.log("Initialized stages:", stagesWithSelection); // Debugging log

      // Update the selectedStages state
      setSelectedStages(stagesWithSelection);
    } else {
      console.log("No deliverable found with ID:", deliverableId); // Debugging log
      // If no deliverable is found, reset the selectedStages state
      setSelectedStages([]);
    }
  };

  // Handle toggling stage selection
  const handleToggleStage = (stageIndex) => {
    setSelectedStages((prev) =>
      prev.map((stage, index) =>
        index === stageIndex ? { ...stage, selected: !stage.selected } : stage
      )
    );
  };

  // Handle toggling substage selection
  const handleToggleSubstage = (stageIndex, substageIndex) => {
    setSelectedStages((prev) =>
      prev.map((stage, sIndex) =>
        sIndex === stageIndex
          ? {
              ...stage,
              substages: stage.substages.map((substage, subIndex) =>
                subIndex === substageIndex
                  ? { ...substage, selected: !substage.selected }
                  : substage
              ),
            }
          : stage
      )
    );
  };

  // Handle adding a deliverable
  const handleAddDeliverable = () => {
    if (!selectedDeliverableId) {
      alert("Please select a deliverable.");
      return;
    }

    const deliverable = deliverables.find(
      (d) => d._id === selectedDeliverableId
    );
    if (!deliverable) {
      alert("Invalid deliverable selected.");
      return;
    }

    // Filter stages and substages to include only selected ones
    const selectedStagesWithSubstages = selectedStages
      .filter(
        (stage) => stage.selected || stage.substages.some((sub) => sub.selected)
      ) // Include stages with selected substages
      .map((stage) => ({
        name: stage.name,
        selected: stage.selected,
        substages: stage.substages
          .filter((sub) => sub.selected) // Include only selected substages
          .map((sub) => ({
            name: sub.name,
            selected: sub.selected,
          })),
      }));

    // If no stages or substages are selected, show an error
    if (selectedStagesWithSubstages.length === 0) {
      alert("Please select at least one stage or substage.");
      return;
    }

    const newDeliverable = {
      type: deliverable.type, // Directly include the deliverable type
      quantity: deliverableQuantity, // Use the selected quantity
      stages: selectedStagesWithSubstages, // Only selected stages and substages
    };

    setSelectedDeliverables((prev) => [...prev, newDeliverable]);
    setSelectedDeliverableId("");
    setSelectedStages([]);
    setDeliverableQuantity(1); // Reset quantity to default
  };

  // Handle deleting a deliverable
  const handleDeleteDeliverable = (index) => {
    setSelectedDeliverables((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle editing a deliverable
  const handleEditDeliverable = (index) => {
    const deliverable = selectedDeliverables[index];
    setSelectedDeliverableId(
      deliverables.find((d) => d.type === deliverable.type)?._id || ""
    );
    setSelectedStages(deliverable.stages);
    setDeliverableQuantity(deliverable.quantity); // Set the quantity for editing
    handleDeleteDeliverable(index);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPlan = {
      plan_name: planName,
      frequency,
      price: parseFloat(price),
      description,
      deliverables: selectedDeliverables, // Directly include the deliverables array
      client_id: clientId, // Client ID from params
    };

    console.log("New Plan to be saved:", newPlan); // Debugging log

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/plans`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPlan),
      });

      if (!response.ok) {
        throw new Error("Failed to save plan");
      }

      const data = await response.json();
      alert("Plan created successfully!");
      console.log("Plan created:", data);
    } catch (error) {
      console.error("Error saving plan:", error);
      alert("Failed to save plan. Please try again.");
    }
  };

  // Handle cancel
  const handleCancel = () => {
    // Reset the form or navigate away
    setPlanName("");
    setFrequency("monthly");
    setPrice("");
    setDescription("");
    setSelectedDeliverables([]);
    setSelectedDeliverableId("");
    setSelectedStages([]);
    setDeliverableQuantity(1); // Reset quantity to default
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Create Plan</h1>

        {/* Plan Details Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Plan Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
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

          {/* Frequency */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
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

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
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

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
            />
          </div>

          {/* Deliverables Section */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Deliverables
            </h2>

            {/* List of Selected Deliverables */}
            {selectedDeliverables.map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 p-3 rounded-lg mb-2 text-sm text-gray-700"
              >
                <p>
                  <strong>Type:</strong> {item.type}
                </p>
                <p>
                  <strong>Quantity:</strong> {item.quantity}
                </p>
                <p>
                  <strong>Stages:</strong>{" "}
                  {item.stages
                    .map(
                      (stage) =>
                        `${stage.name} (${stage.substages
                          .map((sub) => sub.name)
                          .join(", ")})`
                    )
                    .join("; ")}
                </p>
                <div className="flex space-x-2 mt-2">
                  <button
                    type="button"
                    onClick={() => handleEditDeliverable(index)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteDeliverable(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}

            {/* Add Deliverable Form */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Add Deliverable
              </label>
              <div className="flex space-x-4">
                {isLoading ? (
                  <p>Loading deliverables...</p>
                ) : (
                  <>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={selectedDeliverableId}
                      onChange={(e) => handleSelectDeliverable(e.target.value)}
                    >
                      <option value="">Select Deliverable</option>
                      {deliverables.map((deliverable) => (
                        <option key={deliverable._id} value={deliverable._id}>
                          {deliverable.type}
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      min="1"
                      value={deliverableQuantity}
                      onChange={(e) =>
                        setDeliverableQuantity(parseInt(e.target.value))
                      }
                      className="w-24 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </>
                )}
              </div>

              {/* Stages and Substages Selection */}
              {selectedDeliverableId && (
                <div className="mt-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    Select Stages and Substages
                  </h3>
                  {selectedStages.map((stage, stageIndex) => (
                    <div key={stageIndex} className="mb-4">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={stage.selected}
                          onChange={() => handleToggleStage(stageIndex)}
                          className="form-checkbox h-4 w-4 text-blue-600"
                        />
                        <span className="text-gray-700">{stage.name}</span>
                      </label>
                      {stage.substages.map((substage, substageIndex) => (
                        <div
                          key={substageIndex}
                          className="ml-6 flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            checked={substage.selected}
                            onChange={() =>
                              handleToggleSubstage(stageIndex, substageIndex)
                            }
                            className="form-checkbox h-4 w-4 text-blue-600"
                          />
                          <span className="text-gray-700">{substage.name}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddDeliverable}
                    className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
                  >
                    Add Deliverable
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Save and Cancel Buttons */}
          <div className="flex space-x-4">
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-200"
            >
              Save Plan
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

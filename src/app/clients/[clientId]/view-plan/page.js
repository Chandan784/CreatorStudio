"use client";

import React, { useState } from "react";

const PlanPage = () => {
  const [plans, setPlans] = useState([
    {
      _id: "1",
      plan_name: "Basic Plan",
      frequency: "monthly",
      price: 1999,
      deliverables: [
        {
          type: "Website Design",
          quantity: 1,
          stages: [
            {
              name: "Design",
              selected: true,
              substages: [
                { name: "Wireframe", selected: true },
                { name: "Mockup", selected: false },
              ],
            },
            {
              name: "Development",
              selected: false,
              substages: [
                { name: "Frontend", selected: false },
                { name: "Backend", selected: false },
              ],
            },
          ],
        },
      ],
    },
  ]);

  const [editingPlanId, setEditingPlanId] = useState(null); // Track which plan is being edited
  const [newDeliverable, setNewDeliverable] = useState({
    type: "",
    quantity: 1,
    stages: [],
  }); // State for adding a new deliverable

  // Handle input changes for plan details
  const handlePlanChange = (planId, field, value) => {
    setPlans((prevPlans) =>
      prevPlans.map((plan) =>
        plan._id === planId ? { ...plan, [field]: value } : plan
      )
    );
  };

  // Handle input changes for deliverables
  const handleDeliverableChange = (planId, deliverableIndex, field, value) => {
    setPlans((prevPlans) =>
      prevPlans.map((plan) =>
        plan._id === planId
          ? {
              ...plan,
              deliverables: plan.deliverables.map((deliverable, index) =>
                index === deliverableIndex
                  ? { ...deliverable, [field]: value }
                  : deliverable
              ),
            }
          : plan
      )
    );
  };

  // Handle adding a new deliverable
  const handleAddDeliverable = (planId) => {
    setPlans((prevPlans) =>
      prevPlans.map((plan) =>
        plan._id === planId
          ? {
              ...plan,
              deliverables: [...plan.deliverables, newDeliverable],
            }
          : plan
      )
    );
    setNewDeliverable({ type: "", quantity: 1, stages: [] }); // Reset new deliverable form
  };

  // Handle deleting a deliverable
  const handleDeleteDeliverable = (planId, deliverableIndex) => {
    setPlans((prevPlans) =>
      prevPlans.map((plan) =>
        plan._id === planId
          ? {
              ...plan,
              deliverables: plan.deliverables.filter(
                (_, index) => index !== deliverableIndex
              ),
            }
          : plan
      )
    );
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Plans</h1>

      {/* Plan Cards */}
      <div className="space-y-6">
        {plans.map((plan) => (
          <div key={plan._id} className="bg-white p-6 rounded-lg shadow-md">
            {editingPlanId === plan._id ? (
              // Edit Mode: Show Full Form
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Plan Name
                  </label>
                  <input
                    type="text"
                    value={plan.plan_name}
                    onChange={(e) =>
                      handlePlanChange(plan._id, "plan_name", e.target.value)
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Frequency
                  </label>
                  <select
                    value={plan.frequency}
                    onChange={(e) =>
                      handlePlanChange(plan._id, "frequency", e.target.value)
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="yearly">Yearly</option>
                    <option value="one-time">One-time</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Price
                  </label>
                  <input
                    type="number"
                    value={plan.price}
                    onChange={(e) =>
                      handlePlanChange(plan._id, "price", e.target.value)
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                {/* Deliverables */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Deliverables</h3>
                  {plan.deliverables.map((deliverable, deliverableIndex) => (
                    <div
                      key={deliverableIndex}
                      className="border p-4 rounded-lg"
                    >
                      <div className="flex justify-between items-center">
                        <h4 className="text-md font-medium">
                          Deliverable {deliverableIndex + 1}
                        </h4>
                        <button
                          onClick={() =>
                            handleDeleteDeliverable(plan._id, deliverableIndex)
                          }
                          className="text-red-500 hover:text-red-700"
                        >
                          Delete
                        </button>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Type
                        </label>
                        <input
                          type="text"
                          value={deliverable.type}
                          onChange={(e) =>
                            handleDeliverableChange(
                              plan._id,
                              deliverableIndex,
                              "type",
                              e.target.value
                            )
                          }
                          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Quantity
                        </label>
                        <input
                          type="number"
                          value={deliverable.quantity}
                          onChange={(e) =>
                            handleDeliverableChange(
                              plan._id,
                              deliverableIndex,
                              "quantity",
                              e.target.value
                            )
                          }
                          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        />
                      </div>
                      {/* Stages */}
                      <div className="space-y-2">
                        <h5 className="text-sm font-medium">Stages</h5>
                        {deliverable.stages.map((stage, stageIndex) => (
                          <div
                            key={stageIndex}
                            className="border p-2 rounded-md"
                          >
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Stage Name
                              </label>
                              <input
                                type="text"
                                value={stage.name}
                                onChange={(e) =>
                                  handleDeliverableChange(
                                    plan._id,
                                    deliverableIndex,
                                    `stages[${stageIndex}].name`,
                                    e.target.value
                                  )
                                }
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                              />
                            </div>
                            {/* Substages */}
                            <div className="space-y-2">
                              <h6 className="text-sm font-medium">Substages</h6>
                              {stage.substages.map(
                                (substage, substageIndex) => (
                                  <div
                                    key={substageIndex}
                                    className="border p-2 rounded-md"
                                  >
                                    <label className="block text-sm font-medium text-gray-700">
                                      Substage Name
                                    </label>
                                    <input
                                      type="text"
                                      value={substage.name}
                                      onChange={(e) =>
                                        handleDeliverableChange(
                                          plan._id,
                                          deliverableIndex,
                                          `stages[${stageIndex}].substages[${substageIndex}].name`,
                                          e.target.value
                                        )
                                      }
                                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                    />
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  {/* Add Deliverable Form */}
                  <div className="border p-4 rounded-lg">
                    <h4 className="text-md font-medium mb-2">
                      Add Deliverable
                    </h4>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Type
                      </label>
                      <input
                        type="text"
                        value={newDeliverable.type}
                        onChange={(e) =>
                          setNewDeliverable({
                            ...newDeliverable,
                            type: e.target.value,
                          })
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Quantity
                      </label>
                      <input
                        type="number"
                        value={newDeliverable.quantity}
                        onChange={(e) =>
                          setNewDeliverable({
                            ...newDeliverable,
                            quantity: e.target.value,
                          })
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                      />
                    </div>
                    <button
                      onClick={() => handleAddDeliverable(plan._id)}
                      className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      Add Deliverable
                    </button>
                  </div>
                </div>
                {/* Save and Cancel Buttons */}
                <div className="mt-6 flex justify-end space-x-4">
                  <button
                    onClick={() => setEditingPlanId(null)}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setEditingPlanId(null)} // Save changes (for now, just exit edit mode)
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            ) : (
              // View Mode: Show Plan Details
              <>
                <h2 className="text-xl font-semibold mb-2">{plan.plan_name}</h2>
                <p className="text-gray-600 mb-4">
                  <span className="font-medium">Frequency:</span>{" "}
                  {plan.frequency}
                </p>
                <p className="text-gray-600 mb-4">
                  <span className="font-medium">Price:</span> ${plan.price}
                </p>
                {/* Deliverables */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Deliverables</h3>
                  {plan.deliverables.map((deliverable, deliverableIndex) => (
                    <div
                      key={deliverableIndex}
                      className="border p-4 rounded-lg"
                    >
                      <h4 className="text-md font-medium">
                        {deliverable.type} (Quantity: {deliverable.quantity})
                      </h4>
                      {/* Stages */}
                      <div className="space-y-2">
                        {deliverable.stages.map((stage, stageIndex) => (
                          <div
                            key={stageIndex}
                            className="border p-2 rounded-md"
                          >
                            <h5 className="text-sm font-medium">
                              {stage.name}
                            </h5>
                            {/* Substages */}
                            <div className="space-y-1">
                              {stage.substages.map(
                                (substage, substageIndex) => (
                                  <p
                                    key={substageIndex}
                                    className="text-sm text-gray-600"
                                  >
                                    - {substage.name}
                                  </p>
                                )
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                {/* Edit Button */}
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setEditingPlanId(plan._id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlanPage;

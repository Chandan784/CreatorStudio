"use client"; // Mark as a Client Component

import React, { useState } from "react";

export default function EquipmentManagementPage() {
  // State for equipment list
  const [equipmentList, setEquipmentList] = useState([]);

  // State for form inputs
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [model, setModel] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [additionalQuestions, setAdditionalQuestions] = useState("");
  const [photo, setPhoto] = useState(null);

  // State for editing equipment
  const [editingId, setEditingId] = useState(null);

  // Handle form submission (add or update equipment)
  const handleSubmit = (e) => {
    e.preventDefault();

    const newEquipment = {
      id: editingId || Date.now(), // Use existing ID for update or generate new ID
      category,
      subcategory,
      model,
      quantity,
      additionalQuestions,
      photo: photo ? URL.createObjectURL(photo) : null,
    };

    if (editingId) {
      // Update existing equipment
      setEquipmentList((prev) =>
        prev.map((item) => (item.id === editingId ? newEquipment : item))
      );
      setEditingId(null); // Reset editing state
    } else {
      // Add new equipment
      setEquipmentList((prev) => [...prev, newEquipment]);
    }

    // Reset form fields
    setCategory("");
    setSubcategory("");
    setModel("");
    setQuantity(1);
    setAdditionalQuestions("");
    setPhoto(null);
  };

  // Handle editing equipment
  const handleEdit = (equipment) => {
    setCategory(equipment.category);
    setSubcategory(equipment.subcategory);
    setModel(equipment.model);
    setQuantity(equipment.quantity);
    setAdditionalQuestions(equipment.additionalQuestions);
    setPhoto(null); // Reset photo (can't edit photo directly)
    setEditingId(equipment.id);
  };

  // Handle deleting equipment
  const handleDelete = (id) => {
    setEquipmentList((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="p-6 max-w-6xl mx-auto font-sans">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">
        Equipment Management
      </h1>

      {/* Add/Update Equipment Form */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="p-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subcategory
            </label>
            <input
              type="text"
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              className="p-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Model
            </label>
            <input
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="p-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantity
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="p-2 border border-gray-300 rounded-md w-full"
              min="1"
              required
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional Questions
          </label>
          <textarea
            value={additionalQuestions}
            onChange={(e) => setAdditionalQuestions(e.target.value)}
            className="p-2 border border-gray-300 rounded-md w-full"
            rows="3"
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Photo of Equipment
          </label>
          <input
            type="file"
            onChange={(e) => setPhoto(e.target.files[0])}
            className="p-2 border border-gray-300 rounded-md w-full"
            accept="image/*"
          />
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            {editingId ? "Update Equipment" : "Add Equipment"}
          </button>
        </div>
      </form>

      {/* Equipment List */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Equipment List
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Category
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Subcategory
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Model
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Quantity
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Additional Questions
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Photo
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {equipmentList.map((equipment) => (
                <tr key={equipment.id} className="border-b border-gray-200">
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {equipment.category}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {equipment.subcategory}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {equipment.model}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {equipment.quantity}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {equipment.additionalQuestions}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {equipment.photo && (
                      <img
                        src={equipment.photo}
                        alt="Equipment"
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    )}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    <button
                      onClick={() => handleEdit(equipment)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-md text-sm hover:bg-yellow-600 transition duration-300 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(equipment.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600 transition duration-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

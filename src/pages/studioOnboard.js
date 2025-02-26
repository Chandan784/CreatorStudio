"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Trash2, Plus } from "lucide-react";
import "../app/globals.css";

const categories = {
  Camera: {
    DSLR: ["Canon EOS R5", "Nikon Z9", "Sony A7 III"],
    Mirrorless: ["Sony A7C", "Fujifilm X-T4", "Canon EOS RP"],
  },
  Microphone: {
    Dynamic: ["Shure SM7B", "Electro-Voice RE20", "Sennheiser MD421"],
    Condenser: ["Neumann TLM 103", "AKG C414", "Rode NT1-A"],
  },
  Tripod: {
    Standard: ["Manfrotto 055", "Vanguard Alta Pro", "Gitzo GT3543"],
    Compact: ["Joby GorillaPod", "Benro MeFoto", "Sirui T-025X"],
  },
};

// Default questions for each category
const defaultQuestions = {
  Camera: [
    "Is the equipment under warranty?",
    "Does it come with a lens?",
    "Is it suitable for professional use?",
  ],
  Microphone: [
    "Is it a USB or XLR microphone?",
    "Does it come with a pop filter?",
    "Is it suitable for studio recording?",
  ],
  Tripod: [
    "Is it made of aluminum or carbon fiber?",
    "What is the maximum load capacity?",
    "Is it suitable for outdoor use?",
  ],
};

const StudioOnboardingForm = () => {
  const [studio, setStudio] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    landmark: "",
    location: "",
    city: "",
    area: "",
    pincode: "",
    facilities: "",
    images: [],
  });

  const [studioImagePreviews, setStudioImagePreviews] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [errors, setErrors] = useState({});

  // Validation rules
  const validateField = (name, value) => {
    switch (name) {
      case "name":
        return value.trim() ? "" : "Name is required.";
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? ""
          : "Invalid email address.";
      case "phone":
        return /^\d{10}$/.test(value) ? "" : "Phone number must be 10 digits.";
      case "address":
        return value.trim() ? "" : "Address is required.";
      case "city":
        return value.trim() ? "" : "City is required.";
      case "area":
        return value.trim() ? "" : "Area is required.";
      case "pincode":
        return /^\d{6}$/.test(value) ? "" : "Pincode must be 6 digits.";
      case "facilities":
        return value.trim() ? "" : "Facilities description is required.";
      default:
        return "";
    }
  };

  const handleStudioChange = (e) => {
    const { name, value } = e.target;
    setStudio({ ...studio, [name]: value });
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  const handleStudioImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setStudio({ ...studio, images: [...studio.images, ...files] });
    setStudioImagePreviews([
      ...studioImagePreviews,
      ...files.map((file) => URL.createObjectURL(file)),
    ]);
  };

  const removeStudioImage = (index) => {
    setStudioImagePreviews(studioImagePreviews.filter((_, i) => i !== index));
    setStudio({
      ...studio,
      images: studio.images.filter((_, i) => i !== index),
    });
  };

  const handleEquipmentChange = (index, field, value) => {
    const updatedEquipment = [...equipment];
    updatedEquipment[index][field] = value;
    if (field === "category") {
      updatedEquipment[index]["subcategory"] = "";
      updatedEquipment[index]["model"] = "";
    }
    if (field === "subcategory") {
      updatedEquipment[index]["model"] = "";
    }
    setEquipment(updatedEquipment);
  };

  const handleEquipmentImageUpload = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const updatedEquipment = [...equipment];
      updatedEquipment[index].image = file;
      updatedEquipment[index].imagePreview = URL.createObjectURL(file);
      setEquipment(updatedEquipment);
    }
  };

  const handleQuestionAnswerChange = (index, questionIndex, answer) => {
    const updatedEquipment = [...equipment];
    if (!updatedEquipment[index].questions) {
      updatedEquipment[index].questions = {};
    }
    updatedEquipment[index].questions[questionIndex] = answer;
    setEquipment(updatedEquipment);
  };

  const addEquipment = () => {
    setEquipment([
      ...equipment,
      {
        category: "",
        subcategory: "",
        model: "",
        quantity: 1,
        image: null,
        imagePreview: null,
        questions: {},
      },
    ]);
  };

  const removeEquipment = (index) => {
    setEquipment(equipment.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(studio).forEach((field) => {
      if (field !== "images") {
        newErrors[field] = validateField(field, studio[field]);
      }
    });
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        // Prepare the data to send to the backend
        const payload = {
          studio: {
            ...studio,
            images: studioImagePreviews, // Send image previews as URLs
          },
          equipment,
        };

        // Make the API call
        const response = await fetch("http://localhost:8000/api/v1/studio", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error("Failed to submit the form");
        }

        const data = await response.json();
        console.log("Form Submitted Successfully:", data);
        alert("Form submitted successfully!");
      } catch (error) {
        console.error("Error submitting the form:", error);
        alert("Failed to submit the form. Please try again.");
      }
    } else {
      console.log("Form has errors. Please fix them.");
    }
  };

  return (
    <motion.div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-xl space-y-6">
      <h2 className="text-3xl font-bold text-center">Studio Onboarding</h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20 relative"
      >
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Studio Details</h3>
          {Object.keys(studio)
            .slice(0, -1)
            .map((field) => (
              <div key={field}>
                <label className="block font-medium capitalize">{field}</label>
                {field === "facilities" ? (
                  <textarea
                    name={field}
                    value={studio[field]}
                    onChange={handleStudioChange}
                    className="w-full border rounded-md p-2"
                    rows={4}
                    required
                  />
                ) : (
                  <input
                    type={
                      field === "email"
                        ? "email"
                        : field === "phone" || field === "pincode"
                        ? "number"
                        : "text"
                    }
                    name={field}
                    value={studio[field]}
                    onChange={handleStudioChange}
                    className="w-full border rounded-md p-2"
                    required
                  />
                )}
                {errors[field] && (
                  <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
                )}
              </div>
            ))}
          <label className="block font-medium">Upload Studio Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleStudioImageUpload}
            className="border p-2 rounded-md w-full"
          />
          <div className="mt-3 flex gap-3 flex-wrap">
            {studioImagePreviews.map((src, index) => (
              <div key={index} className="relative">
                <img
                  src={src}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-md border"
                />
                <button
                  type="button"
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                  onClick={() => removeStudioImage(index)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Equipment Details</h3>
          {equipment.map((eq, index) => (
            <div key={index} className="p-4 border rounded-md relative">
              <button
                type="button"
                className="absolute top-2 right-2 text-red-500"
                onClick={() => removeEquipment(index)}
              >
                <Trash2 size={18} />
              </button>
              <label>Category</label>
              <select
                value={eq.category}
                onChange={(e) =>
                  handleEquipmentChange(index, "category", e.target.value)
                }
                className="w-full border rounded-md p-2"
                required
              >
                <option value="">Select Category</option>
                {Object.keys(categories).map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {eq.category && (
                <>
                  <label>Subcategory</label>
                  <select
                    value={eq.subcategory}
                    onChange={(e) =>
                      handleEquipmentChange(
                        index,
                        "subcategory",
                        e.target.value
                      )
                    }
                    className="w-full border rounded-md p-2"
                    required
                  >
                    <option value="">Select Subcategory</option>
                    {Object.keys(categories[eq.category] || {}).map((sub) => (
                      <option key={sub} value={sub}>
                        {sub}
                      </option>
                    ))}
                  </select>
                  <label>Model</label>
                  <select
                    value={eq.model}
                    onChange={(e) =>
                      handleEquipmentChange(index, "model", e.target.value)
                    }
                    className="w-full border rounded-md p-2"
                    required
                  >
                    <option value="">Select Model</option>
                    {(categories[eq.category]?.[eq.subcategory] || []).map(
                      (model) => (
                        <option key={model} value={model}>
                          {model}
                        </option>
                      )
                    )}
                  </select>
                  <label>Quantity</label>
                  <select
                    value={eq.quantity}
                    onChange={(e) =>
                      handleEquipmentChange(index, "quantity", e.target.value)
                    }
                    className="w-full border rounded-md p-2"
                    required
                  >
                    {[...Array(10).keys()].map((num) => (
                      <option key={num + 1} value={num + 1}>
                        {num + 1}
                      </option>
                    ))}
                  </select>
                  <label>Upload Equipment Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleEquipmentImageUpload(index, e)}
                    className="border p-2 rounded-md w-full"
                  />
                  {eq.imagePreview && (
                    <div className="mt-3">
                      <img
                        src={eq.imagePreview}
                        alt="Equipment Preview"
                        className="w-32 h-32 object-cover rounded-md border"
                      />
                    </div>
                  )}
                  {defaultQuestions[eq.category] && (
                    <div className="mt-4">
                      <h4 className="font-medium">Default Questions:</h4>
                      <ul className="space-y-2">
                        {defaultQuestions[eq.category].map(
                          (question, questionIndex) => (
                            <li
                              key={questionIndex}
                              className="text-sm text-gray-600"
                            >
                              <label>{question}</label>
                              <input
                                type="text"
                                value={eq.questions?.[questionIndex] || ""}
                                onChange={(e) =>
                                  handleQuestionAnswerChange(
                                    index,
                                    questionIndex,
                                    e.target.value
                                  )
                                }
                                className="w-full border rounded-md p-2 mt-1"
                                placeholder="Your answer"
                              />
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addEquipment}
            className="w-full p-2 bg-gray-300 rounded-md flex items-center justify-center gap-2"
          >
            <Plus size={18} />
            Add Equipment
          </button>
        </div>
        <button
          type="submit"
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-2/3 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Submit
        </button>
      </form>
    </motion.div>
  );
};

export default StudioOnboardingForm;

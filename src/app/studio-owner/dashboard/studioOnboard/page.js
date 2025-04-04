"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Trash2, Plus, ChevronDown, ChevronUp } from "lucide-react";

// Facilities options
const facilitiesOptions = [
  "Wi-Fi",
  "Parking",
  "Air Conditioning",
  "Soundproofing",
  "Lighting Equipment",
  "Green Room",
  "Catering",
  "Restrooms",
  "Wardrobe",
  "Makeup Room",
];

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
  // State for studio details
  const [studio, setStudio] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    landmark: "",
    location: "",
    city: "",
    googleMapLink: "",
    pincode: "",
    facilities: [],
    images: [],
  });

  // State for studio image previews
  const [studioImagePreviews, setStudioImagePreviews] = useState([]);

  // State for equipment
  const [equipment, setEquipment] = useState([]);

  // State for form errors
  const [errors, setErrors] = useState({});

  // State for open/close sections
  const [openSection, setOpenSection] = useState("basic");

  // Toggle section visibility
  const toggleSection = (section) => {
    setOpenSection(openSection === section ? "" : section);
  };

  // Handle facilities selection
  const handleFacilitiesChange = (e) => {
    const { value, checked } = e.target;
    setStudio((prev) => {
      const facilities = checked
        ? [...prev.facilities, value]
        : prev.facilities.filter((item) => item !== value);
      return { ...prev, facilities };
    });
  };

  // Validate form fields
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
      case "pincode":
        return /^\d{6}$/.test(value) ? "" : "Pincode must be 6 digits.";
      case "facilities":
        return value.length > 0 ? "" : "At least one facility is required.";
      default:
        return "";
    }
  };

  // Handle studio input changes
  const handleStudioChange = (e) => {
    const { name, value } = e.target;
    setStudio({ ...studio, [name]: value });
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  // Handle studio image upload
  const handleStudioImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + studio.images.length > 5) {
      alert("You can upload a maximum of 5 images.");
      return;
    }
    setStudio({ ...studio, images: [...studio.images, ...files] });
    setStudioImagePreviews([
      ...studioImagePreviews,
      ...files.map((file) => URL.createObjectURL(file)),
    ]);
  };

  // Remove studio image
  const removeStudioImage = (index) => {
    setStudioImagePreviews(studioImagePreviews.filter((_, i) => i !== index));
    setStudio({
      ...studio,
      images: studio.images.filter((_, i) => i !== index),
    });
  };

  // Handle equipment input changes
  const handleEquipmentChange = (index, field, value) => {
    const updatedEquipment = [...equipment];
    updatedEquipment[index][field] = value;

    // Reset subcategory and model if category changes
    if (field === "category") {
      updatedEquipment[index].subcategory = "";
      updatedEquipment[index].model = "";
    }

    // Reset model if subcategory changes
    if (field === "subcategory") {
      updatedEquipment[index].model = "";
    }

    setEquipment(updatedEquipment);
  };

  // Handle equipment image upload
  const handleEquipmentImageUpload = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const updatedEquipment = [...equipment];
      updatedEquipment[index].image = file;
      updatedEquipment[index].imagePreview = URL.createObjectURL(file);
      setEquipment(updatedEquipment);
    }
  };

  // Add new equipment
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

  // Remove equipment
  const removeEquipment = (index) => {
    setEquipment(equipment.filter((_, i) => i !== index));
  };

  // Handle question answer changes
  const handleQuestionAnswerChange = (index, questionIndex, answer) => {
    const updatedEquipment = [...equipment];
    if (!updatedEquipment[index].questions) {
      updatedEquipment[index].questions = {};
    }
    updatedEquipment[index].questions[questionIndex] = answer;
    setEquipment(updatedEquipment);
  };

  // Validate the entire form
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const payload = {
          studio: {
            ...studio,
            images: studioImagePreviews, // Send image previews as URLs
          },
          equipment,
        };

        // Make the API call
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/studio`, {
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
    <motion.div
      className="max-w-6xl mx-auto p-4 bg-white rounded-lg shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Studio Onboarding
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Details Section */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <button
            type="button"
            onClick={() => toggleSection("basic")}
            className="w-full flex justify-between items-center text-lg font-medium text-gray-700"
          >
            <span>Basic Details</span>
            {openSection === "basic" ? <ChevronUp /> : <ChevronDown />}
          </button>
          {openSection === "basic" && (
            <div className="mt-4 space-y-4">
              {["name", "email", "phone"].map((field) => (
                <div key={field} className="space-y-1">
                  <label className="text-sm font-medium text-gray-600">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type={
                      field === "email"
                        ? "email"
                        : field === "phone"
                        ? "tel"
                        : "text"
                    }
                    name={field}
                    value={studio[field]}
                    onChange={handleStudioChange}
                    className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  {errors[field] && (
                    <p className="text-red-500 text-xs mt-1">{errors[field]}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Address Section */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <button
            type="button"
            onClick={() => toggleSection("address")}
            className="w-full flex justify-between items-center text-lg font-medium text-gray-700"
          >
            <span>Address</span>
            {openSection === "address" ? <ChevronUp /> : <ChevronDown />}
          </button>
          {openSection === "address" && (
            <div className="mt-4 space-y-4">
              {["address", "landmark", "city", "pincode"].map((field) => (
                <div key={field} className="space-y-1">
                  <label className="text-sm font-medium text-gray-600">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type={field === "pincode" ? "number" : "text"}
                    name={field}
                    value={studio[field]}
                    onChange={handleStudioChange}
                    className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  {errors[field] && (
                    <p className="text-red-500 text-xs mt-1">{errors[field]}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Facilities Section */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <button
            type="button"
            onClick={() => toggleSection("facilities")}
            className="w-full flex justify-between items-center text-lg font-medium text-gray-700"
          >
            <span>Facilities</span>
            {openSection === "facilities" ? <ChevronUp /> : <ChevronDown />}
          </button>
          {openSection === "facilities" && (
            <div className="mt-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {facilitiesOptions.map((facility) => (
                  <motion.label
                    key={facility}
                    className="flex items-center space-x-2 p-3 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <input
                      type="checkbox"
                      value={facility}
                      checked={studio.facilities.includes(facility)}
                      onChange={handleFacilitiesChange}
                      className="form-checkbox h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{facility}</span>
                  </motion.label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Studio Images Upload Section */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <button
            type="button"
            onClick={() => toggleSection("images")}
            className="w-full flex justify-between items-center text-lg font-medium text-gray-700"
          >
            <span>Studio Images</span>
            {openSection === "images" ? <ChevronUp /> : <ChevronDown />}
          </button>
          {openSection === "images" && (
            <div className="mt-4 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">
                  Upload Studio Images (Max 5)
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleStudioImageUpload}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>

              {/* Image Previews */}
              <div className="mt-2 flex flex-wrap gap-2">
                {studioImagePreviews.map((src, index) => (
                  <div key={index} className="relative">
                    <img
                      src={src}
                      alt={`Studio Preview ${index + 1}`}
                      className="w-20 h-20 object-cover rounded-md border border-gray-200"
                    />
                    <button
                      type="button"
                      className="absolute top-1 right-1 bg-white rounded-full p-1 hover:bg-gray-100"
                      onClick={() => removeStudioImage(index)}
                    >
                      <Trash2 size={14} className="text-gray-600" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Equipment Section */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <button
            type="button"
            onClick={() => toggleSection("equipment")}
            className="w-full flex justify-between items-center text-lg font-medium text-gray-700"
          >
            <span>Equipment Details</span>
            {openSection === "equipment" ? <ChevronUp /> : <ChevronDown />}
          </button>
          {openSection === "equipment" && (
            <div className="mt-4 space-y-4">
              {equipment.map((eq, index) => (
                <motion.div
                  key={index}
                  className="p-4 border border-gray-200 rounded-md bg-white"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <button
                    type="button"
                    className="float-right text-gray-500 hover:text-gray-700"
                    onClick={() => removeEquipment(index)}
                  >
                    <Trash2 size={16} />
                  </button>
                  <div className="space-y-3">
                    {/* Category */}
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-600">
                        Category
                      </label>
                      <select
                        value={eq.category}
                        onChange={(e) =>
                          handleEquipmentChange(
                            index,
                            "category",
                            e.target.value
                          )
                        }
                        className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      >
                        <option value="">Select Category</option>
                        {Object.keys(categories).map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Subcategory */}
                    {eq.category && (
                      <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-600">
                          Subcategory
                        </label>
                        <select
                          value={eq.subcategory}
                          onChange={(e) =>
                            handleEquipmentChange(
                              index,
                              "subcategory",
                              e.target.value
                            )
                          }
                          className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        >
                          <option value="">Select Subcategory</option>
                          {Object.keys(categories[eq.category] || {}).map(
                            (sub) => (
                              <option key={sub} value={sub}>
                                {sub}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                    )}

                    {/* Model */}
                    {eq.subcategory && (
                      <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-600">
                          Model
                        </label>
                        <select
                          value={eq.model}
                          onChange={(e) =>
                            handleEquipmentChange(
                              index,
                              "model",
                              e.target.value
                            )
                          }
                          className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        >
                          <option value="">Select Model</option>
                          {(
                            categories[eq.category]?.[eq.subcategory] || []
                          ).map((model) => (
                            <option key={model} value={model}>
                              {model}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* Quantity */}
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-600">
                        Quantity
                      </label>
                      <select
                        value={eq.quantity}
                        onChange={(e) =>
                          handleEquipmentChange(
                            index,
                            "quantity",
                            e.target.value
                          )
                        }
                        className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      >
                        {[...Array(10).keys()].map((num) => (
                          <option key={num + 1} value={num + 1}>
                            {num + 1}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Equipment Image Upload */}
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-600">
                        Upload Equipment Image
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleEquipmentImageUpload(index, e)}
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                      {eq.imagePreview && (
                        <div className="mt-2">
                          <img
                            src={eq.imagePreview}
                            alt="Equipment Preview"
                            className="w-20 h-20 object-cover rounded-md border border-gray-200"
                          />
                        </div>
                      )}
                    </div>

                    {/* Default Questions */}
                    {defaultQuestions[eq.category] && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-gray-600">
                          Default Questions:
                        </h4>
                        <ul className="space-y-2">
                          {defaultQuestions[eq.category].map(
                            (question, questionIndex) => (
                              <li
                                key={questionIndex}
                                className="text-xs text-gray-600"
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
                                  className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  placeholder="Your answer"
                                />
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              <button
                type="button"
                onClick={addEquipment}
                className="w-full p-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors"
              >
                <Plus size={14} className="inline mr-2" />
                Add Equipment
              </button>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
          >
            Submit
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default StudioOnboardingForm;

"use client";

import { Images } from "lucide-react";
import { useState, useEffect } from "react";

// Define the base URL for the backend
const BASE_URL = "http://localhost:8000/api/v1/requirements";

export default function InfluencerRequirementForm({ userId }) {
  // State for form data
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    niche: "",
    profilePhoto: "",
    platforms: "",
    followers: "",
    goal: "",
    challenges: [],
    services: [],
    budget: "",
    agencySizePreference: "",
    timeline: "",
    accountManager: false,
    consultationCall: false,
  });

  // State for loading and editing mode
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch existing data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/users/${userId}/requirements`
        );
        if (!response.ok) throw new Error("Failed to fetch data");
        const result = await response.json();

        // Extract the data from the response
        const data = result.data;

        // Normalize data to ensure all fields are initialized
        const normalizedData = {
          niche: data.niche || "",
          platforms: data.platforms || "",
          followers: data.followers || "",
          goal: data.goal || "",
          challenges: data.challenges || [], // Ensure challenges is an array
          services: data.services || [], // Ensure services is an array
          budget: data.budget || "",
          agencySizePreference: data.agencySizePreference || "",
          timeline: data.timeline || "",
          accountManager: data.accountManager || false, // Default to false if missing
          consultationCall: data.consultationCall || false, // Default to false if missing
        };

        setFormData(normalizedData);
        setIsEditing(true); // If data exists, we are in edit mode
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      if (Array.isArray(formData[name])) {
        // Handle checkboxes for arrays (e.g., challenges, services)
        setFormData((prev) => ({
          ...prev,
          [name]: checked
            ? [...prev[name], value] // Add value if checked
            : prev[name].filter((item) => item !== value), // Remove value if unchecked
        }));
      } else {
        // Handle checkboxes for booleans (e.g., accountManager, consultationCall)
        setFormData((prev) => ({
          ...prev,
          [name]: checked,
        }));
      }
    } else {
      // Handle other input types (text, select, etc.)
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${BASE_URL}/users/${userId}/requirements`;
    const method = isEditing ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Failed to save data");
      alert("Data saved successfully!");
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Failed to save data.");
    }
  };

  // Show loading state while fetching data
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Influencer Form
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Niche */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              What is your niche?
            </label>
            <input
              type="text"
              name="niche"
              value={formData.niche}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Tech, Fashion, Fitness"
            />
          </div>

          {/* Platforms */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Which platforms do you primarily use?
            </label>
            <input
              type="text"
              name="platforms"
              value={formData.platforms}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Instagram, YouTube, TikTok"
            />
          </div>

          {/* Followers */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              What are your current follower counts?
            </label>
            <input
              type="text"
              name="followers"
              value={formData.followers}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 10k, 100k"
            />
          </div>

          {/* Goal */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              What is your primary goal?
            </label>
            <select
              name="goal"
              value={formData.goal}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select</option>
              <option value="grow audience">Grow audience</option>
              <option value="increase engagement">Increase engagement</option>
              <option value="get brand deals">Get brand deals</option>
              <option value="sell products/courses">
                Sell your own products/courses
              </option>
            </select>
          </div>

          {/* Challenges */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              What challenges are you facing?
            </label>
            <div className="space-y-2">
              {[
                "low engagement",
                "difficulty in getting brand collaborations",
                "poor content reach",
                "need better content strategy",
              ].map((challenge) => (
                <label key={challenge} className="flex items-center">
                  <input
                    type="checkbox"
                    name="challenges"
                    value={challenge}
                    checked={formData.challenges.includes(challenge)}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span className="text-gray-700">{challenge}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              What kind of services are you looking for?
            </label>
            <div className="space-y-2">
              {[
                "social media management",
                "paid ads & influencer marketing",
                "content creation",
                "personal branding & growth strategy",
              ].map((service) => (
                <label key={service} className="flex items-center">
                  <input
                    type="checkbox"
                    name="services"
                    value={service}
                    checked={formData.services.includes(service)}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span className="text-gray-700">{service}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Budget */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Do you have a budget in mind?
            </label>
            <input
              type="text"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., $500 - $5000"
            />
          </div>

          {/* Agency Size Preference */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Do you have a preferred marketing agency size?
            </label>
            <select
              name="agencySizePreference"
              value={formData.agencySizePreference}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select</option>
              <option value="freelancer">Freelancer</option>
              <option value="small agency">Small Agency</option>
              <option value="large agency">Large Agency</option>
            </select>
          </div>

          {/* Timeline */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              What is your expected timeline for results?
            </label>
            <select
              name="timeline"
              value={formData.timeline}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select</option>
              <option value="1-3 months">1-3 months</option>
              <option value="long-term">Long-term</option>
            </select>
          </div>

          {/* Account Manager */}
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="accountManager"
                checked={formData.accountManager}
                onChange={handleChange}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">
                Do you need a dedicated account manager?
              </span>
            </label>
          </div>

          {/* Consultation Call */}
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="consultationCall"
                checked={formData.consultationCall}
                onChange={handleChange}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">
                Are you open to a consultation call before selecting an agency?
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            {isEditing ? "Update" : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
}

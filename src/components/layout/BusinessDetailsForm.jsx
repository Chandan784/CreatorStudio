"use client";

import { useState } from "react";

export default function BusinessRequirementForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    industry: "",
    businessSize: "",
    targetAudience: {
      ageRange: "",
      gender: "",
      location: "",
      interests: [],
    },
    marketingGoals: [],
    currentStrategies: [],
    challenges: [],
    services: [],
    budget: "",
    agencySizePreference: "",
    timeline: "",
    accountManager: false,
    consultationCall: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      if (["accountManager", "consultationCall"].includes(name)) {
        // Handle boolean checkboxes
        setFormData((prev) => ({
          ...prev,
          [name]: checked,
        }));
      } else {
        // Handle array-based checkboxes
        setFormData((prev) => ({
          ...prev,
          [name]: checked
            ? [...prev[name], value]
            : prev[name].filter((item) => item !== value),
        }));
      }
    } else if (name.startsWith("targetAudience.")) {
      // Handle nested object fields
      const nestedKey = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        targetAudience: {
          ...prev.targetAudience,
          [nestedKey]: nestedKey === "interests" ? value.split(",") : value, // Convert interests to an array
        },
      }));
    } else {
      // Handle regular inputs
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.industry ||
      !formData.businessSize ||
      !formData.targetAudience.ageRange
    ) {
      alert("Please fill out all required fields.");
      return;
    }

    console.log("Business Form Data:", formData);
    // Handle form submission (e.g., send to an API)
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Business Form
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Industry */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              What is your industry? <span className="text-red-500">*</span>
            </label>
            <select
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select</option>
              <option value="e-commerce">E-commerce</option>
              <option value="healthcare">Healthcare</option>
              <option value="saas">SaaS</option>
              <option value="real estate">Real Estate</option>
            </select>
          </div>

          {/* Business Size */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              What is your business size?{" "}
              <span className="text-red-500">*</span>
            </label>
            <select
              name="businessSize"
              value={formData.businessSize}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select</option>
              <option value="startup">Startup</option>
              <option value="small business">Small Business</option>
              <option value="large enterprise">Large Enterprise</option>
            </select>
          </div>

          {/* Target Audience */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Who is your target audience?{" "}
              <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="targetAudience.ageRange"
                value={formData.targetAudience.ageRange}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Age Range"
                required
              />
              <select
                name="targetAudience.gender"
                value={formData.targetAudience.gender}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Gender</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="Both">Both</option>
              </select>
              <input
                type="text"
                name="targetAudience.location"
                value={formData.targetAudience.location}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Location"
              />
              <input
                type="text"
                name="targetAudience.interests"
                value={formData.targetAudience.interests.join(",")} // Convert array to string for input
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Interests (comma-separated)"
              />
            </div>
          </div>

          {/* Marketing Goals */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              What are your marketing goals?
            </label>
            <div className="space-y-2">
              {[
                "brand awareness",
                "lead generation",
                "sales conversion",
                "community building",
              ].map((goal) => (
                <label key={goal} className="flex items-center">
                  <input
                    type="checkbox"
                    name="marketingGoals"
                    value={goal}
                    checked={formData.marketingGoals.includes(goal)}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span className="text-gray-700">{goal}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Current Strategies */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              What marketing strategies are you currently using?
            </label>
            <div className="space-y-2">
              {[
                "organic social media growth",
                "paid advertising",
                "email marketing",
                "influencer collaborations",
              ].map((strategy) => (
                <label key={strategy} className="flex items-center">
                  <input
                    type="checkbox"
                    name="currentStrategies"
                    value={strategy}
                    checked={formData.currentStrategies.includes(strategy)}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span className="text-gray-700">{strategy}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Challenges */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              What challenges are you facing?
            </label>
            <div className="space-y-2">
              {[
                "low ROI on ads",
                "poor brand visibility",
                "high competition",
                "low engagement",
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
              What kind of services do you need?
            </label>
            <div className="space-y-2">
              {[
                "social media marketing",
                "paid advertising",
                "content creation",
                "SEO & Website Optimization",
                "performance marketing & growth hacking",
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
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

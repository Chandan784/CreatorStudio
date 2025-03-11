"use client";

import { useState } from "react";

export default function AgencyRequirementForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    images: [],
    agencyWebsite: "",
    agencyDescription: "",
    agencySize: "",
    yearsOfExperience: "",
    location: "",
    languages: [],
    clientType: "",
    marketingServices: [],
    budgetRange: "",
    industries: [],
    preferredClientSize: "",
    marketingGoals: [],
    shortTermProjects: "",
    performanceBasedPricing: "",
    dedicatedAccountManager: "",
    initialConsultation: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked
          ? [...prev[name], value]
          : prev[name].filter((item) => item !== value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Agency Form Data:", formData);
    // Handle form submission (e.g., send to an API)
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Agency Form
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Agency Information */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-800">
              Basic Agency Information
            </h3>

            {/* Agency Name */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Agency Name
              </label>
              <input
                type="text"
                name="agencyName"
                value={formData.agencyName}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter agency name"
                required
              />
            </div>

            {/* Agency Website */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Agency Website
              </label>
              <input
                type="url"
                name="agencyWebsite"
                value={formData.agencyWebsite}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter agency website"
              />
            </div>

            {/* Agency Description */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Agency Description
              </label>
              <textarea
                name="agencyDescription"
                value={formData.agencyDescription}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={5}
                placeholder="Describe your agency"
              />
            </div>

            {/* Agency Size */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Agency Size
              </label>
              <select
                name="agencySize"
                value={formData.agencySize}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select agency size</option>
                <option value="Freelancer">Freelancer</option>
                <option value="Small Team (1-10 members)">
                  Small Team (1-10 members)
                </option>
                <option value="Medium Agency (11-50 members)">
                  Medium Agency (11-50 members)
                </option>
                <option value="Large Agency (50+ members)">
                  Large Agency (50+ members)
                </option>
              </select>
            </div>

            {/* Years of Experience */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Years of Experience in Marketing
              </label>
              <select
                name="yearsOfExperience"
                value={formData.yearsOfExperience}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select years of experience</option>
                <option value="<1 year">Less than 1 year</option>
                <option value="1-3 years">1-3 years</option>
                <option value="3-5 years">3-5 years</option>
                <option value="5+ years">5+ years</option>
              </select>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="location"
                    value="Local"
                    checked={formData.location.includes("Local")}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span className="text-gray-700">
                    Local (specific city/country)
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="location"
                    value="Global"
                    checked={formData.location.includes("Global")}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span className="text-gray-700">Global</span>
                </label>
              </div>
            </div>

            {/* Languages */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Languages
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  "English",
                  "Spanish",
                  "French",
                  "German",
                  "Chinese",
                  "Other",
                ].map((language) => (
                  <label key={language} className="flex items-center">
                    <input
                      type="checkbox"
                      name="languages"
                      value={language}
                      checked={formData.languages.includes(language)}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <span className="text-gray-700">{language}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Services Provided */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-800">
              Services Provided
            </h3>

            {/* Client Type */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Which type of clients do you serve?
              </label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="clientType"
                    value="Influencers"
                    checked={formData.clientType === "Influencers"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span className="text-gray-700">Influencers</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="clientType"
                    value="Businesses"
                    checked={formData.clientType === "Businesses"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span className="text-gray-700">Businesses</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="clientType"
                    value="Both"
                    checked={formData.clientType === "Both"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span className="text-gray-700">Both</span>
                </label>
              </div>
            </div>

            {/* Marketing Services */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                What marketing services do you specialize in?
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Social Media Management",
                  "Paid Ads (Google, Meta, TikTok, LinkedIn)",
                  "SEO & Website Optimization",
                  "UGC & Content Creation",
                  "Personal Branding",
                  "Lead Generation & Performance Marketing",
                  "Email Marketing & Automation",
                  "Public Relations & Outreach",
                ].map((service) => (
                  <label key={service} className="flex items-center">
                    <input
                      type="checkbox"
                      name="marketingServices"
                      value={service}
                      checked={formData.marketingServices.includes(service)}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <span className="text-gray-700">{service}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Budget Range */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                What budget range do you work with?
              </label>
              <select
                name="budgetRange"
                value={formData.budgetRange}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select budget range</option>
                <option value="Low (<$500 per month)">
                  Low ({"<$500 per month"})
                </option>
                <option value="Medium ($500-$5000 per month)">
                  Medium ($500-$5000 per month)
                </option>
                <option value="High ($5000+ per month)">
                  High ($5000+ per month)
                </option>
              </select>
            </div>

            {/* Industries */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                What industries do you specialize in?
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  "E-commerce",
                  "Healthcare",
                  "Tech & SaaS",
                  "Education",
                  "Real Estate",
                  "Finance",
                  "Other",
                ].map((industry) => (
                  <label key={industry} className="flex items-center">
                    <input
                      type="checkbox"
                      name="industries"
                      value={industry}
                      checked={formData.industries.includes(industry)}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <span className="text-gray-700">{industry}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Client Preference & Filters */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-800">
              Client Preference & Filters
            </h3>

            {/* Preferred Client Size */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                What is your preferred client size?
              </label>
              <select
                name="preferredClientSize"
                value={formData.preferredClientSize}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select client size</option>
                <option value="Individual influencers">
                  Individual influencers
                </option>
                <option value="Small businesses">Small businesses</option>
                <option value="Medium businesses">Medium businesses</option>
                <option value="Large enterprises">Large enterprises</option>
              </select>
            </div>

            {/* Marketing Goals */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                What marketing goals do you prefer working on?
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Brand awareness",
                  "Lead generation",
                  "Sales conversion",
                  "Community building",
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

            {/* Short-Term Projects */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Are you open to handling short-term projects?
              </label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="shortTermProjects"
                    value="Yes"
                    checked={formData.shortTermProjects === "Yes"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span className="text-gray-700">Yes</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="shortTermProjects"
                    value="No, only long-term"
                    checked={
                      formData.shortTermProjects === "No, only long-term"
                    }
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span className="text-gray-700">No, only long-term</span>
                </label>
              </div>
            </div>

            {/* Performance-Based Pricing */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Do you offer performance-based pricing?
              </label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="performanceBasedPricing"
                    value="Yes"
                    checked={formData.performanceBasedPricing === "Yes"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span className="text-gray-700">Yes</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="performanceBasedPricing"
                    value="No"
                    checked={formData.performanceBasedPricing === "No"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span className="text-gray-700">No</span>
                </label>
              </div>
            </div>

            {/* Dedicated Account Manager */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Do you provide a dedicated account manager?
              </label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="dedicatedAccountManager"
                    value="Yes"
                    checked={formData.dedicatedAccountManager === "Yes"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span className="text-gray-700">Yes</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="dedicatedAccountManager"
                    value="No"
                    checked={formData.dedicatedAccountManager === "No"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span className="text-gray-700">No</span>
                </label>
              </div>
            </div>

            {/* Initial Consultation */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Would you be open to an initial consultation with the client
                before finalizing?
              </label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="initialConsultation"
                    value="Yes"
                    checked={formData.initialConsultation === "Yes"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span className="text-gray-700">Yes</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="initialConsultation"
                    value="No"
                    checked={formData.initialConsultation === "No"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span className="text-gray-700">No</span>
                </label>
              </div>
            </div>
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

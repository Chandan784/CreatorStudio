"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function RechargePage() {
  const [plans] = useState([
    {
      name: "Basic Plan",
      price: 25000,
      validity: "45 days",
      videos: 5,
      platforms: 5,
      features: ["5 videos", "5 platforms", "45-day validity", "Basic support"],
      popular: false,
    },
    {
      name: "Pro Plan",
      price: 35000,
      validity: "60 days",
      videos: 10,
      platforms: 10,
      features: [
        "10 videos",
        "10 platforms",
        "60-day validity",
        "Priority support",
        "Advanced analytics",
      ],
      popular: true,
    },
    {
      name: "Premium Plan",
      price: 50000,
      validity: "90 days",
      videos: 20,
      platforms: 20,
      features: [
        "20 videos",
        "20 platforms",
        "90-day validity",
        "24/7 priority support",
        "Advanced analytics",
        "Dedicated account manager",
      ],
      popular: false,
    },
  ]);

  // Custom Button Component (Defined Inside the File)
  const CustomButton = ({ children, onClick, className }) => (
    <motion.button
      className={`px-6 py-3 rounded-lg shadow-md font-semibold transition-all ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 p-8 mt-12">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Choose Your Plan</h1>
        <p className="text-gray-500 mt-2">
          Select the plan that best suits your needs and grow your audience.
        </p>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-2xl shadow-lg p-6 border-2 border-purple-600 flex flex-col"
            whileHover={{ scale: 1.05 }}
          >
            {/* Popular Badge */}
            {plan.popular && (
              <div className=" w-fit bg-purple-600 text-white text-sm font-semibold px-3 py-1 rounded-full inline-block mb-4">
                Most Popular
              </div>
            )}

            {/* Plan Name */}
            <h2 className="text-2xl font-bold text-gray-800">{plan.name}</h2>

            {/* Price */}
            <p className="text-4xl font-bold text-gray-800 mt-4">
              ₹{plan.price}
            </p>
            <p className="text-gray-500 text-sm mt-1">
              Validity: {plan.validity}
            </p>

            {/* Features List */}
            <ul className="mt-6 space-y-3">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center text-gray-600">
                  <svg
                    className="w-5 h-5 text-purple-600 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>

            {/* Buy Button (Fixed at the Bottom) */}
            <div className="mt-auto pt-6">
              <CustomButton className="w-full bg-purple-600 text-white hover:bg-purple-700">
                {plan.popular ? "Get Started" : "Choose Plan"}
              </CustomButton>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Call-to-Action Section */}
      <div className="mt-8 text-center">
        <p className="text-gray-500">Need help choosing a plan?</p>
        <CustomButton className="mt-4 bg-purple-600 text-white hover:bg-purple-700">
          Contact Us
        </CustomButton>
      </div>
    </div>
  );
}

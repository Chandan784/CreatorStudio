"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function CreatorPlansPage() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/plans/user/${user.id}`)
      .then((response) => {
        setPlans(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching plans:", error);
        setLoading(false);
      });
  }, []);

  const handleTrackerClick = (planId) => {
    router.push(`/creator/tracker?planId=${planId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          My Plans
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              <div className="p-6 flex-1">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {plan.plan_name}
                </h2>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    Frequency: {plan.frequency}
                  </span>
                  <span className="text-sm font-bold text-purple-600">
                    ${plan.price}
                  </span>
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Deliverables
                  </h3>
                  <ul className="space-y-2">
                    {plan.deliverables.map((deliverable, index) => (
                      <li key={index} className="text-sm text-gray-600">
                        {deliverable.type} (Qty: {deliverable.quantity})
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {/* Tracker Button at the Bottom */}
              <div className="p-4 border-t border-gray-200">
                <button
                  onClick={() => handleTrackerClick(plan._id)}
                  className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-300"
                >
                  View Projects
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

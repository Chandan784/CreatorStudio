// app/clients/[clientId]/page.js
"use client";

import { useEffect, useState } from "react";

export default function ClientDetailsPage({ params }) {
  const { clientId } = params;
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch client details based on clientId
  useEffect(() => {
    const fetchClientDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/v1/clients/${clientId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch client details");
        }
        const data = await response.json();
        setClient(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClientDetails();
  }, [clientId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-lg text-gray-700">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-lg text-red-600">Error: {error}</div>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-lg text-gray-700">No client data found.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6">
          <h1 className="text-3xl font-bold text-white">Client Details</h1>
        </div>

        {/* Client Information */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                User ID
              </label>
              <p className="mt-1 text-gray-900 font-medium">
                {client.user_id?._id || "N/A"}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                User Name
              </label>
              <p className="mt-1 text-gray-900 font-medium">
                {client.user_id?.name || "N/A"}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                User Email
              </label>
              <p className="mt-1 text-gray-900 font-medium">
                {client.user_id?.email || "N/A"}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <p className="mt-1 text-gray-900 font-medium">
                {client.description || "N/A"}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Manager
              </label>
              <p className="mt-1 text-gray-900 font-medium">
                {client.manager || "N/A"}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Created At
              </label>
              <p className="mt-1 text-gray-900 font-medium">
                {client.created_at
                  ? new Date(client.created_at).toLocaleString()
                  : "N/A"}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Updated At
              </label>
              <p className="mt-1 text-gray-900 font-medium">
                {client.updated_at
                  ? new Date(client.updated_at).toLocaleString()
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* Plan Information */}
        {client.plan_id && (
          <div className="border-t border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Plan Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Plan Name
                </label>
                <p className="mt-1 text-gray-900 font-medium">
                  {client.plan_id.plan_name || "N/A"}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Frequency
                </label>
                <p className="mt-1 text-gray-900 font-medium">
                  {client.plan_id.frequency || "N/A"}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <p className="mt-1 text-gray-900 font-medium">
                  ${client.plan_id.price || "N/A"}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Deliverables
                </label>
                <p className="mt-1 text-gray-900 font-medium">
                  {client.plan_id.deliverables?.join(", ") || "N/A"}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

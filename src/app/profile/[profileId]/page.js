"use client";

import { useState } from "react";

export default function Profile() {
  // Mock user data (replace with data fetched from your API)
  const [user, setUser] = useState({
    _id: "12345",
    name: "John Doe",
    email: "johndoe@example.com",
    role: "user",
    profilePicture: "https://via.placeholder.com/150", // Placeholder image
  });

  // State to manage edit mode
  const [isEditing, setIsEditing] = useState(false);

  // State to manage password editing
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  // State for password fields
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  // Handle input changes for profile fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Handle input changes for password fields
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  };

  // Handle profile form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    // Add logic to update user data in the backend
    console.log("Updated User:", user);
  };

  // Handle password form submission
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmNewPassword) {
      alert("New passwords do not match!");
      return;
    }
    // Add logic to update password in the backend
    console.log("Updated Passwords:", passwords);
    setIsEditingPassword(false);
    setPasswords({
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 lg:mt-20 :mt-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gray-800 p-6">
          <h1 className="text-2xl font-semibold text-white">
            Profile Information
          </h1>
        </div>

        {/* Profile Content */}
        <div className="p-8">
          <div className="space-y-8">
            {/* Profile Picture */}
            <div className="flex flex-col items-center">
              <img
                src={user.profilePicture}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
              />
              {isEditing && (
                <input
                  type="text"
                  name="profilePicture"
                  value={user.profilePicture}
                  onChange={handleInputChange}
                  className="mt-4 p-2 border rounded w-full max-w-xs text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Profile Picture URL"
                />
              )}
            </div>

            {/* Profile Details */}
            <div className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-lg text-gray-900">{user.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-lg text-gray-900">{user.email}</p>
                )}
              </div>

              {/* Role (Non-Editable) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <p className="text-lg text-gray-900 capitalize">{user.role}</p>
              </div>
            </div>

            {/* Edit Profile Button */}
            <div className="flex justify-end">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                {isEditing ? "Cancel" : "Edit Profile"}
              </button>
              {isEditing && (
                <button
                  onClick={handleSubmit}
                  className="ml-4 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-300"
                >
                  Save Changes
                </button>
              )}
            </div>
          </div>

          {/* Password Section */}
          <div className="mt-12">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Change Password
            </h2>
            <div className="space-y-6">
              {/* Current Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwords.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwords.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Confirm New Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirmNewPassword"
                  value={passwords.confirmNewPassword}
                  onChange={handlePasswordChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Password Buttons */}
              <div className="flex justify-end">
                <button
                  onClick={() => setIsEditingPassword(!isEditingPassword)}
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  {isEditingPassword ? "Cancel" : "Change Password"}
                </button>
                {isEditingPassword && (
                  <button
                    onClick={handlePasswordSubmit}
                    className="ml-4 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-300"
                  >
                    Save Password
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

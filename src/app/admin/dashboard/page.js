"use client";
import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function AdminDashboard() {
  // Dummy data for users
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "user" },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "studio_owner",
    },
    { id: 3, name: "Admin User", email: "admin@example.com", role: "admin" },
    { id: 4, name: "Alice Johnson", email: "alice@example.com", role: "user" },
    {
      id: 5,
      name: "Bob Brown",
      email: "bob@example.com",
      role: "studio_owner",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [activeSection, setActiveSection] = useState("users");

  // Update user role
  const handleUpdateRole = (userId, newRole) => {
    const updatedUsers = users.map((user) =>
      user.id === userId ? { ...user, role: newRole } : user
    );
    setUsers(updatedUsers);
    alert(`User role updated to ${newRole}`);
  };

  // Delete user
  const handleDeleteUser = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
    alert("User deleted successfully");
  };

  // Filter users based on search query and role
  const filteredUsers = users.filter(
    (user) =>
      (user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedRole === "all" || user.role === selectedRole)
  );

  // Data for the bar chart (user roles distribution)
  const rolesData = {
    labels: ["Users", "Studio Owners", "Admins"],
    datasets: [
      {
        label: "Number of Users",
        data: [
          users.filter((user) => user.role === "user").length,
          users.filter((user) => user.role === "studio_owner").length,
          users.filter((user) => user.role === "admin").length,
        ],
        backgroundColor: ["#3b82f6", "#f59e0b", "#10b981"],
      },
    ],
  };

  // Data for the pie chart (user roles distribution)
  const pieData = {
    labels: ["Users", "Studio Owners", "Admins"],
    datasets: [
      {
        data: [
          users.filter((user) => user.role === "user").length,
          users.filter((user) => user.role === "studio_owner").length,
          users.filter((user) => user.role === "admin").length,
        ],
        backgroundColor: ["#3b82f6", "#f59e0b", "#10b981"],
      },
    ],
  };

  return (
    <div className="flex min-h-screen bg-gray-100 mt-16">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg p-4">
        <h2 className="text-xl font-bold mb-6 text-blue-600">Admin Panel</h2>
        <ul>
          <li
            className={`p-2 cursor-pointer ${
              activeSection === "users"
                ? "bg-blue-100 text-blue-600"
                : "hover:bg-gray-100"
            }`}
            onClick={() => setActiveSection("users")}
          >
            Users
          </li>
          <li
            className={`p-2 cursor-pointer ${
              activeSection === "reports"
                ? "bg-blue-100 text-blue-600"
                : "hover:bg-gray-100"
            }`}
            onClick={() => setActiveSection("reports")}
          >
            Reports
          </li>
          <li
            className={`p-2 cursor-pointer ${
              activeSection === "settings"
                ? "bg-blue-100 text-blue-600"
                : "hover:bg-gray-100"
            }`}
            onClick={() => setActiveSection("settings")}
          >
            Settings
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {activeSection === "users" && (
          <>
            <h1 className="text-3xl font-bold mb-6 text-blue-600">
              User Management
            </h1>

            {/* Search and Filter */}
            <div className="mb-6 flex gap-4">
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Roles</option>
                <option value="user">User</option>
                <option value="studio_owner">Studio Owner</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Email</th>
                    <th className="p-3 text-left">Role</th>
                    <th className="p-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="p-3">{user.name}</td>
                      <td className="p-3">{user.email}</td>
                      <td className="p-3">
                        <select
                          value={user.role}
                          onChange={(e) =>
                            handleUpdateRole(user.id, e.target.value)
                          }
                          className="p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="user">User</option>
                          <option value="studio_owner">Studio Owner</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* No Users Found Message */}
            {filteredUsers.length === 0 && (
              <div className="mt-6 text-center text-gray-500">
                No users found matching your search.
              </div>
            )}
          </>
        )}

        {activeSection === "reports" && (
          <>
            <h1 className="text-3xl font-bold mb-6 text-blue-600">Reports</h1>

            {/* Bar Chart */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">
                User Roles Distribution
              </h2>
              <Bar data={rolesData} />
            </div>

            {/* Pie Chart */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">
                User Roles Pie Chart
              </h2>
              <Pie data={pieData} />
            </div>
          </>
        )}

        {activeSection === "settings" && (
          <>
            <h1 className="text-3xl font-bold mb-6 text-blue-600">Settings</h1>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600">Settings content goes here.</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";
import { motion } from "framer-motion";

import { useRouter } from "next/navigation";

const studios = [
  {
    name: "Amilo Studio",
    location: "JP Nagar",
    distance: 3,
    rating: 4.5,
    price: "₹2000",
    image:
      "https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Pixel Studio",
    location: "HSR Layout",
    distance: 5,
    rating: 4.8,
    price: "₹2500",
    image:
      "https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Focus Studio",
    location: "Indiranagar",
    distance: 7,
    rating: 4.2,
    price: "₹1800",
    image:
      "https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Vision Studio",
    location: "JP Nagar",
    distance: 4,
    rating: 4.6,
    price: "₹2200",
    image:
      "https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Creative Lens",
    location: "HSR Layout",
    distance: 6,
    rating: 4.7,
    price: "₹2400",
    image:
      "https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

export default function StudioList() {
  let route = useRouter();
  const [filters, setFilters] = useState({
    location: "",
    price: "",
    rating: "",
    distance: "",
  });

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  const filteredStudios = studios.filter((studio) => {
    return (
      (!filters.location || studio.location.includes(filters.location)) &&
      (!filters.price || studio.price === filters.price) &&
      (!filters.rating || studio.rating >= parseFloat(filters.rating)) &&
      (!filters.distance || studio.distance <= parseInt(filters.distance))
    );
  });

  return (
    <motion.div
      className="min-h-screen bg-gray-100 flex flex-col items-center px-2 py-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="bg-white shadow-lg rounded-2xl p-4 w-full max-w-6xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Studio List
        </h2>
        <p className="text-gray-500 text-center mt-2">
          Find the best studios near you
        </p>
      </motion.div>

      {/* Filters Section */}
      <motion.div
        className="w-full max-w-6xl overflow-x-auto flex gap-4 p-2 bg-white shadow-md rounded-lg sticky top-0 z-50 no-scrollbar"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <select
          className="p-2 border rounded"
          onChange={(e) => handleFilterChange("location", e.target.value)}
        >
          <option value="">All Locations</option>
          <option value="JP Nagar">JP Nagar</option>
          <option value="HSR Layout">HSR Layout</option>
          <option value="Indiranagar">Indiranagar</option>
        </select>
        <select
          className="p-2 border rounded"
          onChange={(e) => handleFilterChange("price", e.target.value)}
        >
          <option value="">All Prices</option>
          <option value="₹2000">₹2000</option>
          <option value="₹2500">₹2500</option>
          <option value="₹1800">₹1800</option>
        </select>
        <select
          className="p-2 border rounded"
          onChange={(e) => handleFilterChange("rating", e.target.value)}
        >
          <option value="">All Ratings</option>
          <option value="4.5">4.5 & up</option>
          <option value="4.8">4.8 & up</option>
          <option value="4.2">4.2 & up</option>
        </select>
        <select
          className="p-2 border rounded"
          onChange={(e) => handleFilterChange("distance", e.target.value)}
        >
          <option value="">Any Distance</option>
          <option value="3">Up to 3KM</option>
          <option value="5">Up to 5KM</option>
          <option value="7">Up to 7KM</option>
        </select>
      </motion.div>

      {/* Studio Grid/List */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-6xl mt-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
          },
        }}
      >
        {filteredStudios.map((studio, index) => (
          <motion.div
            key={index}
            className="bg-gray-50 p-4 rounded-xl shadow-md hover:shadow-lg transition"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
          >
            <motion.img
              src={studio.image}
              alt={studio.name}
              className="rounded-lg w-full h-40 object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
            />
            <div className="mt-2 text-center">
              <p className="text-lg font-semibold">{studio.name}</p>
              <p className="text-gray-500 text-sm">{studio.location}</p>
              <p className="text-sm text-gray-700">
                Distance: {studio.distance} KM
              </p>
              <p className="text-sm text-gray-700">Price: {studio.price}</p>
              <p className="text-sm text-yellow-500">⭐ {studio.rating}</p>
            </div>
            <motion.button
              className="bg-purple-600 text-white px-4 py-2 w-full mt-4 rounded-lg shadow hover:bg-purple-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => route.push("/studio/6544")}
            >
              View Details
            </motion.button>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

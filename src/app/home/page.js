"use client";

import { useState, useEffect } from "react";
import { Search, MapPin, Star, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import studios from "../data";

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStudios, setFilteredStudios] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedMinPrice, setSelectedMinPrice] = useState("");
  const [selectedMaxPrice, setSelectedMaxPrice] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const router = useRouter();

  // Mock user location
  const userLocation = { lat: 12.9716, lng: 77.5946 }; // Bangalore coordinates

  // Filter studios within 15km radius
  useEffect(() => {
    const nearbyStudios = studios.filter((studio) => studio.distance <= 15);
    setFilteredStudios(nearbyStudios);
  }, []);

  // Handle search input changes
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter studios based on search query
    const results = studios.filter(
      (studio) =>
        studio.name.toLowerCase().includes(query) ||
        studio.location.toLowerCase().includes(query)
    );
    setFilteredStudios(results);

    // Generate suggestions
    const studioNames = studios.map((studio) => studio.name);
    const locations = studios.map((studio) => studio.location);
    const uniqueSuggestions = [
      ...new Set([...studioNames, ...locations]),
    ].filter((item) => item.toLowerCase().includes(query));
    setSuggestions(uniqueSuggestions);
  };

  // Handle category filter
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    applyFilters(category, selectedMinPrice, selectedMaxPrice, selectedRating);
  };

  // Handle price filter
  const handlePriceChange = (minPrice, maxPrice) => {
    setSelectedMinPrice(minPrice);
    setSelectedMaxPrice(maxPrice);
    applyFilters(selectedCategory, minPrice, maxPrice, selectedRating);
  };

  // Handle rating filter
  const handleRatingChange = (rating) => {
    setSelectedRating(rating);
    applyFilters(selectedCategory, selectedMinPrice, selectedMaxPrice, rating);
  };

  // Apply all filters
  const applyFilters = (category, minPrice, maxPrice, rating) => {
    const results = studios.filter((studio) => {
      const matchesCategory =
        category === "All" || studio.category === category;
      const matchesPrice =
        (!minPrice ||
          parseInt(studio.price.replace("₹", "")) >= parseInt(minPrice)) &&
        (!maxPrice ||
          parseInt(studio.price.replace("₹", "")) <= parseInt(maxPrice));
      const matchesRating = !rating || studio.rating >= parseFloat(rating);
      return matchesCategory && matchesPrice && matchesRating;
    });
    setFilteredStudios(results);
  };

  // Navigate to studio details page
  const handleViewDetails = (studioId) => {
    router.push(`/studio/${studioId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 mt-12">
      <div className="max-w-7xl mx-auto">
        {/* Professional Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Find the Best Studios Near You
          </h1>
          <p className="text-gray-600 mt-2">
            Discover top-rated studios, video editors, and script writers for
            your creative projects.
          </p>
        </div>

        {/* Classy and Centered Search Bar */}
        <div className="flex justify-center mb-8">
          <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-2xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Search studios or locations..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              <Search
                className="absolute left-4 top-3.5 text-gray-400"
                size={18}
              />
              {/* Suggestions Dropdown */}
              {searchQuery && suggestions.length > 0 && (
                <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg mt-1 shadow-lg">
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                      onClick={() => {
                        setSearchQuery(suggestion);
                        setSuggestions([]);
                      }}
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          {/* Category Filter */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="appearance-none p-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="All">All Categories</option>
              <option value="Studio">Studio</option>
              <option value="Video Editor">Video Editor</option>
              <option value="Script Writer">Script Writer</option>
            </select>
            <ChevronDown
              className="absolute right-2 top-3 text-gray-400"
              size={14}
            />
          </div>

          {/* Price Filter */}
          <div className="relative">
            <select
              value={selectedMinPrice}
              onChange={(e) =>
                handlePriceChange(e.target.value, selectedMaxPrice)
              }
              className="appearance-none p-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="">Min Price</option>
              <option value="1000">₹1000</option>
              <option value="2000">₹2000</option>
              <option value="3000">₹3000</option>
              <option value="4000">₹4000</option>
            </select>
            <ChevronDown
              className="absolute right-2 top-3 text-gray-400"
              size={14}
            />
          </div>
          <div className="relative">
            <select
              value={selectedMaxPrice}
              onChange={(e) =>
                handlePriceChange(selectedMinPrice, e.target.value)
              }
              className="appearance-none p-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="">Max Price</option>
              <option value="2000">₹2000</option>
              <option value="3000">₹3000</option>
              <option value="4000">₹4000</option>
              <option value="5000">₹5000</option>
            </select>
            <ChevronDown
              className="absolute right-2 top-3 text-gray-400"
              size={14}
            />
          </div>

          {/* Rating Filter */}
          <div className="relative">
            <select
              value={selectedRating}
              onChange={(e) => handleRatingChange(e.target.value)}
              className="appearance-none p-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="">Min Rating</option>
              <option value="4.0">4.0+</option>
              <option value="4.5">4.5+</option>
              <option value="5.0">5.0</option>
            </select>
            <ChevronDown
              className="absolute right-2 top-3 text-gray-400"
              size={14}
            />
          </div>
        </div>

        {/* Studio List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudios.map((studio) => (
            <div
              key={studio.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Use first image from the array */}
              <img
                src={
                  Array.isArray(studio.images)
                    ? studio.images[0]
                    : studio.images
                }
                alt={studio.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  {studio.name}
                </h2>
                <div className="flex items-center text-gray-600 mt-2">
                  <MapPin size={16} className="mr-2" />
                  <p>{studio.location}</p>
                </div>
                <div className="flex items-center text-gray-600 mt-2">
                  <Star size={16} className="mr-2 text-yellow-500" />
                  <p>
                    {studio.rating} ({studio.price}/hr)
                  </p>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  {studio.distance} km away
                </p>
                <button
                  onClick={() => handleViewDetails(studio.id)}
                  className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredStudios.length === 0 && (
          <div className="text-center text-gray-600 mt-8">
            No studios found. Try adjusting your filters.
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;

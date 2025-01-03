// nextjs_studio_booking/src/app/index.js
"use client";
import { useState } from "react";
import Link from "next/link";

const sampleStudios = [
  {
    _id: "1",
    name: "Cozy Studio",
    address: "12 MG Road, Bangalore",
    price: 50,
    location: "Bangalore",
    image:
      "https://media.istockphoto.com/id/1665390175/photo/headphones-and-mic-at-the-radio-station.webp?a=1&b=1&s=612x612&w=0&k=20&c=muf1pjSHx4jzNgxQ9_MdBgl7fWhFGqWlQg7p_84Ri1c=",
  },
  {
    _id: "2",
    name: "Modern Loft",
    address: "34 Whitefield, Bangalore",
    price: 75,
    location: "Bangalore",
    image:
      "https://media.istockphoto.com/id/1665390175/photo/headphones-and-mic-at-the-radio-station.webp?a=1&b=1&s=612x612&w=0&k=20&c=muf1pjSHx4jzNgxQ9_MdBgl7fWhFGqWlQg7p_84Ri1c=",
  },
  {
    _id: "3",
    name: "Artistic Space",
    address: "56 Koramangala, Bangalore",
    price: 60,
    location: "Bangalore",
    image:
      "https://media.istockphoto.com/id/1665390175/photo/headphones-and-mic-at-the-radio-station.webp?a=1&b=1&s=612x612&w=0&k=20&c=muf1pjSHx4jzNgxQ9_MdBgl7fWhFGqWlQg7p_84Ri1c=",
  },
  {
    _id: "4",
    name: "Cozy Studio",
    address: "12 MG Road, Bangalore",
    price: 50,
    location: "Bangalore",
    image:
      "https://media.istockphoto.com/id/1665390175/photo/headphones-and-mic-at-the-radio-station.webp?a=1&b=1&s=612x612&w=0&k=20&c=muf1pjSHx4jzNgxQ9_MdBgl7fWhFGqWlQg7p_84Ri1c=",
  },
  {
    _id: "5",
    name: "Modern Loft",
    address: "34 Whitefield, Bangalore",
    price: 75,
    location: "Bangalore",
    image:
      "https://media.istockphoto.com/id/1665390175/photo/headphones-and-mic-at-the-radio-station.webp?a=1&b=1&s=612x612&w=0&k=20&c=muf1pjSHx4jzNgxQ9_MdBgl7fWhFGqWlQg7p_84Ri1c=",
  },
  {
    _id: "6",
    name: "Artistic Space",
    address: "56 Koramangala, Bangalore",
    price: 60,
    location: "Bangalore",
    image:
      "https://media.istockphoto.com/id/1665390175/photo/headphones-and-mic-at-the-radio-station.webp?a=1&b=1&s=612x612&w=0&k=20&c=muf1pjSHx4jzNgxQ9_MdBgl7fWhFGqWlQg7p_84Ri1c=",
  },
];

export default function Home() {
  const [studios, setStudios] = useState(sampleStudios);
  const [location, setLocation] = useState("");

  const filterStudios = () => {
    if (location) {
      const filtered = sampleStudios.filter((studio) =>
        studio.location.toLowerCase().includes(location.toLowerCase())
      );
      setStudios(filtered);
    } else {
      setStudios(sampleStudios);
    }
  };

  return (
    <div className="min-h-screen p-5 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-5">
        Find Studios Near You
      </h1>
      <div className="flex justify-center mb-5">
        <input
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="p-2 border rounded-l-md"
        />
        <button
          onClick={filterStudios}
          className="p-2 bg-blue-500 text-white rounded-r-md"
        >
          Search
        </button>
      </div>
      {studios.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {studios.map((studio) => (
            <div
              key={studio._id}
              className="bg-white p-5 rounded-md shadow-md hover:shadow-lg"
            >
              <img
                src={studio.image}
                alt={studio.name}
                className="w-full h-32 object-cover rounded-md mb-3"
              />
              <h2 className="text-xl font-semibold">{studio.name}</h2>
              <p className="text-gray-600">{studio.address}</p>
              <p className="text-gray-800 font-bold">${studio.price}/hour</p>
              <Link href={`/studios/${studio._id}`} legacyBehavior>
                <a className="text-blue-500 underline">View Details</a>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No studios found.</p>
      )}
    </div>
  );
}

// Removed API route, model, and database connection logic as they are no longer needed.

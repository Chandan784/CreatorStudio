"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

const agencies = [
  {
    id: 1,
    name: "Growth Marketing Co.",
    services: ["SEO", "PPC", "Social Media"],
    price: "$2000/month",
    description:
      "We specialize in helping businesses grow through data-driven marketing strategies.",
    images: [
      "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=600",
    ],
    rating: 4.5,
    videosPerMonth: 10,
    scriptWriters: 2,
    videoEditors: 3,
  },
  {
    id: 2,
    name: "Creative Ads Agency",
    services: ["Branding", "Content Marketing", "PPC"],
    price: "$1500/month",
    description:
      "We are a full-service creative agency that helps brands stand out with innovative ad campaigns.",
    images: [
      "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=600",
    ],
    rating: 3.8,
    videosPerMonth: 8,
    scriptWriters: 1,
    videoEditors: 2,
  },
  {
    id: 3,
    name: "Local SEO Experts",
    services: ["SEO", "Local SEO", "Web Development"],
    price: "$1200/month",
    description: "We help local businesses dominate search engine rankings.",
    images: [
      "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=600",
    ],
    rating: 5.0,
    videosPerMonth: 12,
    scriptWriters: 3,
    videoEditors: 4,
  },
];

const AgencyDetails = () => {
  const router = useRouter();
  const id = 1;
  const [agency, setAgency] = useState(null);

  useEffect(() => {
    if (id) {
      const selectedAgency = agencies.find((a) => a.id === parseInt(id));
      setAgency(selectedAgency);
    }
  }, [id]);

  if (!agency) {
    return <div className="text-center p-6">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6 mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Main Content */}
      <div className="md:col-span-2">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">{agency.name}</h1>

        {/* Image Slider */}
        <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            className="rounded-lg"
          >
            {agency.images.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-96 object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Agency Details */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <span className="text-xl font-semibold text-gray-700">Rating:</span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-2xl ${
                    i < agency.rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-gray-600 text-sm">
              ({agency.rating.toFixed(1)})
            </span>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <p className="text-gray-700">
              <span className="font-semibold">Services:</span>{" "}
              {agency.services.join(", ")}
            </p>
            <p className="text-gray-800 font-bold text-2xl mt-2">
              Price: {agency.price}
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              {agency.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-gray-700 font-semibold">Videos per Month</p>
              <p className="text-gray-800 text-2xl font-bold">
                {agency.videosPerMonth}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-gray-700 font-semibold">Script Writers</p>
              <p className="text-gray-800 text-2xl font-bold">
                {agency.scriptWriters}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-gray-700 font-semibold">Video Editors</p>
              <p className="text-gray-800 text-2xl font-bold">
                {agency.videoEditors}
              </p>
            </div>
          </div>
        </div>

        {/* Book Now Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => alert(`Booking ${agency.name}`)}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105"
          >
            Book Now
          </button>
        </div>
      </div>

      {/* More Agencies */}
      <div className="md:col-span-1 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">More Agencies</h2>
        {agencies.map(
          (item) =>
            item.id !== agency.id && (
              <div
                key={item.id}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setAgency(item)}
              >
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.name}
                </h3>
                <p className="text-gray-600">{item.services.join(", ")}</p>
                <p className="text-gray-800 font-bold">{item.price}</p>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default AgencyDetails;

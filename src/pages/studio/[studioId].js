import { useState } from "react";
import { motion } from "framer-motion";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
  FaMapMarkerAlt,
  FaStar,
  FaRupeeSign,
  FaCheck,
  FaClock,
  FaTimes,
} from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../app/globals.css";

const studio = {
  name: "Amilo Studio",
  location: "JP Nagar, Bangalore",
  rating: 4.8,
  price: 2000,
  description:
    "Amilo Studio is a state-of-the-art photography and videography studio equipped with the latest technology and a creative ambiance.",
  images: [
    "https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/3952234/pexels-photo-3952234.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/4269766/pexels-photo-4269766.jpeg?auto=compress&cs=tinysrgb&w=600",
  ],
  facilities: [
    "High-Speed WiFi",
    "Professional Lighting",
    "Makeup Room",
    "Green Screen",
    "Parking",
  ],
  equipment: [
    {
      name: "Canon EOS R5",
      image:
        "https://images.pexels.com/photos/167832/pexels-photo-167832.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "Godox SL60W LED Light",
      image:
        "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "Sony A7 III",
      image:
        "https://images.pexels.com/photos/167832/pexels-photo-167832.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
  ],
};

// Nearby Studio Suggestions
const nearbyStudios = [
  {
    name: "Pixel Studio",
    location: "Indiranagar, Bangalore",
    image:
      "https://images.pexels.com/photos/3018898/pexels-photo-3018898.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Capture House",
    location: "Koramangala, Bangalore",
    image:
      "https://images.pexels.com/photos/3747118/pexels-photo-3747118.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

export default function StudioDetails() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");

  const timeSlots = ["10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM", "6:00 PM"];

  return (
    <motion.div
      className="min-h-screen bg-gray-100 flex flex-col items-center px-4 py-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-5xl w-full bg-white shadow-lg rounded-2xl p-6">
        {/* Image Carousel */}
        <Carousel showThumbs={false} infiniteLoop autoPlay>
          {studio.images.map((image, index) => (
            <div key={index}>
              <img
                src={image}
                alt="Studio Image"
                className="rounded-xl w-full h-80 object-cover"
              />
            </div>
          ))}
        </Carousel>

        {/* Studio Info */}
        <div className="mt-6">
          <h2 className="text-3xl font-bold text-gray-800">{studio.name}</h2>
          <p className="flex items-center text-gray-600 mt-2">
            <FaMapMarkerAlt className="mr-2 text-red-500" /> {studio.location}
          </p>
          <p className="flex items-center text-yellow-500 mt-2">
            <FaStar className="mr-2" /> {studio.rating} / 5
          </p>
          <p className="flex items-center text-green-600 text-lg font-semibold mt-2">
            <FaRupeeSign className="mr-1" /> {studio.price} per hour
          </p>
          <p className="text-gray-700 mt-4">{studio.description}</p>
        </div>

        {/* Facilities */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800">Facilities</h3>
          <ul className="grid grid-cols-2 gap-2 mt-2">
            {studio.facilities.map((facility, index) => (
              <li key={index} className="flex items-center text-gray-700">
                <FaCheck className="text-green-500 mr-2" /> {facility}
              </li>
            ))}
          </ul>
        </div>

        {/* Equipment */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800">
            Equipment Available
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
            {studio.equipment.map((item, index) => (
              <div key={index} className="bg-gray-50 p-3 rounded-lg shadow-md">
                <img
                  src={item.image}
                  alt={item.name}
                  className="rounded-lg w-full h-28 object-cover"
                />
                <p className="text-center mt-2 text-gray-800 font-medium">
                  {item.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Nearby Studios */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-800">
            Nearby Studios
          </h3>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {nearbyStudios.map((studio, index) => (
              <div key={index} className="bg-gray-50 p-3 rounded-lg shadow-md">
                <img
                  src={studio.image}
                  alt={studio.name}
                  className="rounded-lg w-full h-32 object-cover"
                />
                <p className="text-center mt-2 font-medium text-gray-800">
                  {studio.name}
                </p>
                <p className="text-center text-gray-600">{studio.location}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fixed Booking Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg py-4 px-6 flex justify-center">
        <motion.button
          className="bg-purple-600 text-white px-6 py-3 w-full max-w-md rounded-lg shadow-md"
          onClick={() => setIsBookingOpen(true)}
        >
          Book Now
        </motion.button>
      </div>

      {/* Booking Modal */}
      {isBookingOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={() => setIsBookingOpen(false)}
            >
              <FaTimes size={20} />
            </button>
            <h3 className="text-xl font-semibold text-gray-800">
              Select Date & Time
            </h3>
            <div className="mt-4">
              <p className="text-gray-700">Choose Date:</p>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                className="border rounded p-2 w-full mt-2"
              />
            </div>
            <div className="mt-4">
              <p className="text-gray-700">Choose Time Slot:</p>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {timeSlots.map((slot, index) => (
                  <button
                    key={index}
                    className={`p-2 border rounded ${
                      selectedTime === slot
                        ? "bg-purple-600 text-white"
                        : "bg-gray-100"
                    }`}
                    onClick={() => setSelectedTime(slot)}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
            <motion.button
              className="bg-green-600 text-white px-4 py-2 w-full mt-4 rounded-lg shadow-md transition-all hover:bg-green-700 active:scale-95"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsBookingOpen(false)}
            >
              Confirm Booking
            </motion.button>
          </div>
        </div>
      )}
    </motion.div>
  );
}

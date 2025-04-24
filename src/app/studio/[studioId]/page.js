"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useDispatch } from "react-redux";
import {
  FaMapMarkerAlt,
  FaStar,
  FaRupeeSign,
  FaCheck,
  FaTimes,
  FaWifi,
  FaLightbulb,
  FaCar,
} from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { getStudioAvailabilityByDate, getStudioBookingById } from "@/store/api/studio";

// Studio Data (Hardcoded for now)
const studio = {
  id: "67c46d65da4907ebf654aacf",
  name: "Amilo Studio",
  location: "JP Nagar, Bangalore",
  rating: 4.8,
  price: 2000,
  description:
    "Amilo Studio is a state-of-the-art photography and videography studio equipped with the latest technology and a creative ambiance. Perfect for photoshoots, video shoots, and creative projects.",
  images: [
    "https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/3952234/pexels-photo-3952234.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/4269766/pexels-photo-4269766.jpeg?auto=compress&cs=tinysrgb&w=600",
  ],
  facilities: [
    { name: "High-Speed WiFi", icon: <FaWifi className="text-purple-600" /> },
    {
      name: "Professional Lighting",
      icon: <FaLightbulb className="text-yellow-500" />,
    },
    { name: "Makeup Room", icon: <FaCheck className="text-green-500" /> },
    { name: "Green Screen", icon: <FaCheck className="text-green-500" /> },
    { name: "Parking", icon: <FaCar className="text-blue-500" /> },
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

export default function StudioDetails() {
  const router = useRouter();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [availability, setAvailability] = useState({
    isDayOff: false,
    startHour: 9,
    endHour: 17,
    slots: [], // Updated to match backend response
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  // Fetch availability for the selected date
  const fetchAvailability = async (date) => {
    setLoading(true);
    setError("");

    try {
      // Convert the date to UTC and format it as YYYY-MM-DD
      const utcDate = new Date(
        date.getTime() - date.getTimezoneOffset() * 60000
      );
      const formattedDate = utcDate.toISOString().split("T")[0];

      console.log("Fetching availability for date (UTC):", formattedDate);

      // Fetch availability from the backend
      // const response = await axios.get(
      //   `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/availability/${studio.id}/${formattedDate}`
      // );
      dispatch(getStudioAvailabilityByDate({
          studioId: studio.id,
          date: formattedDate,
        }));

      if (response.data.success) {
        console.log("Backend response:", response.data);
        setAvailability({
          isDayOff: response.data.dayData.isDayOff,
          startHour: response.data.dayData.startHour,
          endHour: response.data.dayData.endHour,
          slots: response.data.dayData.slots, // Ensure this matches the backend response
        });
      } else {
        console.log("Backend response:", response.data);
        setError("No availability found on this date."); // Case 2: Success is false
        setAvailability({
          isDayOff: false, // Ensure isDayOff is false for this case
          startHour: 0,
          endHour: 0,
          slots: [], // Clear slots
        });
      }
    } catch (error) {
      console.error("Error fetching availability:", error);
      setError("Failed to fetch availability. Please try again.");
      setAvailability({
        isDayOff: true, // Treat as a day off to hide slots
        startHour: 0,
        endHour: 0,
        slots: [], // Clear slots
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch availability when the component mounts or selectedDate changes
  useEffect(() => {
    fetchAvailability(selectedDate);
  }, [selectedDate]);

  // Handle date change
  const handleDateChange = (date) => {
    console.log("Selected date (Local):", date);
    const utcDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    console.log("Selected date (UTC):", utcDate);
    setSelectedDate(utcDate);
  };

  // Handle slot selection
  const handleSlotSelection = (slot) => {
    if (slot.enabled && !slot.booked) {
      if (selectedSlots.includes(slot)) {
        setSelectedSlots((prev) => prev.filter((s) => s !== slot));
      } else {
        setSelectedSlots((prev) => [...prev, slot]);
      }
    }
  };

  // Handle booking confirmation
  const handleBookingConfirmation = async () => {
    if (selectedSlots.length === 0) {
      alert("Please select at least one time slot.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Prepare the payload for the API call
      const payload = {
        studioId: studio.id,
        userId: "67c2e9936b645b011c0d0533", // Replace with the actual user ID (e.g., from auth context)
        date: selectedDate.toISOString().split("T")[0], // Format date as YYYY-MM-DD
        timeSlots: selectedSlots.map((slot) => ({
          startTime: slot.startTime,
          endTime: slot.endTime,
        })),
      };

      // Make the API call to create a booking
      // const response = await axios.post(
      //   `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/bookings`,
      //   payload
      // );
      dispatch(getStudioBookingById(bookingPayload));

      if (response.data.success) {
        alert("Booking confirmed!");
        setIsBookingOpen(false);
        setSelectedSlots([]);
        router.push("/user/bookings"); // Redirect to user bookings page
      } else {
        setError(response.data.message || "Failed to confirm booking.");
      }
    } catch (error) {
      console.error("Error confirming booking:", error);
      setError("Failed to confirm booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-100 flex flex-col items-center px-4 py-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Studio Details */}
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
          <ul className="grid grid-cols-2 gap-4 mt-4">
            {studio.facilities.map((facility, index) => (
              <li
                key={index}
                className="flex items-center space-x-2 bg-gray-50 p-3 rounded-lg shadow-sm"
              >
                <span className="text-xl">{facility.icon}</span>
                <span className="text-gray-700">{facility.name}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Equipment */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800">
            Equipment Available
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {studio.equipment.map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 p-4 rounded-lg shadow-md flex flex-col items-center"
              >
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
      </div>

      {/* Fixed Booking Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg py-4 px-6 flex justify-center">
        <motion.button
          className="bg-purple-600 text-white px-6 py-3 w-full max-w-md rounded-lg shadow-md hover:bg-purple-700 transition-all"
          onClick={() => setIsBookingOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Book Now
        </motion.button>
      </div>

      {/* Booking Modal */}
      {isBookingOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={() => setIsBookingOpen(false)}
            >
              <FaTimes size={20} />
            </button>
            <h3 className="text-xl font-semibold text-gray-800">
              Select Date & Time Slots
            </h3>
            <div className="mt-4">
              <p className="text-gray-700">Choose Date:</p>
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                className="border rounded p-2 w-full mt-2"
                dateFormat="yyyy-MM-dd"
              />
            </div>
            <div className="mt-4">
              <p className="text-gray-700">Choose Time Slots:</p>
              {availability.isDayOff ? ( // Case 1: Studio is off
                <p className="text-red-500">
                  Studio is not available on this day.
                </p>
              ) : error ? ( // Case 2: No availability found
                <p className="text-red-500">{error}</p>
              ) : (
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {availability.slots.map((slot) => (
                    <button
                      key={slot.startTime}
                      className={`p-2 border rounded transition-all ${slot.enabled
                        ? slot.booked
                          ? "bg-red-100 cursor-not-allowed"
                          : selectedSlots.includes(slot)
                            ? "bg-purple-600 text-white"
                            : "bg-green-100 hover:bg-green-200"
                        : "bg-gray-100 cursor-not-allowed"
                        }`}
                      onClick={() => handleSlotSelection(slot)}
                      disabled={!slot.enabled || slot.booked}
                    >
                      {slot.startTime} - {slot.endTime}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <motion.button
              className="bg-green-600 text-white px-4 py-2 w-full mt-4 rounded-lg shadow-md transition-all hover:bg-green-700 active:scale-95"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBookingConfirmation}
              disabled={loading || availability.isDayOff}
            >
              {loading ? "Confirming..." : "Confirm Booking"}
            </motion.button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
        </div>
      )}
    </motion.div>
  );
}

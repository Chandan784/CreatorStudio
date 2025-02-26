import { useState } from "react";
import { motion } from "framer-motion";
import "../app/globals.css";
export default function RechargePage() {
  const [plans] = useState([
    { price: 25000, validity: "45 days", videos: 5, platforms: 5 },
    { price: 15000, validity: "30 days", videos: 3, platforms: 3 },
  ]);

  // Custom Button Component (Defined Inside the File)
  const CustomButton = ({ children, onClick, className }) => (
    <motion.button
      className={`px-4 py-2 rounded-lg shadow-md font-semibold transition-all ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <motion.div
        className="bg-white shadow-lg rounded-2xl p-6 max-w-md w-full md:max-w-2xl"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <h2 className="text-2xl font-semibold text-center">
          Recharge Your Plan
        </h2>
        <p className="text-gray-500 text-center mt-2">
          Get more credits to post videos on multiple platforms.
        </p>

        <CustomButton className="mt-4 w-full bg-purple-600 text-white hover:bg-purple-700">
          Get 15 more credits at 35% off
        </CustomButton>

        <div className="mt-6">
          <h3 className="text-lg font-semibold">Recommended Plans</h3>
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className="mt-4 bg-gray-50 p-4 rounded-xl shadow-md hover:shadow-lg transition"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xl font-semibold">₹{plan.price}</p>
                  <p className="text-gray-500 text-sm">
                    Validity: {plan.validity}
                  </p>
                  <p className="text-gray-500 text-sm">Videos: {plan.videos}</p>
                  <p className="text-gray-500 text-sm">
                    Platforms: {plan.platforms}
                  </p>
                </div>
                <CustomButton className="bg-purple-600 text-white hover:bg-purple-700">
                  Buy
                </CustomButton>
              </div>
            </motion.div>
          ))}

          <CustomButton className="mt-4 w-full bg-purple-500 text-white hover:bg-purple-600">
            See all plans
          </CustomButton>
        </div>
      </motion.div>
    </div>
  );
}

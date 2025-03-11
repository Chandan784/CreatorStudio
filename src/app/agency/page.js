"use client";

import React from "react";

function page() {
  return <div></div>;
}

export default page;

// "use client";

// import { useState } from "react";
// import { motion } from "framer-motion";
// import Link from "next/link";

// // Rating Component
// const Rating = ({ rating }) => {
//   const stars = [];
//   for (let i = 1; i <= 5; i++) {
//     stars.push(
//       <span
//         key={i}
//         className={`text-xl ${
//           i <= rating ? "text-yellow-400" : "text-gray-300"
//         }`}
//       >
//         ★
//       </span>
//     );
//   }
//   return <div className="flex">{stars}</div>;
// };

// const agencies = [
//   {
//     id: 1,
//     name: "Growth Marketing Co.",
//     services: ["SEO", "PPC", "Social Media"],
//     price: "$2000/month",
//     description:
//       "We specialize in helping businesses grow through data-driven marketing strategies. Our team of experts will work with you to create customized campaigns that deliver results.",
//     images: [
//       "https://th.bing.com/th/id/OIP.7HoJnc8Sc3lant_L4JZcQQHaD4?w=332&h=180&c=7&r=0&o=5&pid=1.71",
//       "https://via.placeholder.com/800x400?text=Image+2",
//       "https://via.placeholder.com/800x400?text=Image+3",
//     ],
//     rating: 4.5,
//   },
//   {
//     id: 2,
//     name: "Creative Ads Agency",
//     services: ["Branding", "Content Marketing", "PPC"],
//     price: "$1500/month",
//     description:
//       "We are a full-service creative agency that helps brands stand out with innovative ad campaigns. From concept to execution, we handle it all.",
//     images: [
//       "https://th.bing.com/th/id/OIP.7HoJnc8Sc3lant_L4JZcQQHaD4?w=332&h=180&c=7&r=0&o=5&pid=1.7",
//       "https://via.placeholder.com/800x400?text=Image+2",
//       "https://via.placeholder.com/800x400?text=Image+3",
//     ],
//     rating: 3.8,
//   },
//   {
//     id: 3,
//     name: "Local SEO Experts",
//     services: ["SEO", "Local SEO", "Web Development"],
//     price: "$1200/month",
//     description:
//       "We help local businesses dominate search engine rankings. Our proven strategies ensure your business gets noticed by the right audience.",
//     images: [
//       "https://th.bing.com/th/id/OIP.7HoJnc8Sc3lant_L4JZcQQHaD4?w=332&h=180&c=7&r=0&o=5&pid=1.7",
//       "https://via.placeholder.com/800x400?text=Image+2",
//       "https://via.placeholder.com/800x400?text=Image+3",
//     ],
//     rating: 5.0,
//   },
// ];

// const AgencyListing = () => {
//   const [search, setSearch] = useState("");
//   const [selectedService, setSelectedService] = useState("");

//   const filteredAgencies = agencies.filter(
//     (agency) =>
//       agency.name.toLowerCase().includes(search.toLowerCase()) &&
//       (selectedService === "" || agency.services.includes(selectedService))
//   );

//   return (
//     <div className="max-w-6xl mx-auto p-6 mt-12">
//       <h1 className="text-3xl font-bold mb-6 text-center">
//         Marketing Agencies
//       </h1>
//       <div className="flex gap-4 mb-6">
//         <input
//           type="text"
//           placeholder="Search Agencies..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="w-full p-2 border rounded"
//         />
//         <select
//           value={selectedService}
//           onChange={(e) => setSelectedService(e.target.value)}
//           className="p-2 border rounded"
//         >
//           <option value="">All Services</option>
//           <option value="SEO">SEO</option>
//           <option value="PPC">PPC</option>
//           <option value="Social Media">Social Media</option>
//           <option value="Branding">Branding</option>
//           <option value="Content Marketing">Content Marketing</option>
//         </select>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredAgencies.map((agency) => (
//           <Link href={`/agency/${agency.id}`} key={agency.id}>
//             <motion.div
//               className="border p-4 rounded-lg shadow-lg bg-white transform transition duration-300 hover:scale-105 cursor-pointer"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               whileHover={{ scale: 1.05 }}
//             >
//               <img
//                 src={agency.images[0]}
//                 alt={agency.name}
//                 className="w-full h-40 object-cover rounded-lg mb-4"
//               />
//               <h3 className="text-xl font-semibold mb-2">{agency.name}</h3>
//               <div className="flex items-center gap-2 mb-2">
//                 <Rating rating={agency.rating} />
//                 <span className="text-gray-600 text-sm">
//                   ({agency.rating.toFixed(1)})
//                 </span>
//               </div>
//               <p className="text-gray-600 mb-1">
//                 Services: {agency.services.join(", ")}
//               </p>
//               <p className="text-gray-800 font-bold">Price: {agency.price}</p>
//               <p className="text-gray-600 mt-2 text-sm leading-relaxed">
//                 {agency.description}
//               </p>
//             </motion.div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AgencyListing;

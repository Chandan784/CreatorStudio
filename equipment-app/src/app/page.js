import React from "react";
import Header from "./components/Header";
import CategoryCard from "./components/CategoryCard";
import EquipmentCard from "./components/EquipmentCard";
import BottomNav from "./components/BottomNav";


export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      <Header/>

      {/* Banner */}
      <section className="mt-4">
        <div className="relative rounded-lg overflow-hidden mx-4">
          <img src="/images.jpg" alt="Banner" className="w-full h-40 object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center">
            <h2 className="text-white text-lg font-bold">BUY STUDIO EQUIPMENT</h2>
            <p className="text-green-400 text-xl">80% OFF</p>
            <button className="mt-2 px-4 py-2 bg-white text-black rounded-full">Check this out</button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <CategoryCard/>

      {/* Equipment */}
      <section className="mt-6 mx-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">Equipments</h2>
          <a href="#" className="text-blue-500 text-sm">See More</a>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
      
          <EquipmentCard title="Mirrorless Camera" price="$69.69" img="/download.jpg"/>
          <EquipmentCard title="Microphone" price="$49.99" img="/download(1).jpg"/>
          
        </div>
      </section>

      <BottomNav/>
    </div>
  );
}

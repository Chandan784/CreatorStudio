import React from "react";

const EquipmentCard = ({ title, price, img }) => (
  <div className="bg-white rounded-lg shadow p-4">
    <img src={img} alt={title} className="w-full h-24 object-cover rounded-lg mb-2" />
    <h3 className="text-sm font-bold mb-1">{title}</h3>
    <div className="flex justify-between items-center">
      <span className="text-gray-500 text-sm">
        {price ? price : <button className="text-blue-500">Add</button>}
      </span>
    </div>
  </div>
);

export default EquipmentCard;

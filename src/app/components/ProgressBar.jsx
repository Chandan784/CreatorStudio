import React from "react";


const ProgressBar = ({ progress }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-4  flex" >
      <div
        className="bg-blue-500 h-4 rounded-full transition-all duration-500 ease-in-out"
        style={{ width: `${progress}%` }}
      > 
      
      </div>
      
    </div>
  );
};

export default ProgressBar;

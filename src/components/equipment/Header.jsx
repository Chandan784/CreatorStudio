import React from "react";
import { Search, User } from "lucide-react";

const Header=()=>(
    <header className="bg-white p-4 shadow-md flex justify-between items-center">
        <h1 className="text-xl font-bold">Add your Equipments</h1>
        <div className="relative w-3/5">
            <input
             type="text" placeholder="Enter Equipment Name" 
             className="w-full p-2 pl-4 pr-10 rounded-lg border border-gray-400"
            />
            <Search className="absolute top-2 right-3 text-gray-500"/>
        </div>
        <User className="text-gray-500"/>
    </header>
)

export default Header
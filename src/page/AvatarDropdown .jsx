import React from "react";
import {
  FaBook,
  FaClipboardList,
  FaLightbulb,
  FaChartLine,
  FaCoins,
  FaCogs,
  FaPalette,
  FaSignOutAlt,
  FaRocket,
  FaShoppingBag,
  FaGamepad,
} from "react-icons/fa";
import { BsListCheck } from "react-icons/bs";

const AvatarDropdown = ({ avatar, nameuser, onLogout }) => {
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("1234567");
    
        if (onLogout) onLogout(); // Gọi lại để Header update
    
        // Optional: Nếu muốn redirect
        // window.location.href = '/login';
      };
  return (
    <div className="w-64 bg-white rounded-xl shadow-xl p-4">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-4">
        <img
          src={avatar}
          alt="User Avatar"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className="font-semibold">{nameuser}</p>
          <p className="text-xs text-orange-500">Access all features with our <span className="font-bold">Premium subscription!</span></p>
        </div>
      </div>

      {/* Menu Items */}
      <div className="grid grid-cols-3 gap-3 text-sm text-gray-700 mb-4">
        <div className="flex flex-col items-center hover:text-black cursor-pointer">
          <BsListCheck className="text-xl" />
          <span>My Lists</span>
        </div>
        <div className="flex flex-col items-center hover:text-black cursor-pointer">
          <FaBook className="text-xl" />
          <span>Notebook</span>
        </div>
        <div className="flex flex-col items-center hover:text-black cursor-pointer">
          <FaLightbulb className="text-xl" />
          <span>Submissions</span>
        </div>
        <div className="flex flex-col items-center hover:text-black cursor-pointer">
          <FaChartLine className="text-xl" />
          <span>Progress</span>
        </div>
        <div className="flex flex-col items-center hover:text-black cursor-pointer">
          <FaCoins className="text-xl" />
          <span>Points</span>
        </div>
      </div>

      {/* Extra Options */}
      <ul className="text-sm text-gray-700 space-y-2">
        <li className="flex items-center space-x-2 hover:text-black cursor-pointer">
          <FaRocket />
          <span>Try New Features</span>
        </li>
        <li className="flex items-center space-x-2 hover:text-black cursor-pointer">
          <FaShoppingBag />
          <span>Orders</span>
        </li>
        <li className="flex items-center space-x-2 hover:text-black cursor-pointer">
          <FaGamepad />
          <span>My Playgrounds</span>
        </li>
        <li className="flex items-center space-x-2 hover:text-black cursor-pointer">
          <FaCogs />
          <span>Settings</span>
        </li>
        <li className="flex items-center space-x-2 hover:text-black cursor-pointer">
          <FaBook />
          <span>Classic Mode</span>
        </li>
        <li className="flex items-center space-x-2 hover:text-black cursor-pointer">
          <FaPalette />
          <span>Appearance</span>
        </li>
        <div
        className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
        onClick={handleLogout}
      >
        <FaSignOutAlt className="text-lg" />
        <span>Sign Out</span>
      </div>
      </ul>
    </div>
  );
};

export default AvatarDropdown;

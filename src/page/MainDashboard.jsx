import React from "react";
import StudyPlanSection from "./StudyPlanSection";
import ProblemTable from "./ProblemTable";
const MainDashboard = () => {
  return (
    <div className="flex w-[80%] mx-auto px-8 py-6 gap-6">

      {/* Left Section - 70% */}
      <div className="w-[70%] space-y-6">
        {/* Banner Section */}
        <div className="flex gap-4">
          <div className="bg-green-100 rounded-xl p-4 w-full">
            <h2 className="font-bold text-lg mb-2">LeetCode's Interview Crash Course</h2>
            <p className="text-sm">System Design for Interviews and Beyond</p>
            <button className="mt-3 bg-white text-gray-800 border border-gray-300 px-3 py-1 rounded hover:shadow">Start Learning</button>
          </div>
            <div className="bg-purple-100 rounded-xl p-4 w-full">
            <h2 className="font-bold text-lg mb-2">LeetCode's Interview Crash Course</h2>
            <p className="text-sm">Data Structures and Algorithms</p>
            <button className="mt-3 bg-white text-gray-800 border border-gray-300 px-3 py-1 rounded hover:shadow">Start Learning</button>
          </div>
          
          <div className="bg-blue-100 rounded-xl p-4 w-full">
            <h2 className="font-bold text-lg mb-2">Top Interview Questions</h2>
            <button className="mt-8 bg-white text-gray-800 border border-gray-300 px-3 py-1 rounded hover:shadow">Get Started</button>
          </div>
         
        </div>

        {/* Study Plan Section */}
        <ProblemTable/>
       
      </div>

      {/* Right Section - 30% */}
      <div className="w-[30%]">
        <div className="bg-white rounded-xl p-4 shadow border border-gray-200">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-gray-700">Day 12</h3>
            <span className="text-sm text-gray-400">10:05:27 left</span>
          </div>

          {/* Calendar Mockup */}
          <div className="grid grid-cols-7 gap-1 text-center text-sm text-gray-600 mb-3">
            {["S", "M", "T", "W", "T", "F", "S"].map((d, idx) => (
              <div key={idx} className="font-semibold">{d}</div>
            ))}
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                className={`py-1 rounded-full ${
                  i + 1 === 12 ? "bg-green-500 text-white" : ""
                }`}
              >
                {i + 1}
              </div>
            ))}
          </div>

          {/* Premium Box */}
          <div className="bg-orange-100 p-3 rounded-lg text-sm text-orange-700 mb-3">
            <div className="font-semibold mb-1">Weekly Premium</div>
            <div className="flex justify-between text-xs text-orange-500">
              <span>W2</span>
              <span>W3</span>
              <span>W4</span>
              <span>W5</span>
            </div>
          </div>

          <div className="text-xs text-gray-500 flex justify-between">
            <span className="text-green-500 font-medium">🪙 0 Redeem</span>
            <span className="underline cursor-pointer">Rules</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;

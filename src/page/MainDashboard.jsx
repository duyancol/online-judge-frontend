import React from "react";
import StudyPlanSection from "./StudyPlanSection";
import ProblemTable from "./ProblemTable";
import TagList from "./TagList ";

const MainDashboard = () => {
  const banners = [
    {
      title: "LeetCode's Interview Crash Course",
      description: "System Design for Interviews",
      buttonText: "Start Learning",
      link: "https://leetcode.com",
      bgGradient: "bg-gradient-to-r from-green-400 to-green-600",
    },
    {
      title: "LeetCode's Interview Crash Course",
      description: "Data Structures and Algorithms",
      buttonText: "Start Learning",
      link: "https://leetcode.com",
      bgGradient: "bg-gradient-to-r from-purple-400 to-purple-600",
    },
    {
      title: "New & Trending Company Qs",
      description: "Latest Qs From Big Tech",
      buttonText: "Claim Now",
      link: "https://leetcode.com",
      bgGradient: "bg-gradient-to-r from-orange-400 to-orange-600",
    },
  ];

  return (
    <div className="flex w-[80%] mx-auto px-8 py-6 gap-6">
      {/* Left Section - 70% */}
      <div className="w-[70%] space-y-6">
      {/* Banner Section */}
      <div className="flex gap-4 h-[140px]">
        {banners.map((item, index) => (
          <div
            key={index}
            className={`relative flex flex-col justify-between p-4 w-full rounded-2xl shadow-md text-white ${item.bgGradient} hover:scale-105 transition-transform duration-300`}
          >
            <div>
              <h2 className="font-bold text-lg leading-tight">{item.title}</h2>
              <p className="text-sm opacity-90">{item.description}</p>
            </div>
            <div>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block bg-white text-gray-800 text-sm font-semibold rounded-md px-4 py-1 shadow hover:shadow-md transition"
              >
                {item.buttonText}
              </a>
            </div>
          </div>
        ))}
      </div>
      <TagList/>
      <ProblemTable />
      {/* Study Plan Section */}
      {/* <ProblemTable /> */}
    </div>

        {/* Study Plan Section */}
        
     

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

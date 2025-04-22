import React from "react";

const studyPlans = [
  {
    title: "Top Interview 150",
    description: "Must-do List for Interview Prep",
    icon: "/images/top150.png",
  },
  {
    title: "LeetCode 75",
    description: "Ace Coding Interview with 75 Qs",
    icon: "/images/leetcode75.png",
  },
  {
    title: "SQL 50",
    description: "Crack SQL Interview in 50 Qs",
    icon: "/images/sql50.png",
  },
  {
    title: "Intro to Pandas",
    description: "Learn Basic Pandas in 15 Qs",
    icon: "/images/pandas.png",
  },
  {
    title: "30 Days of JavaScript",
    description: "Learn JS Basics with 30 Qs",
    icon: "/images/js30.png",
  },
  {
    title: "Amazon Spring '23 High Frequency",
    description: "Practice Amazon 25 Recently Asked Qs",
    icon: "/images/amazon.png",
  }
];

const StudyPlanSection = () => {
  return (
    <div className="px-6 py-8">
      <h2 className="text-xl font-semibold mb-4">Study Plan</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {studyPlans.map((plan, index) => (
          <div
            key={index}
            className="flex items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition"
          >
            <img
              src={plan.icon}
              alt={plan.title}
              className="w-12 h-12 rounded-lg mr-4"
            />
            <div>
              <h3 className="font-semibold">{plan.title}</h3>
              <p className="text-sm text-gray-500">{plan.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudyPlanSection;

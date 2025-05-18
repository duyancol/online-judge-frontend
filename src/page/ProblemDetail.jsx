import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CodeEditorSection from "./CodeEditorSection";
import ProblemDescription from "./ProblemDescription";
import Editorial from "./Editorial";
import AcceptedTab from "./AcceptedTab";
import "./ProblemDetail.css";

export default function ProblemDetail() {
  const { id } = useParams(); // current problem id
  const [activeTab, setActiveTab] = useState("Description");
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [submissionData, setSubmissionData] = useState(null);
  const [isProblemListOpen, setIsProblemListOpen] = useState(false);
  const [problems, setProblems] = useState([]);
  

  const renderTabContent = () => {
    switch (activeTab) {
      case "Description":
        return <ProblemDescription problemId={id} submissionStatus={submissionStatus} />;
      case "Editorial":
        return <Editorial problemId={id} />;
      case "Accepted":
        return <AcceptedTab submissionStatus={submissionStatus} submissionData={submissionData} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    const fetchProblemsAndAccepted = async () => {
      try {
        let problemsData = JSON.parse(localStorage.getItem("problems"));

        // 2. Nếu chưa có, fetch từ API và lưu lại vào localStorage
        if (!problemsData) {
          const problemsRes = await fetch(`https://problem.codejud.id.vn/api/problems`);
          problemsData = await problemsRes.json();
          localStorage.setItem("problems", JSON.stringify(problemsData));
        }

        const acceptedRes = await fetch(`https://submit.codejud.id.vn/api/submissions/user/duy01/accepted-problems`);
        const acceptedProblemIds = await acceptedRes.json();

        const updatedProblems = problemsData.map(problem => ({
          ...problem,
          isSolved: acceptedProblemIds.includes(problem.id),
        }));

        setProblems(updatedProblems);
      } catch (error) {
        console.error("Failed to fetch problems or accepted submissions:", error);
      }
    };

    fetchProblemsAndAccepted();
  }, []);

  return (
    <div className="problem-detail-container">
      <div className="left-section">
      <button
      className="w-[150px] ml-2 mt-2 px-3 py-1 bg-white border rounded shadow hover:bg-gray-100 font-semibold text-black"
      onClick={() => setIsProblemListOpen(true)}
    >
      ☰ <span className="font-bold">Problem List</span>
    </button>
    
        <div className="tabs">
          {["Description", "Editorial", "Solutions", "Submissions", "Accepted"].map(tab => (
            <button
              key={tab}
              className={activeTab === tab ? "tab-button active" : "tab-button"}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="tab-content-area">{renderTabContent()}</div>
      </div>

      <div className="right-section">
        <CodeEditorSection
          problemId={id}
          onSubmitResult={(status) => {
            setSubmissionStatus(status);
            setActiveTab(status === "Accepted" ? "Accepted" : "Description");
          }}
          onSubmitData={(data) => {
            setSubmissionData(data);
          }}
        />
      </div>

      {isProblemListOpen && (
        <div className=" fixed inset-0 z-50 flex">
          <div
            className="fixed  inset-0 bg-black bg-opacity-30"
            onClick={() => setIsProblemListOpen(false)}
          />
          <div className="relative w-[700px] bg-white shadow-lg h-full overflow-y-auto z-50 animate-slide-in-left .animate-slide-out-left">

            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold">Problem List</h2>
              <button onClick={() => setIsProblemListOpen(false)} className="text-xl">×</button>
            </div>
            <div className="w-22 flex items-center justify-between px-4 py-3 bg-gray-50 border-b">
            <div className="flex items-center space-x-2 bg-gray-100 rounded-full px-3 py-1.5 w-full max-w-md">
              {/* Search Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M9.5 17a7.5 7.5 0 100-15 7.5 7.5 0 000 15z" />
              </svg>
              <input
                type="text"
                placeholder="Search questions"
                className="bg-transparent focus:outline-none text-sm w-full"
              />
              {/* Sort Icon */}
              <button className="rounded-full p-1.5 hover:bg-gray-200 transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 17l-4 4m0 0l-4-4m4 4V3" />
                </svg>
              </button>
              {/* Filter Icon */}
              <button className="rounded-full p-1.5 hover:bg-gray-200 transition" >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L15 13.414V19a1 1 0 01-1.447.894l-4-2A1 1 0 019 17v-3.586L3.293 6.707A1 1 0 013 6V4z" />
                </svg>
              </button>
            </div>
          </div>
            <div className="flex flex-col item">
              {problems.map((problem, index) => {
                const isActive = String(problem.id) === String(id);
                return (
                  <div
                    key={index}
                    className={`flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer 
                      ${isActive ? "bg-black text-white" : "hover:bg-gray-100"}`}
                    onClick={() => {
                      window.location.href = `/problems/${problem.id}`;
                      setIsProblemListOpen(false);
                    }}
                  >
                    <div className="flex items-center gap-3">
                      {problem.isSolved ? (
                        <svg className={`w-4 h-4 ${isActive ? "text-green-300" : "text-green-500"}`} fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <div className="w-4 h-4" />
                      )}
                      <div className="flex items-center gap-2">
                        <span className={`${isActive ? "text-gray-300" : "text-gray-500"} text-sm`}>{problem.id}.</span>
                        <span className="font-medium text-[15px]">{problem.title}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className={`text-sm font-semibold ${
                        problem.difficulty === 'EASY' ? 'text-[#00b8a3]' :
                        problem.difficulty === 'MEDIUM' ? 'text-[#f4b400]' :
                        'text-[#db4437]'
                      }`}>
                        {problem.difficulty === 'Medium' ? 'Med.' : problem.difficulty}
                      </div>
                      <div className="flex items-center gap-1">
                        {Array(6).fill(0).map((_, idx) => (
                          <div key={idx} className="w-1 h-4 rounded-full bg-gray-300" />
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

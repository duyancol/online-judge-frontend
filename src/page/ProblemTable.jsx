import React, { useEffect, useState } from "react";
import axios from "axios";
import { CheckCircle, FileText, Lock } from "lucide-react";

export default function ProblemTable() {
  const [problems, setProblems] = useState([]);
  const [acceptedProblems, setAcceptedProblems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState("");

  useEffect(() => {
    const cachedProblems = localStorage.getItem("problems");
    if (cachedProblems) {
      setProblems(JSON.parse(cachedProblems));
    }

    setIsLoading(true);
    Promise.all([
      axios.get("https://problem.codejud.id.vn/api/problems"),
      axios.get("https://submit.codejud.id.vn/api/submissions/user/duy01/accepted-problems"),
    ])
      .then(([problemsRes, acceptedRes]) => {
        setProblems(problemsRes.data);
        setAcceptedProblems(acceptedRes.data);
        localStorage.setItem("problems", JSON.stringify(problemsRes.data));
      })
      .catch((err) => console.error("❌ Lỗi load API:", err))
      .finally(() => setIsLoading(false));
  }, []);

  const getDifficultyColor = (diff) => {
    if (diff === "EASY") return "text-green-500";
    if (diff === "MEDIUM") return "text-yellow-500";
    if (diff === "HARD") return "text-red-500";
    return "text-gray-600";
  };

  const filteredProblems = problems.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterDifficulty ? p.difficulty === filterDifficulty : true;
    return matchesSearch && matchesFilter;
  });

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center py-10">
        <div className="text-gray-500">Loading problems...</div>
      </div>
    );
  }

  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      {/* Header with search + filter icons */}
      <div className="w-22 flex items-center justify-between px-4 py-3 bg-gray-50 border-b">
        <div className="flex items-center space-x-2 bg-gray-100 rounded-full px-3 py-1.5 w-full max-w-md">
          {/* Search Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M9.5 17a7.5 7.5 0 100-15 7.5 7.5 0 000 15z" />
          </svg>
          <input
            type="text"
            placeholder="Search questions"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent focus:outline-none text-sm w-full"
          />
          {/* Sort Icon */}
          <button className="rounded-full p-1.5 hover:bg-gray-200 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 17l-4 4m0 0l-4-4m4 4V3" />
            </svg>
          </button>
          {/* Filter Icon */}
          <button className="rounded-full p-1.5 hover:bg-gray-200 transition" onClick={() => setFilterDifficulty(prev => prev ? "" : "EASY")}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L15 13.414V19a1 1 0 01-1.447.894l-4-2A1 1 0 019 17v-3.586L3.293 6.707A1 1 0 013 6V4z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-6 bg-gray-100 px-4 py-2 font-medium text-sm text-gray-600">
        <div>Status</div>
        <div>Title</div>
        <div>Solution</div>
        <div>Acceptance</div>
        <div>Difficulty</div>
        <div>Frequency</div>
      </div>

      {/* Table Rows */}
      {filteredProblems.map((p, i) => (
        <div
          key={p.id}
          className="grid grid-cols-6 items-center px-4 py-3 border-t text-sm hover:bg-gray-50"
        >
          <div>
            {acceptedProblems.includes(p.id) ? (
              <CheckCircle className="w-4 h-4 text-green-500" />
            ) : (
              <CheckCircle className="w-4 h-4 text-gray-300" />
            )}
          </div>
          <a
            href={`/problems/${p.slug || p.id}`}
            className="truncate text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
          >
            {i + 1}. {p.title}
          </a>
          <div>
            <FileText className="w-4 h-4 text-purple-500" />
          </div>
          <div>{(20 + Math.random() * 60).toFixed(2)}%</div>
          <div className={getDifficultyColor(p.difficulty)}>{p.difficulty}</div>
          <div>
            <Lock className="w-4 h-4 text-gray-300" />
          </div>
        </div>
      ))}
    </div>
  );
}

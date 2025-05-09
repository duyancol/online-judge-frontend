import React, { useEffect, useState } from "react";
import axios from "axios";
import { CheckCircle, FileText, Lock } from "lucide-react";

export default function ProblemTable() {
  const [problems, setProblems] = useState([]);
  const [acceptedProblems, setAcceptedProblems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const cachedProblems = localStorage.getItem('problems');
    if (cachedProblems) {
      setProblems(JSON.parse(cachedProblems));
    }

    setIsLoading(true);
    Promise.all([
      axios.get("https://problem.codejud.id.vn/api/problems"),
      axios.get("https://submit.codejud.id.vn/api/submissions/user/duy01/accepted-problems")
    ])
      .then(([problemsRes, acceptedRes]) => {
        setProblems(problemsRes.data);
        setAcceptedProblems(acceptedRes.data);
        localStorage.setItem('problems', JSON.stringify(problemsRes.data));
      })
      .catch(err => console.error("❌ Lỗi load API:", err))
      .finally(() => setIsLoading(false));
  }, []);

  const getDifficultyColor = (diff) => {
    if (diff === "EASY") return "text-green-500";
    if (diff === "MEDIUM") return "text-yellow-500";
    if (diff === "HARD") return "text-red-500";
    return "text-gray-600";
  };

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center py-10">
        <div className="text-gray-500">Loading problems...</div>
      </div>
    );
  }

  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <div className="grid grid-cols-6 bg-gray-100 px-4 py-2 font-medium text-sm text-gray-600">
        <div>Status</div>
        <div>Title</div>
        <div>Solution</div>
        <div>Acceptance</div>
        <div>Difficulty</div>
        <div>Frequency</div>
      </div>
      {problems.map((p, i) => (
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
          <div><FileText className="w-4 h-4 text-purple-500" /></div>
          <div>{(20 + Math.random() * 60).toFixed(2)}%</div>
          <div className={getDifficultyColor(p.difficulty)}>
            {p.difficulty}
          </div>
          <div>
            <Lock className="w-4 h-4 text-gray-300" />
          </div>
        </div>
      ))}
    </div>
  );
}

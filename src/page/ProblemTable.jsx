import React, { useEffect, useState } from "react";
import axios from "axios";
import { CheckCircle, FileText, Lock } from "lucide-react";


  

export default function ProblemTable() {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    // 👉 Nếu bạn dùng API thật thì thay URL dưới đây
    axios.get("http://14.225.205.6:8080/api/problems")
      .then(res => setProblems(res.data))
      .catch(err => console.error("❌ Lỗi load API:", err));
  }, []);

  const getDifficultyColor = (diff) => {
    if (diff === "EASY") return "text-green-500";
    if (diff === "MEDIUM") return "text-yellow-500";
    if (diff === "HARD") return "text-red-500";
    return "text-gray-600";
  };

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
            
              <CheckCircle className="w-4 h-4 text-green-500" />
           
          </div>
          <a
  href={`/problems/${p.slug || p.id}`}
  className="truncate text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
>
  {i + 1}. {p.title}
</a>
          <div><FileText className="w-4 h-4 text-purple-500" /></div>
          <div>0.00%</div>
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

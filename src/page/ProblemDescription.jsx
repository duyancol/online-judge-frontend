import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ProblemDescription({ problemId, submissionStatus }) {
  const [problem, setProblem] = useState(null);

  useEffect(() => {
    axios.get(`https://problem.codejud.id.vn/api/problems/${problemId}`)
      .then(res => setProblem(res.data))
      .catch(err => console.error("Lỗi khi tải problem:", err));
  }, [problemId]);

  if (!problem) return <div>⏳ Đang tải bài toán...</div>;

  return (
    <div>
    {submissionStatus === "Accepted" && (
      <div className="submission-status success">✔ Accepted</div>
    )}
      <h1 className="text-2xl font-bold mb-4">{problem.id}. {problem.title}</h1>
      <p className="mb-4">{problem.description}</p>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Example Input:</h2>
        <pre className="bg-gray-100 p-2 rounded whitespace-pre-wrap">{problem.sampleInput}</pre>
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Expected Output:</h2>
        <pre className="bg-gray-100 p-2 rounded whitespace-pre-wrap">{problem.sampleOutput}</pre>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        Tags: {problem.tags?.join(", ")} | Difficulty: <span className="font-medium">{problem.difficulty}</span>
      </div>
      <pre className="bg-gray-100 p-3 rounded whitespace-pre-wrap text-sm">
  {problem.examples.split("\\n").map((line, idx) => (
    <span key={idx}>{line}<br /></span>
    
  ))}
</pre>

    </div>
  );
}

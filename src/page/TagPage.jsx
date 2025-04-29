import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Search, Filter, SortAsc } from "lucide-react";
import { Play } from "lucide-react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

const TagPage = () => {
  const { tagName } = useParams();
  const [problems, setProblems] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProblemsAndAccepted = async () => {
      try {
        // Fetch danh sách problems theo tag
        const problemsRes = await fetch(`https://problem.codejud.id.vn/api/problems/tag/${encodeURIComponent(tagName)}`);
        const problemsData = await problemsRes.json();

        // Fetch danh sách bài đã accepted
        const acceptedRes = await fetch(`https://submit.codejud.id.vn/api/submissions/user/duy01/accepted-problems`);
        const acceptedProblemIds = await acceptedRes.json(); // kiểu: [1,2,3,4]

        // Gắn isSolved vào problem nào đã accepted
        const updatedProblems = problemsData.map(problem => ({
          ...problem,
          isSolved: acceptedProblemIds.includes(problem.id),
        }));

        setProblems(updatedProblems);
      } catch (error) {
        console.error("Failed to fetch problems or accepted submissions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProblemsAndAccepted();
  }, [tagName]);

  const filteredProblems = problems.filter(problem =>
    problem.title.toLowerCase().includes(searchText.toLowerCase())
  );

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-gray-500">Loading problems...</div>;
  }

  const totalProblems = problems.length;
  const solvedProblems = problems.filter(p => p.isSolved).length;
  const attemptingProblems = problems.filter(p => p.isAttempting).length;

  const easyTotal = problems.filter(p => p.difficulty === 'EASY').length;
  const mediumTotal = problems.filter(p => p.difficulty === 'MEDIUM').length;
  const hardTotal = problems.filter(p => p.difficulty === 'HARD').length;

  const easySolved = problems.filter(p => p.difficulty === 'EASY' && p.isSolved).length;
  const mediumSolved = problems.filter(p => p.difficulty === 'MEDIUM' && p.isSolved).length;
  const hardSolved = problems.filter(p => p.difficulty === 'HARD' && p.isSolved).length;

  const percentage = (solvedProblems / totalProblems) * 100;

  return (
    <div className="flex p-6 gap-8 w-[80%] mx-auto">
      {/* Sidebar */}
      <div className="w-[450px] bg-white p-6 rounded-2xl shadow flex flex-col gap-6">
        {/* Info Card */}
        <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-md">
          <div className="relative">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
              <img src="https://img.icons8.com/ios-filled/100/graduation-cap.png" alt="Tag Icon" className="w-10 h-10" />
            </div>
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-purple-200 rounded-full flex items-center justify-center">
              <img src="https://img.icons8.com/emoji/48/star-emoji.png" alt="Star Icon" className="w-4 h-4" />
            </div>
          </div>
          <h1 className="mt-4 text-3xl font-bold capitalize">{tagName}</h1>
          <p className="mt-1 text-gray-500 text-sm">
            LeetCode · {totalProblems} questions · 0 Saved
          </p>
          <div className="flex items-center space-x-3 mt-4">
            <button className="flex items-center px-4 py-2 bg-black text-white rounded-full font-semibold text-sm">
              <Play className="w-4 h-4 mr-2" />
              Practice
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <i className="fas fa-star text-gray-600"></i>
              </div>
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <i className="fas fa-external-link-alt text-gray-600"></i>
              </div>
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <i className="fas fa-share-alt text-gray-600"></i>
              </div>
            </div>
          </div>
          <p className="mt-3 text-xs text-gray-400 flex items-center">⚡ Updated: 5 days ago</p>
        </div>

        {/* Progress Card */}
        <div className="flex flex-col gap-6 p-6 bg-white rounded-2xl shadow-md">
          <h2 className="text-lg font-semibold text-gray-800">Progress</h2>

          <div className="flex items-center justify-center relative">
            <div className="w-32 h-32">
              <CircularProgressbar
                value={percentage}
                strokeWidth={8}
                styles={buildStyles({
                  pathColor: '#22c55e',
                  trailColor: '#e5e7eb',
                  textColor: '#111827',
                  textSize: '16px',
                })}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-2xl font-bold">{solvedProblems}<span className="text-gray-400">/{totalProblems}</span></div>
                <span className="text-green-500">Solved</span>
                <div className="text-xs text-gray-400 mt-1">{attemptingProblems} Attempting</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center bg-gray-50 p-2 rounded-lg">
              <span className="text-green-500 font-semibold">Easy</span>
              <span className="text-gray-600 text-sm">{easySolved}/{easyTotal}</span>
            </div>
            <div className="flex justify-between items-center bg-gray-50 p-2 rounded-lg">
              <span className="text-yellow-500 font-semibold">Med.</span>
              <span className="text-gray-600 text-sm">{mediumSolved}/{mediumTotal}</span>
            </div>
            <div className="flex justify-between items-center bg-gray-50 p-2 rounded-lg">
              <span className="text-red-500 font-semibold">Hard</span>
              <span className="text-gray-600 text-sm">{hardSolved}/{hardTotal}</span>
            </div>
          </div>
        </div>

        {/* Discuss */}
        <div className="flex items-center gap-2 text-gray-600 hover:underline cursor-pointer">
          💬 Discuss
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col gap-4">
        {/* Search */}
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-lg flex-1">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              className="bg-transparent outline-none flex-1"
              placeholder="Search questions"
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
            />
          </div>
          <button className="p-2 bg-gray-100 rounded-full">
            <SortAsc className="w-5 h-5" />
          </button>
          <button className="p-2 bg-gray-100 rounded-full">
            <Filter className="w-5 h-5" />
          </button>
        </div>

        {/* Problems list */}
        <div className="flex flex-col">
          {filteredProblems.map((problem, index) => (
            <div key={index} className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 rounded-lg cursor-pointer">
              {/* Left: solved + title */}
              <div className="flex items-center gap-3">
                {problem.isSolved ? (
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <div className="w-4 h-4" />
                )}
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 text-sm">{problem.id}.</span>
                  <a href={`/problems/${problem.id}`}><span className="font-medium text-[15px]">{problem.title}</span></a>
                </div>
              </div>

              {/* Right: difficulty */}
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
          ))}
        </div>

      </div>
    </div>
  );
};

export default TagPage;

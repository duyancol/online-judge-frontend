import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Thêm dòng này

const TagList = () => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Thêm dòng này

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch("https://problem.codejud.id.vn/api/problems/tag");
        const data = await response.json();
        setTags(data);
      } catch (error) {
        console.error("Failed to fetch tags:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, []);

  if (loading) {
    return <div className="text-sm text-gray-500">Loading tags...</div>;
  }

  const handleTagClick = (tag) => {
    navigate(`/tag/${encodeURIComponent(tag)}`);
  };

  return (
    <div className="flex items-center flex-wrap gap-3 text-sm text-gray-800">
      {tags.map((tag, index) => (
        <div
          key={index}
          onClick={() => handleTagClick(tag)}
          className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-medium text-xs capitalize cursor-pointer hover:bg-blue-200"
        >
          {tag}
        </div>
      ))}
      <button className="text-gray-500 hover:text-gray-700 flex items-center space-x-1 text-sm">
        <span>Expand</span>
        <span className="text-xs">⌄</span>
      </button>
    </div>
  );
};

export default TagList;

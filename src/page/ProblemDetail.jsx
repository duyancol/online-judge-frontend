import React, { useState } from "react";
import { useParams } from "react-router-dom";
import CodeEditorSection from "./CodeEditorSection";
import ProblemDescription from "./ProblemDescription";
import Editorial from "./Editorial";


import "./ProblemDetail.css";

export default function ProblemDetail() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("Description");

  const renderTabContent = () => {
    switch (activeTab) {
      case "Description":
        return <ProblemDescription problemId={id} />;
      case "Editorial":
        return <Editorial problemId={id} />;
      default:
        return null;
    }
  };

  return (
    <div className="problem-detail-container">
      <div className="left-section">
        <div className="tabs">
          {["Description", "Editorial", "Solutions", "Submissions"].map(tab => (
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
        <CodeEditorSection problemId={id} />
      </div>
    </div>
  );
}

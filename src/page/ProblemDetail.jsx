import React, { useState } from "react";
import { useParams } from "react-router-dom";
import CodeEditorSection from "./CodeEditorSection";
import ProblemDescription from "./ProblemDescription";
import Editorial from "./Editorial";
import AcceptedTab from "./AcceptedTab";

import "./ProblemDetail.css";

export default function ProblemDetail() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("Description");
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [submissionData, setSubmissionData] = useState(null);
  const renderTabContent = () => {
    switch (activeTab) {
      case "Description":
        return (
          <ProblemDescription
            problemId={id}
            submissionStatus={submissionStatus}
          />
        );
      case "Editorial":
        return <Editorial problemId={id} />;
      case "Accepted":
        return <AcceptedTab submissionStatus={submissionStatus} submissionData={submissionData} />;
      default:
        return null;
    }
  };

  return (
    <div className="problem-detail-container">
      <div className="left-section">
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
        if (status === "Accepted") {
          setActiveTab("Accepted"); // Phải khớp với case trong renderTabContent
        }else{
          setActiveTab("Description");
        }
      }}
      onSubmitData={(data) => {
        setSubmissionData(data); // lưu lại full submission
      }}
    />
      </div>
    </div>
  );
}

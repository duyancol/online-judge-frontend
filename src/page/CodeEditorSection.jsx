import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PlayIcon, BugIcon, UploadCloudIcon } from "lucide-react";
import { useParams } from "react-router-dom";

const languages = ["java", "c", "cpp"];

export default function CodeEditorSection() {
  const [problems, setProblems] = useState([]);
  const [selectedProblemId, setSelectedProblemId] = useState(null);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("java");
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingRun, setIsLoadingRun] = useState(false);
  const [runResult, setRunResult] = useState(null);
  const { id } = useParams();
const [submissionResult, setSubmissionResult] = useState(null);

useEffect(() => {
  fetch("https://problem.codejud.id.vn/api/problems")
    .then((res) => res.json())
    .then((data) => {
      setProblems(data);

      // Convert id từ URL sang number để so sánh
      const problemIdFromUrl = Number(id);
      const matched = data.find((p) => p.id === problemIdFromUrl);

      if (matched) {
        setSelectedProblemId(matched.id);
        setSelectedProblem(matched);
      } else if (data.length > 0) {
        setSelectedProblemId(data[0].id);
        setSelectedProblem(data[0]);
      }
    });
}, [id]);




  useEffect(() => {
    if (selectedProblem) {
      setCode("// Write your code here");
    }
  }, [selectedProblem, selectedLanguage]);

  const renderHeader = () => {
    if (!selectedProblem) return null;
    const { methodName, methodSignature, returnType } = selectedProblem;

    if (selectedLanguage === "java") {
      return (
        <pre className="bg-gray-100 rounded-t-md p-2 font-mono text-sm">
          <code>public class Solution {"{"}</code>
          <br />
          <code>    public {methodSignature} {methodName}({returnType}) {"{"}</code>
        </pre>
      );
    }

    return (
      <pre className="bg-gray-100 rounded-t-md p-2 font-mono text-sm">
        <code>{methodSignature} {methodName}({returnType}) {"{"}</code>
      </pre>
    );
  };

  const renderFooter = () => {
    if (selectedLanguage === "java") {
      return (
        <pre className="bg-gray-100 rounded-b-md p-2 font-mono text-sm border-t border-gray-300">
          <code>    {"}"}</code>
          <br />
          <code>{"}"}</code>
        </pre>
      );
    }
    return (
      <pre className="bg-gray-100 rounded-b-md p-2 font-mono text-sm border-t border-gray-300">
        <code>{"}"}</code>
      </pre>
    );
  };

  const handleRun = async () => {
    if (!selectedProblem) return alert("No problem selected");
    setSubmissionResult(null)
    const payload = {
      problemId: selectedProblem.id,
      userId: "duy01",
      language: selectedLanguage,
      code,
      input: selectedProblem.sampleInput,
      expectedOutput: selectedProblem.sampleOutput
    };

    try {
      setIsLoadingRun(true);
      const res = await fetch("http://14.225.205.6:8081/api/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setRunResult(data);
    } catch (err) {
     
      console.error("Run failed:", err);
    } finally {
      setIsLoadingRun(false);
    }
  };

  const handleSubmit = async () => {
    if (!selectedProblem) return alert("No problem selected");

    const payload = {
      problemId: selectedProblem.id,
      userId: "duy01",
      language: selectedLanguage,
      code: code,
      input: selectedProblem.sampleInput,
      expectedOutput: selectedProblem.sampleOutput
    };

    try {
      setIsLoading(true);
      const res = await fetch("http://14.225.205.6:8081/api/submissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("✅ Submission response:", data);
     
      setSubmissionResult(data);
    } catch (err) {
      console.error("❌ Submit failed:", err);
      
    } finally {
      setIsLoading(false); // 👉 tắt loading dù thành công hay thất bại
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Submit Code</h1>

      <Card className="mb-4">
        <CardContent className="space-y-4 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
          <div className="hidden">
          
          <Select
          
          label="Problem"
          value={selectedProblemId?.toString()} // ✅ Đồng bộ đúng value
          onValueChange={(val) => {
            const selected = problems.find(p => p.id === Number(val));
            if (selected) {
              setSelectedProblemId(selected.id);
              setSelectedProblem(selected);
            }
          }}
        >
          {problems.map((problem) => (
            <SelectItem key={problem.id} value={problem.id.toString()}>
              {problem.title}
            </SelectItem>
          ))}
        </Select>
          </div>

          <Select
          className="w-32"
          label="Language"
          defaultValue={selectedLanguage}
          onValueChange={(val) => setSelectedLanguage(val)}
        >
          {languages.map((lang) => (
            <SelectItem key={lang} value={lang}>
              {lang.toUpperCase()}
            </SelectItem>
          ))}
        </Select>
          </div>

          {/* Code editor */}
          {renderHeader()}
          {/* Code editor với số dòng */}
<div className="flex font-mono text-sm h-64 border border-gray-300 rounded-md overflow-hidden">
{/* Số dòng */}
{/* Số dòng bên trái */}
<div className="bg-gray-100 text-gray-500 px-2 py-2 text-right select-none min-w-[2rem]">
    {Array.from({ length: Math.max(code.split("\n").length, 1) }).map((_, i) => (
      <div key={i} className="leading-6">{i + 6}</div>
    ))}
  </div>


{/* Textarea */}
<Textarea
  className="flex-1 h-full border-none resize-none rounded-none focus:outline-none"
  value={code}
  onChange={(e) => setCode(e.target.value)}
/>
</div>
          {renderFooter()}

          {/* Sample I/O */}
          {selectedProblem && (
            <Card>
              <CardContent className="bg-gray-50 space-y-2 p-3 text-sm font-mono">
                <div>
                  <strong>Input:</strong> {selectedProblem.sampleInput}
                </div>
                <div>
                  <strong>Output:</strong>{" "}
                  <span className="text-green-600">
                    {selectedProblem.sampleOutput}
                  </span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Button actions */}
          <div className="flex items-center justify-end space-x-2 pt-2">
            <Button variant="ghost" disabled className="text-gray-400 flex items-center space-x-1">
              <BugIcon className="w-4 h-4" />
              <span>Debug</span>
            </Button>

            <Button variant="secondary" onClick={handleRun} className="flex items-center space-x-1"  disabled={isLoadingRun}
            >
              {isLoadingRun && (
                <svg
                  className="animate-spin h-4 w-4 mr-1 text-white-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
              )}
              <span>{isLoadingRun ? "Runing..." : "Run"}</span>
              <PlayIcon className="w-4 h-4" />
             
            </Button>

            <Button 
            onClick={handleSubmit} 
            className="flex items-center space-x-1 text-green-600"
            disabled={isLoading}
          >
            {isLoading && (
              <svg
                className="animate-spin h-4 w-4 mr-1 text-white-600"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
            )}
            <span>{isLoading ? "Submitting..." : "Submit"}</span>
          </Button>
          

            
          </div>

          {[runResult].map((result, idx) =>
            result && (
              <Card className="mt-4" key={idx}>
                <CardContent className="p-4 space-y-2 text-sm">
                  <h2 className="text-lg font-semibold">{idx === 0 ? "Kết quả chấm bài:" : "Kết quả chạy thử:"}</h2>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span className={result.status === "PASS" ? "text-green-600" : "text-red-600"}>
                      {result.status}
                    </span>
                  </p>
                  {result.errorMessage && (
                    <div>
                      <strong className="text-yellow-700">Error Message:</strong>
                      <pre className="bg-yellow-100 p-2 rounded whitespace-pre-wrap text-yellow-800">
                        {result.errorMessage}
                      </pre>
                    </div>
                  )}
                  {!result.errorMessage && (
                    <>
                      <p><strong>Output:</strong> {result.output}</p>
                    </>
                  )}
                </CardContent>
              </Card>
            )
          )}
          {submissionResult && (
  <Card className="mt-4">
    <CardContent className="p-4 space-y-2 text-sm">
      <h2 className="text-lg font-semibold">Kết quả chấm bài:</h2>

      {/* Trạng thái */}
      <p>
        <strong>Status:</strong>{" "}
        <span className={submissionResult.status === "PASS" ? "text-green-600" : "text-red-600"}>
          {submissionResult.status}
        </span>
      </p>

      {/* ✅ TH1: Nếu có lỗi biên dịch hoặc runtime */}
      {submissionResult.errorMessage && (
        <div>
          <strong className="text-yellow-700">Error Message:</strong>
          <pre className="bg-yellow-100 p-2 rounded whitespace-pre-wrap text-yellow-800">
            {submissionResult.errorMessage}
          </pre>
        </div>
      )}

      {/* ✅ TH2: Nếu KHÔNG có lỗi => show input/output cho cả PASS và FAIL */}
      {!submissionResult.errorMessage && (
        <div className="space-y-1 text-gray-800">
        <p><strong>Input:</strong> {selectedProblem.sampleInput}</p>
        <p><strong>Expected Output:</strong> {selectedProblem.sampleOutput}</p>
        {submissionResult && (
          <Card className="mt-4">
            <CardContent className="p-4 space-y-2 text-sm">
              
        
              {/* Status chung */}
              <p>
                <strong>Status:</strong>{" "}
                <span className={submissionResult.status === "PASS" ? "text-green-600" : "text-red-600"}>
                  {submissionResult.status}
                </span>
              </p>
        
              {/* ✅ TH1: Có lỗi runtime hoặc compile */}
              {submissionResult.errorMessage && (
                <div>
                  <strong className="text-yellow-700">Error Message:</strong>
                  <pre className="bg-yellow-100 p-2 rounded whitespace-pre-wrap text-yellow-800">
                    {submissionResult.errorMessage}
                  </pre>
                </div>
              )}
        
              {/* ✅ TH2: Hiển thị danh sách test case nếu không có lỗi hệ thống */}
              {!submissionResult.errorMessage && submissionResult.output && (
                <>
                  <h3 className="mt-4 font-semibold">Test case:</h3>
                  {submissionResult.output
                    .slice(1, -1) // Bỏ dấu [ ]
                    .split("TestResult")
                    .filter(Boolean)
                    .map((item, idx) => {
                      const clean = item.replace(/^\[/, "").replace(/\]$/, "");
                      const inputMatch = clean.match(/input=\[(.*?\]),(.*?), expectedOutput=/);
                      const expectedMatch = clean.match(/expectedOutput=\[(.*?)\], actualOutput=/);
                      const actualMatch = clean.match(/actualOutput=\[(.*?)\], passed=/);
                      const passedMatch = clean.match(/passed=(true|false)/);
        
                      const passed = passedMatch?.[1] === "true";
                      return (
                        <div
                          key={idx}
                          className={`p-3 rounded-md border ${passed ? "bg-green-50 border-green-300" : "bg-red-50 border-red-300"}`}
                        >
                          <p><strong>Input:</strong> [{inputMatch?.[1] ?? "?"}],{inputMatch?.[2] ?? "?"}</p>
                          <p><strong>Expected Output:</strong> [{expectedMatch?.[1] ?? "?"}]</p>
                          <p><strong>Your Output:</strong> [{actualMatch?.[1] ?? "?"}]</p>
                          <p>
                            <strong>Status:</strong>{" "}
                            {passed ? <span className="text-green-600">✅ Passed</span> : <span className="text-red-600">❌ Failed</span>}
                          </p>
                        </div>
                      );
                    })}
                </>
              )}
            </CardContent>
          </Card>
        )}
        
        
        </div>
      )}
    </CardContent>
  </Card>
)}

        </CardContent>
      </Card>
    </div>
  );
}

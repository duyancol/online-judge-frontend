import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { CheckCircle } from "lucide-react";
import { ButtonTime } from "../components/ui/buttontime";

export default function AcceptedTab({ submissionData }) {
  const [histogramData, setHistogramData] = useState({ time: [], memory: [] });
  const [userTimeMs, setUserTimeMs] = useState(null);
  const [selectedMetric, setSelectedMetric] = useState("time");
  const [bestRuntimePercent, setBestRuntimePercent] = useState(null);

  useEffect(() => {
    if (!submissionData?.output) return;

    const match = submissionData.output.match(/executionTimeMs=(\d+)/);
    if (match) {
      setUserTimeMs(parseInt(match[1]));
    }
  }, [submissionData?.output]);

  useEffect(() => {
    if (!submissionData?.problemId || !submissionData?.language || userTimeMs === null) return;

    const fetchStats = async () => {
      try {
        const res = await fetch(
          `https://submit.codejud.id.vn/api/submissions/stats?problemId=${submissionData.problemId}&language=${submissionData.language.toLowerCase()}`
        );
        const data = await res.json();

        // Group theo label
        const timeCounts = new Map();

        data.forEach((item) => {
          if (item.executionTimeMs !== null) {
            const seconds = item.executionTimeMs/1000  +1;
            const label = `${seconds.toFixed(1)}ms`;
            const prev = timeCounts.get(label) || 0;
            timeCounts.set(label, prev + item.count);
          } else {
            const prev = timeCounts.get("N/A") || 0;
            timeCounts.set("N/A", prev + item.count);
          }
        });

        let timeData = Array.from(timeCounts.entries()).map(([label, value]) => ({
          label,
          value,
          isUser: false,
        }));

        // Sort tăng dần
        timeData.sort((a, b) => parseFloat(a.label) - parseFloat(b.label));

        // Gắn isUser
        const userLabel = userTimeMs !== null ? `${(userTimeMs / 1000).toFixed(1)}ms` : null;
        timeData = timeData.map(item => ({
          ...item,
          isUser: item.label === userLabel,
        }));

        setHistogramData({ time: timeData, memory: [] });

        // Tính % nhanh hơn
        const total = data.reduce((acc, curr) => acc + curr.count, 0);
        const slower = data.filter(item => item.executionTimeMs > userTimeMs).reduce((acc, curr) => acc + curr.count, 0);

        const fasterPercent = (slower / total) * 100;
        setBestRuntimePercent(fasterPercent.toFixed(1));
      } catch (err) {
        console.error("Failed to load stats", err);
      }
    };

    fetchStats();
  }, [submissionData?.problemId, submissionData?.language, userTimeMs]);

  if (!submissionData) return null;

  const { userId, createdAt } = submissionData;
  const executionTime = userTimeMs !== null ? `${(userTimeMs / 1000 +1).toFixed(1)}ms` : "N/A";

  const formattedDate = new Date(createdAt).toLocaleString("en-US", {
    year: "numeric", month: "short", day: "2-digit",
    hour: "2-digit", minute: "2-digit",
  });

  const generateFakeMemoryData = () => {
    return [1, 2, 3, 4, 5].map((i) => ({
      label: `${i * 1000}kb`,
      value: Math.floor(Math.random() * 20) + 1,
      isUser: false,
    }));
  };

  const currentData = selectedMetric === "time" ? histogramData.time : (histogramData.memory.length > 0 ? histogramData.memory : generateFakeMemoryData());

  return (
    <Card className="mt-4">
      <CardContent className="p-4 space-y-4 text-sm">
        {/* Accepted Info */}
        <div className="flex items-start gap-2">
          <CheckCircle className="text-green-600 mt-1" size={18} />
          <div className="space-y-1">
            <div className="text-green-600 font-medium">Accepted</div>
            <div className="flex items-center text-gray-600">
              <div className="flex items-center gap-1">
                <div className="w-5 h-5 rounded-full bg-pink-500 text-white flex items-center justify-center text-xs font-bold">
                  {userId?.charAt(0).toUpperCase()}
                </div>
                <span className="font-semibold text-black">{userId}</span>
                <span className="ml-1">submitted at {formattedDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Runtime Info */}
        <p className="pt-1">
          <strong>⏱ Time execution:</strong> {executionTime}
        </p>

        {/* Switch metric button */}
        <div className="flex gap-2">
          <ButtonTime
            title="⏱ Runtime"
            value={executionTime}
            best={bestRuntimePercent ? `${bestRuntimePercent}%` : "-"}
            isSelected={selectedMetric === "time"}
            onClick={() => setSelectedMetric("time")}
          />

          <ButtonTime
            title="\ud83d\udce5 Memory"
            value="43.4 MB"
            best="50.3%"
            isSelected={selectedMetric === "memory"}
            onClick={() => setSelectedMetric("memory")}
          />
        </div>

        {/* Histogram Chart */}
        {currentData.length > 0 && (
          <div className="w-full h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={currentData}>
                <XAxis dataKey="label" fontSize={10} />
                <YAxis fontSize={10} />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" isAnimationActive={false} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

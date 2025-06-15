"use client";

import { useState } from "react";
import { BreadcrumbDemo } from "./BreadCrums";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";

const lineData1 = [
  { name: "MON", value: 1000 },
  { name: "TUE", value: 1200 },
  { name: "WED", value: 4500 },
  { name: "THU", value: 1300 },
  { name: "FRI", value: 2000 },
  { name: "SAT", value: 3500 },
  { name: "SUN", value: 2800 },
];

const lineData2 = [
  { name: "MON", value: 800 },
  { name: "TUE", value: 1900 },
  { name: "WED", value: 2100 },
  { name: "THU", value: 3400 },
  { name: "FRI", value: 1800 },
  { name: "SAT", value: 3900 },
  { name: "SUN", value: 2400 },
];

const pieData1 = [
  { name: "Label 1", value: 48.8 },
  { name: "Label 2", value: 24.3 },
  { name: "Label 3", value: 14.6 },
  { name: "Label 4", value: 12.3 },
];

const pieData2 = [
  { name: "Label 1", value: 40 },
  { name: "Label 2", value: 30 },
  { name: "Label 3", value: 20 },
  { name: "Label 4", value: 10 },
];

const colors = ["#22c55e", "#86efac", "#bbf7d0", "#dcfce7"];

const educationData = [
  { label: "ITU", value: 85 },
  { label: "FAST", value: 75 },
  { label: "UMT", value: 65 },
  { label: "GIKI", value: 60 },
  { label: "Cambridge", value: 50 },
  { label: "NUST", value: 70 },
  { label: "KIPS", value: 45 },
  { label: "UCP", value: 80 },
  { label: "Label 1", value: 66 },
];

export default function AnalyticsMainSection() {
  const [selectedLine, setSelectedLine] = useState("line1");
  const [selectedPie, setSelectedPie] = useState("opt1");

  const currentLineData = selectedLine === "line1" ? lineData1 : lineData2;
  const currentPieData = selectedPie === "opt1" ? pieData1 : pieData2;

  return (
    <div className="p-6">
      <BreadcrumbDemo />
      <h1 className="text-2xl font-semibold pt-8 pb-6">Campaign Analytics</h1>

      {/* Line Chart */}
      <div className="bg-white rounded-[6px] p-4 border shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2">
            <Button
              size="sm"
              className={`${
                selectedLine === "line1" ? "bg-[#16A34A] text-white" : "bg-[#F0FDF4]"
              }`}
              onClick={() => setSelectedLine("line1")}
            >
              Line 1
            </Button>
            <Button
              size="sm"
              variant="outline"
              className={selectedLine === "line2" ? "bg-[#16A34A] text-white" : "bg-[#F0FDF4]"}
              onClick={() => setSelectedLine("line2")}
            >
              Line 2
            </Button>
          </div>
          <Select value={selectedLine} onValueChange={setSelectedLine}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a line" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="line1">Line 1</SelectItem>
              <SelectItem value="line2">Line 2</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={currentLineData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#22c55e"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

    
      <div className="md:flex w-full gap-4">
      
        <div className="mt-6 bg-white w-full p-6 rounded-lg border shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Educational Background</h2>
          <div className="space-y-3">
            {educationData.map((edu, idx) => (
              <div key={idx}>
                <div className="text-sm font-medium">{edu.label}</div>
                <Progress
                  value={edu.value}
                  className="h-3 bg-[#E7F9ED] [&>div]:bg-[#16A34A] rounded-full"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white flex flex-col items-center justify-start gap-12 w-full mt-6 rounded-lg p-4 border shadow-sm">
          <div className="flex mb-4">
            <Select value={selectedPie} onValueChange={setSelectedPie}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="opt1">Option A</SelectItem>
                <SelectItem value="opt2">Option B</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={currentPieData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={120}
                innerRadius={50}
                paddingAngle={0}
                labelLine={false}
                label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
                  const RADIAN = Math.PI / 180;
                  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                  const x = cx + radius * Math.cos(-midAngle * RADIAN);
                  const y = cy + radius * Math.sin(-midAngle * RADIAN);

                  const percentage = `${(percent * 100).toFixed(1)}%`;
                  const label = currentPieData[index].name;

                  const labelColor = index < 2 ? "#ffffff" : "#22c55e";

                  return (
                    <g>
                      <text
                        x={x}
                        y={y - 12}
                        fill={labelColor}
                        textAnchor="middle"
                        dominantBaseline="central"
                        style={{ fontSize: 14, fontWeight: 600 }}
                      >
                        {label}
                      </text>
                      <rect
                        x={x - 20}
                        y={y}
                        width={40}
                        height={20}
                        rx={4}
                        ry={4}
                        fill="white"
                      />
                      <text
                        x={x}
                        y={y + 10}
                        fill="#22c55e"
                        textAnchor="middle"
                        dominantBaseline="central"
                        style={{ fontSize: 12, fontWeight: 600 }}
                      >
                        {percentage}
                      </text>
                    </g>
                  );
                }}
              >
                {currentPieData.map((_, i) => (
                  <Cell key={`cell-${i}`} fill={colors[i % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

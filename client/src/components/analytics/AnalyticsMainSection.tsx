"use client";
import { useEffect, useState } from "react";
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
import axios from "axios";
import Link from "next/link";

interface AgeDataItem {
  age: number;
  count: number;
}

interface UniversityDataItem {
  university: string;
  count: number;
}

interface CityDataItem {
  city: string;
  percentage: string;
}

const colors = ["#22c55e", "#86efac", "#bbf7d0", "#dcfce7"];

export default function AnalyticsMainSection() {
  const [selectedLine, setSelectedLine] = useState("age");
  const [selectedPie, setSelectedPie] = useState("city");
  const [ageData, setAgeData] = useState<AgeDataItem[]>([]);
  const [cityData, setCityData] = useState<CityDataItem[]>([]);
  const [isUserSubscribed, setIsUserSubscribed] = useState(false);
  const storedUser = localStorage.getItem("user");
  const user = JSON.parse(storedUser || "{}");
  const [universityData, setUniversityData] = useState<UniversityDataItem[]>(
    []
  );

  const transformedAgeData = ageData.map((item) => ({
    name: item.age?.toString() || "",
    value: item.count || 0,
  }));

  const transformedUniversityData = universityData.map((item) => ({
    label: item.university || "",
    value: item.count || 0,
  }));

  const transformedCityData = cityData.map((item) => ({
    name: item.city || "",
    value: parseFloat(item.percentage) || 0,
  }));

  const currentLineData = transformedAgeData;
  const currentPieData = transformedCityData;

  const getUserSubscription = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL_SUBSCRIPTION}/subs?user_id=${user.id}`
      );
      if (response.data.plan === "free") {
        setIsUserSubscribed(false);
      } else {
        setIsUserSubscribed(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserSubscription();
  }, []);

  const getAgeData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL_ANALYTICS}/analytics/age`
      );
      setAgeData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getCityData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL_ANALYTICS}/analytics/city`
      );
      setCityData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getUniversityData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL_ANALYTICS}/analytics/university`
      );
      setUniversityData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAgeData();
    getCityData();
    getUniversityData();
  }, []);

  return (
    <div className="p-6 relative">
      {!isUserSubscribed && (
        <div className="absolute top-0 right-0 w-full h-full flex flex-col items-center pt-32 z-10 backdrop-blur-md">
          <h2 className="text-2xl font-semibold mb-4 text-center ">
            Subscribe to Pro
          </h2>
          <p className="text-lg text-gray-600 mb-4 text-center max-w-md">
            Subscribe to Pro to get access to all features.
          </p>
          <Link href="/pricing">
            <Button className="bg-[#16A34A] text-white">Subscribe</Button>
          </Link>
        </div>
      )}
      <BreadcrumbDemo />
      <h1 className="text-2xl font-semibold pt-8 pb-6">Campaign Analytics</h1>
      <div className="bg-white rounded-[6px] p-4 border shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2">
            <Button size="sm" className="bg-[#16A34A] text-white">
              Age Distribution
            </Button>
          </div>
          <Select value={selectedLine} onValueChange={setSelectedLine}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select data" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="age">Age Distribution</SelectItem>
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
            {transformedUniversityData.map((edu, idx) => (
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
                <SelectValue placeholder="Select data" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="city">City Distribution</SelectItem>
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
                label={({
                  cx,
                  cy,
                  midAngle,
                  innerRadius,
                  outerRadius,
                  percent,
                  index,
                }) => {
                  const RADIAN = Math.PI / 180;
                  const radius =
                    innerRadius + (outerRadius - innerRadius) * 0.5;
                  const x = cx + radius * Math.cos(-midAngle * RADIAN);
                  const y = cy + radius * Math.sin(-midAngle * RADIAN);

                  const percentage = `${(percent * 100).toFixed(1)}%`;
                  const label = currentPieData[index]?.name || "";

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

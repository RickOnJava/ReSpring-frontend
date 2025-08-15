import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { server } from "@/config";
import { useSelector } from "react-redux";

const COLORS = ["#22c55e", "#ef4444", "#facc15"];

export default function AdminAnalytics() {
  const [data, setData] = useState(null);
  const { token } = useSelector((store) => store.auth);
  useEffect(() => {
    const fetchAnalytics = async () => {
      const res = await axios.get(`${server}/api/v1/admin/analytics`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(res.data);
    };
    fetchAnalytics();
  }, []);

  if (!data) return <div className="p-6">Loading...</div>;

  const statusData = [
    { name: "Resolved", value: data.resolvedReports },
    { name: "Unresolved", value: data.unresolvedReports },
  ];

  const springStatus = [
    { name: "Active", value: data.activeSprings },
    { name: "Dry", value: data.drySprings },
  ];

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-3xl font-bold text-gray-800">
        Admin Analytics Dashboard
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        <Card className="shadow-md border-green-200">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-500">Total Springs</p>
            <p className="text-2xl font-semibold text-green-600">
              {data.totalSprings}
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-md border-emerald-200">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-500">Active Springs</p>
            <p className="text-2xl font-semibold text-emerald-600">
              {data.activeSprings}
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-md border-yellow-200">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-500">Dry Springs</p>
            <p className="text-2xl font-semibold text-yellow-600">
              {data.drySprings}
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-md border-blue-200">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-500">Total Reports</p>
            <p className="text-2xl font-semibold text-blue-600">
              {data.totalReports}
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-md border-purple-200">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-500">Resolved Reports</p>
            <p className="text-2xl font-semibold text-purple-600">
              {data.resolvedReports}
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-md border-rose-200">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-500">Unresolved Reports</p>
            <p className="text-2xl font-semibold text-rose-600">
              {data.unresolvedReports}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-6 shadow-md">
          <h3 className="text-lg font-semibold mb-4">Reports Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.monthlyReports}>
              <XAxis dataKey="_id" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#22c55e" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 shadow-md">
          <h3 className="text-lg font-semibold mb-4">
            Report Status Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label
              >
                {statusData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}

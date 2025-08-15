import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { server } from "@/config";

export default function AdminDashboard() {
  // const [stats, setStats] = useState({ totalSprings: 0, totalReports: 0, active: 0, dry: 0 });

  const { token } = useSelector((store) => store.auth);

  const [springs, setSprings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchStats() {
      const springsRes = await axios.get(`${server}/api/v1/springs`);
      // const reportsRes = await axios.get(`${server}/api/v1/reports`);
      // const active = springsRes.data.filter((s) => s.status === "Active").length;
      // const dry = springsRes.data.filter((s) => s.status === "Dry").length;
      // const low = springsRes.data.filter((s) => s.status === "Low").length;

      // setStats({
      //   totalSprings: springsRes.data.length,
      //   totalReports: reportsRes.data.length,
      //   active,
      //   dry,
      //   low
      // });

      setSprings(springsRes.data);
    }

    fetchStats();
  }, []);  // here inside dependency spring tha

  

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${server}/api/v1/springs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(res);

      if(res.data.success) {
        toast(res.data.message || 'Spring deleted successfully');
        setSprings(springs.filter(spring => spring._id !== id));
      }
    } catch (err) {
      toast(err.response?.data?.message || 'Internal error');
    }
  }

  return (
    <div>
      {/* <h1 className="text-3xl font-bold mb-4 text-green-800">Admin Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card title="Total Springs" count={stats.totalSprings} />
        <Card title="Reports" count={stats.totalReports} />
        <Card title="Active Springs" count={stats.active} />
        <Card title="Dry Springs" count={stats.dry} />
        <Card title="Low Springs" count={stats.low} />
      </div> */}

       {/* Spring Details */}
       <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {springs.map((spring) => (
          <div key={spring._id} className="bg-white shadow-md p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-2">{spring.name}</h2>
            <p><strong>Coordinates: </strong> {spring.location.coordinates[1]}, {spring.location.coordinates[0]}</p>
            <p><strong>Status:</strong> {spring.status}</p>
            <p><strong>Flow Rate:</strong> {spring.flowRate}</p>
            <div className=" flex items-center justify-between">
              <button
            onClick={() => navigate(`/admin/edit-spring/${spring._id}`)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Edit
            </button>
            <button
            onClick={() => handleDelete(spring._id)}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
              Delete
            </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Card({ title, count }) {
  return (
    <div className="bg-white shadow-md p-4 rounded-lg text-center">
      <h2 className="text-sm text-gray-500">{title}</h2>
      <p className="text-2xl font-bold text-green-700">{count}</p>
    </div>
  );
}

// src/pages/admin/AllReports.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { server } from "@/config";

export default function AllReports() {
  const [reports, setReports] = useState([]);
  const [search, setSearch] = useState("");

  const filteredReports = reports.filter(
    (r) =>
      r.message.toLowerCase().includes(search.toLowerCase()) ||
      r.spring?.name?.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const fetchReports = async () => {
      const res = await axios.get(`${server}/api/v1/reports`);
      setReports(res.data);
    };
    fetchReports();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">📄 All User Reports</h2>

      <input
        type="text"
        placeholder="Search reports..."
        className="mb-4 p-2 border rounded w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {filteredReports.map((report) => (
        <div
          key={report._id}
          className="p-4 border rounded-lg mb-3 bg-white shadow"
        >
          <p>
            <strong>Message :</strong> {report.message}
          </p>
          <p>
            <strong>Reported by :</strong> {report.createdBy?.name} (
            {report.createdBy?.email}){" "}
          </p>
          <p>
            <strong>Spring Details : </strong>
            <span className="inline-block">
              {report.spring?.name} · {report.spring?.district} ·{" "}
              {report.spring?.status} · {report.spring?._id}
            </span>{" "}
          </p>
          {report.photo && (
            <img
              src={report.photo}
              alt="report"
              className="mt-2 w-64 rounded"
            />
          )}
        </div>
      ))}
    </div>
  );
}

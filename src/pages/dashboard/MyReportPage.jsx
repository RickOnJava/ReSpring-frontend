import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { server } from "@/config";

export default function MyReportsPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedbackData, setFeedbackData] = useState({}); // per report id

  const { token } = useSelector((store) => store.auth); // Adjust if your auth state differs

  function getStatusColor(status) {
  switch (status) {
    case "unresolved":
      return "red";
    case "partially resolved":
      return "yellow";
    case "resolved":
      return "green";
    default:
      return "black"; // Default color if status is unknown
  }
}

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axios.get(`${server}/api/v1/reports/my-reports`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReports(res.data);
      } catch (err) {
        console.error("Failed to fetch reports", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [token]);

  const handleFeedbackChange = (id, field, value) => {
    setFeedbackData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const submitFeedback = async (id) => {
    try {
      const { comment, status } = feedbackData[id];
      await axios.put(
        `${server}/api/v1/reports/${id}/feedback`,
        { comment, status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Re-fetch updated reports
      const updated = await axios.get(`${server}/api/v1/reports/my-reports`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReports(updated.data);
    } catch (err) {
      console.error("Error submitting feedback", err);
      alert("Failed to submit feedback");
    }
  };

  if (loading) return <div className="p-4">Loading reports...</div>;

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">My Submitted Reports</h2>

      {reports.length === 0 ? (
        <p>No reports submitted yet.</p>
      ) : (
        <div className="space-y-6">
          {reports.map((report) => (
            <div
              key={report._id}
              className="border border-gray-300 rounded-xl p-4 shadow-md flex flex-col gap-1.5"
            >
              <p>
                <strong>Spring:</strong> {report.spring?.name || "Unknown"}
              </p>
              <p>
                <strong>District:</strong> {report.spring?.district || "Unknown"}
              </p>
              <p>
                <strong>Message:</strong> {report.message}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span className="font-semibold" style={{ color: getStatusColor(report.feedback.status) }}>{report.feedback?.status || "No feedback yet"}</span> 
              </p>
              <p>
                <strong>Comment:</strong>{" "}
                {report.feedback?.comment || "No feedback yet"}
              </p>

              {!report.feedback?.comment && (
                <div className="mt-4 space-y-2">
                  <textarea
                    rows={3}
                    className="w-full border p-2 rounded"
                    placeholder="Write your feedback..."
                    value={feedbackData[report._id]?.comment || ""}
                    onChange={(e) =>
                      handleFeedbackChange(report._id, "comment", e.target.value)
                    }
                  />
                  <select
                    className="w-full border p-2 rounded"
                    value={feedbackData[report._id]?.status || ""}
                    onChange={(e) =>
                      handleFeedbackChange(report._id, "status", e.target.value)
                    }
                  >
                    <option value="">Select status</option>
                    <option value="resolved">Resolved</option>
                    <option value="partial">Partially Resolved</option>
                    <option value="unresolved">Unresolved</option>
                  </select>
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    onClick={() => submitFeedback(report._id)}
                  >
                    Submit Feedback
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

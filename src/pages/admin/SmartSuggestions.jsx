import { useEffect, useState } from "react";
import axios from "axios";
import { server } from "@/config";
import { useSelector } from "react-redux";
import { Card, CardContent } from "@/components/ui/card";
// import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

export default function SmartSuggestions() {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);

  const { token } = useSelector((store) => store.auth);

  const fetchUserReports = async () => {
    try {
      const res = await axios.get(`${server}/api/v1/reports`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setReports(res.data || []);
    } catch (error) {
      console.error("Failed to fetch reports", error);
    }
  };

  const getSuggestion = async (reportId) => {
    setLoading(true);
    setSuggestion("");
    try {
      const res = await axios.post(
        `${server}/api/v1/reports/smart-suggestion`,
        { reportId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuggestion(res.data.suggestion);
    } catch (error) {
      console.error("Failed to fetch suggestion", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserReports();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">
        Smart Suggestions
      </h2>

      {/* Report Selector */}
      <div className="mb-6">
        <label className="block mb-2 font-medium">Select Report:</label>
        <select
          className="w-full border rounded px-3 py-2"
          onChange={(e) => {
            const report = reports.find((r) => r._id === e.target.value);
            setSelectedReport(report);
            if (report) getSuggestion(report._id);
          }}
        >
          <option value="">-- Select a Report --</option>
          {reports.map((r) => (
            <option key={r._id} value={r._id}>
              {r.spring?.name} ({r.spring?.district}) - {r.message.slice(0, 30)}
              ...
            </option>
          ))}
        </select>
      </div>

      {/* Report Info Card */}
      {selectedReport && (
        <Card className="mb-6 bg-gray-50">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold text-blue-600 mb-2">
              Report Details
            </h3>
            <p>
              <strong>Spring:</strong> {selectedReport.spring?.name} (
              {selectedReport.spring?.district})
            </p>
            <p>
              <strong>Status:</strong> {selectedReport.spring?.status}
            </p>
            <p className="mt-2">
              <strong>Message:</strong>
            </p>
            <p className="bg-white border p-2 rounded mt-1">
              {selectedReport.message}
            </p>
            {selectedReport.feedback?.comment && (
              <>
                <p className="mt-2">
                  <strong>Your Feedback:</strong>
                </p>
                <p className="bg-white border p-2 rounded mt-1">
                  {selectedReport.feedback.comment}
                </p>
              </>
            )}
          </CardContent>
        </Card>
      )}

      {/* Suggestion Card */}
      {loading ? (
        <div className="flex justify-center items-center text-blue-600 mt-6">
          <Loader2 className="animate-spin mr-2" /> Generating Suggestion...
        </div>
      ) : (
        suggestion && (
          <Card className="bg-white shadow-md">
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold text-green-600 mb-3">
                AI Suggestion
              </h3>

              <div className="whitespace-pre-line text-gray-700 mb-4">
                {suggestion}
              </div>

              {/* Export Buttons */}
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(suggestion);
                    alert("Copied to clipboard!");
                  }}
                  className="px-3 py-1 text-sm rounded bg-blue-600 text-white hover:bg-blue-700"
                >
                  📋 Copy
                </button>

                <button
                  onClick={() => {
                    const blob = new Blob([suggestion], {
                      type: "text/plain;charset=utf-8",
                    });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement("a");
                    link.href = url;
                    link.download = "smart_suggestion.txt";
                    link.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="px-3 py-1 text-sm rounded bg-green-600 text-white hover:bg-green-700"
                >
                  📄 Download
                </button>

                {/* Optional: Share (only works on secure origins + supported devices) */}
                {navigator.share && (
                  <button
                    onClick={() => {
                      navigator.share({
                        title: "AI Suggestion",
                        text: suggestion,
                      });
                    }}
                    className="px-3 py-1 text-sm rounded bg-indigo-600 text-white hover:bg-indigo-700"
                  >
                    🔗 Share
                  </button>
                )}
              </div>
            </CardContent>
          </Card>
        )
      )}
    </div>
  );
}

import { useState } from "react";
import axios from "axios";
import { server } from "@/config";
import { useSelector } from "react-redux";

export default function FeedbackForm({ reportId }) {
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState("unresolved");
  const [message, setMessage] = useState("");

  const { token } = useSelector((store) => store.auth);

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        `${server}/api/v1/reports/feedback/${reportId}`,
        { comment, status },
        { withCredentials: true },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage("Feedback submitted successfully!");
    } catch (err) {
      setMessage("Error submitting feedback.");
    }
  };

  return (
    <div className="bg-white shadow rounded p-4 space-y-2">
      <h3 className="font-semibold text-lg">Give Feedback</h3>
      <textarea
        placeholder="Your comment..."
        className="w-full border p-2 rounded"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <select
        className="w-full border p-2 rounded"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="resolved">Resolved</option>
        <option value="partial">Partially Resolved</option>
        <option value="unresolved">Unresolved</option>
      </select>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleSubmit}
      >
        Submit Feedback
      </button>
      {message && <p className="text-sm text-green-600">{message}</p>}
    </div>
  );
}

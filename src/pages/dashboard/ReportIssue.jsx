import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { server } from "@/config";

export default function ReportIssue() {
  const { id } = useParams(); // spring ID
  const navigate = useNavigate();

  const { token } = useSelector((store) => store.auth);

  const [message, setMessage] = useState("");
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message || !photo) return toast("Please fill all fields");

    const formData = new FormData();
    formData.append("spring", id);
    formData.append("message", message);
    formData.append("photo", photo);

    try {
      setLoading(true);
      await axios.post(
        `${server}/api/v1/reports`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast("Issue reported successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      toast("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">📢 Report an Issue</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="text-gray-700 font-medium">
          Describe the issue:
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="w-full border rounded p-2 mt-1"
            required
          />
        </label>

        <label className="text-gray-700 font-medium">
          Upload a photo:
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files[0])}
            className="w-full border rounded p-2 mt-1"
            required
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Submitting..." : "Submit Report"}
        </button>
      </form>
    </div>
  );
}

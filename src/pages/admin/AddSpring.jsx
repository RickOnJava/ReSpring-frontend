import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { server } from "@/config";

export default function AddSpring() {
  const { token } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    district: "",
    usage: "",
    flowRate: "",
    lat: "",
    lng: "",
    status: "Active",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${server}/api/v1/springs`,
        {
          ...formData,
          location: {
            lat: formData.lat,
            lng: formData.lng,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast("Spring added successfully!");
      navigate("/admin")
    } catch (error) {
      toast("Failed to add spring");
    } 
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">➕ Add New Spring</h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-4 max-w-3xl"
      >
        <input
          name="name"
          placeholder="Spring Name"
          onChange={handleChange}
          required
          className="input"
        />
        <input
          name="district"
          placeholder="District"
          onChange={handleChange}
          required
          className="input"
        />
        <input
          name="usage"
          placeholder="Usage (e.g., drinking)"
          onChange={handleChange}
          required
          className="input"
        />
        <input
          name="flowRate"
          placeholder="Flow Rate (L/min)"
          onChange={handleChange}
          required
          className="input"
        />
        <input
          name="lat"
          placeholder="Latitude"
          onChange={handleChange}
          required
          className="input"
        />
        <input
          name="lng"
          placeholder="Longitude"
          onChange={handleChange}
          required
          className="input"
        />
        <select name="status" onChange={handleChange} className="input">
          <option value="Active">Active</option>
          <option value="Dry">Dry</option>
          <option value="Low">Low</option>
        </select>
        <button
          type="submit"
          className="col-span-2 bg-green-600 text-white p-2 rounded"
        >
          Add Spring
        </button>
      </form>
    </div>
  );
}

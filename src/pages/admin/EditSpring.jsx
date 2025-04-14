// src/pages/admin/EditSpring.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { server } from "@/config";

export default function EditSpring() {
  const { token } = useSelector((store) => store.auth);

  const { id } = useParams();
  const navigate = useNavigate();
  const [spring, setSpring] = useState(null);

  useEffect(() => {
    axios
      .get(`${server}/api/v1/springs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setSpring(res.data));
  }, [id]);

  const handleChange = (e) => {
    setSpring({ ...spring, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${server}/api/v1/springs/${id}`, spring, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Spring updated!");
      navigate("/admin");
    } catch (error) {
      toast("Internal server error");
    }
  };

  if (!spring) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">✏️ Edit Spring</h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-4 max-w-3xl"
      >
        <input
          name="name"
          value={spring.name}
        //   onChange={handleChange}
        disabled
          className="input cursor-not-allowed"
        />
        <input
          name="district"
          value={spring.district}
        //   onChange={handleChange}
        disabled
          className="input cursor-not-allowed"
        />
        <input
          name="usage"
          value={spring.usage}
          onChange={handleChange}
          className="input"
        />
        <input
          name="flowRate"
          value={spring.flowRate}
          onChange={handleChange}
          className="input"
        />
        <select
          name="status"
          value={spring.status}
          onChange={handleChange}
          className="input"
        >
          <option value="Active">Active</option>
          <option value="Dry">Dry</option>
          <option value="Low">Low</option>
        </select>
        <button
          type="submit"
          className="col-span-2 bg-green-600 text-white p-2 rounded"
        >
          Update Spring
        </button>
      </form>
    </div>
  );
}

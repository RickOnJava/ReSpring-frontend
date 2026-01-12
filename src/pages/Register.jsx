import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/authAPI";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    role: "citizen", // default
    adminCode: "",
  });

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    await dispatch(registerUser(form, navigate));
    setLoading(false);
  };

  return (
    <div className="w-[100vw] h-[100vh] flex items-center justify-center ">
      <div className="max-w-sm md:max-w-md mx-auto  p-6 bg-white rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="citizen">Citizen</option>
            <option value="admin">Admin</option>
          </select>

          {form.role === "admin" && (
            <input
              type="text"
              placeholder="Enter Admin Code"
              name="adminCode"
              value={form.adminCode}
              onChange={handleChange}
              className="input w-full px-4 py-2 border rounded-lg"
            />
          )}

          {loading ? (
            <button
             className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </button>
          ) : (
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Register
            </button>
          )}

          <button className="block hover:text-blue-500 hover:underline">
            <Link to={"/login"}>login instead</Link>
          </button>
        </form>
      </div>
    </div>
  );
}

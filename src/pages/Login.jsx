import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/authAPI";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(form, navigate));
  };

  return (
    
    <div className="w-[100vw] h-[100vh] flex items-center justify-center ">
      <div className="max-w-sm md:max-w-md mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
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

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>

        <button className='block hover:text-blue-500 hover:underline'>
           <Link  to={"/register"}>
          Create a account
         </Link>
        </button>
      </form>
    </div>
    </div>
    
  );
}

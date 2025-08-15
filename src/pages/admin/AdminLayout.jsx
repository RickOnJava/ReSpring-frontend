// src/pages/admin/AdminLayout.jsx
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/authSlice";
import { toast } from "sonner";

export default function AdminLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-6 text-2xl font-bold text-green-700">ReSprings Admin</div>
        <nav className="flex flex-col gap-2 p-4">
          <NavLink to="/admin" className="text-gray-700 hover:text-green-600">Spring List</NavLink>
          <NavLink to="/admin/add-spring" className="text-gray-700 hover:text-green-600">Add Spring</NavLink>
          <NavLink to="/admin/analytics" className="text-gray-700 hover:text-green-600">View Statistical Data</NavLink>
          <NavLink to="/admin/reports" className="text-gray-700 hover:text-green-600">View Reports</NavLink>
          <NavLink to="/admin/smart-suggestions" className="text-gray-700 hover:text-green-600">Smart Suggestions</NavLink>
          <NavLink to="/admin/feedbacks" className="text-gray-700 hover:text-green-600">View Feedbacks</NavLink>
          <button
            onClick={handleLogout}
            className="mt-6 flex items-center text-red-500 hover:text-red-700"
          >
            <LogOut className="mr-2" /> Logout
          </button>
        </nav>
      </aside>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}

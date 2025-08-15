import FloatingChatbot from "@/components/FloatingChatBot";
import ReSpringsBot from "@/components/ReSpringsBot";
import { logout } from "@/redux/authSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, NavLink, Outlet, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function DashboardLayout() {

  const {user} = useSelector((store) => store.auth);

  
  const dispatch = useDispatch();
  const navigae = useNavigate();


  // Admins shouldn't access /dashboard. You can show a message or redirect in the dashboard layout too:
  useEffect(() => {
    if (user?.role === "admin") {
      navigae("/admin");
    }
  }, [user]);


  const handleLogout = () => {
    dispatch(logout());
    toast("Logged out successfully");
    navigae("/login");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="bg-blue-700 text-white w-full md:w-64 p-4 space-y-6">
        <h1 className="text-2xl font-bold">ReSprings</h1>
        <nav className="space-y-2">
        <NavLink
            to="/dashboard/springs"
            className={({ isActive }) =>
              `block hover:bg-blue-800 p-2 rounded ${isActive ? "bg-blue-800" : ""}`
            }
          >
            🌿 Spring List
          </NavLink>
          <NavLink
            to="/dashboard/map"
            className={({ isActive }) =>
              `block hover:bg-blue-800 p-2 rounded ${isActive ? "bg-blue-800" : ""}`
            }
          >
            🗺️ Map View
          </NavLink>
          <NavLink
            to="/dashboard/nearby-springs"
            className={({ isActive }) =>
              `block hover:bg-blue-800 p-2 rounded ${isActive ? "bg-blue-800" : ""}`
            }
          >
            🗺️ Nearby Springs
          </NavLink>
          <NavLink
            to="/dashboard/my-reports"
            className={({ isActive }) =>
              `block hover:bg-blue-800 p-2 rounded ${isActive ? "bg-blue-800" : ""}`
            }
          >
            🚨 My Reports
          </NavLink>
          
           <button
            onClick={handleLogout}
            className="block w-full text-left hover:bg-blue-800 p-2 rounded"
          >
            🔒 Logout
          </button>
        </nav>

         {/* User Info */}
        <div className="mt-auto pt-4 border-t border-blue-600">
          <p className="text-sm ">User: <span className="font-medium">{user.name}</span> </p>
          <p className="text-sm ">Type: <span className="font-medium">{user.role}</span></p>
        </div>
      </aside>

      {/* Nested Route Content */}
      <main className="flex-1 p-6 bg-gray-50">
        <Outlet />
        <FloatingChatbot />
      </main>
    </div>
  );
}

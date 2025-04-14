// routes/RoleRedirect.jsx
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function RoleRedirect() {
  const { user } = useSelector((store) => store.auth);

  if (!user) return <Navigate to="/login" />;

  if (user.role === "admin") return <Navigate to="/admin" />;

  return <Navigate to="/dashboard" />;
}

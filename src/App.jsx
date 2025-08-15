import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OtpVerification from "./pages/OtpVerification";
import PublicRoute from "./routes/PublicRoutes";
import ProtectedRoute from "./routes/ProtectedRoutes";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import SpringList from "./pages/dashboard/SpringList";
import Error from "./pages/Error";
import MapDashboard from "./pages/dashboard/Map/MapDasboard";
import ReportIssue from "./pages/dashboard/ReportIssue";
import AdminRoute from "./routes/AdminRoutes";
import AddSpring from "./pages/admin/AddSpring";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AllReports from "./pages/admin/AllReports";
import RoleRedirect from "./routes/RoleDirect";
import AdminLayout from "./pages/admin/AdminLayout";
import EditSpring from "./pages/admin/EditSpring";
import MyReportsPage from "./pages/dashboard/MyReportPage";
import FeedbackList from "./pages/admin/FeedbackList";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import NearbySprings from "./pages/dashboard/Map/NearbySpring";
import SmartSuggestions from "./pages/admin/SmartSuggestions";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoute />}>
          <Route path="/" element={<RoleRedirect />} />
          {/* Root route auto-redirects */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/otp-verification/:email"
            element={<OtpVerification />}
          />
        </Route>

        {/* Citizen Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Welcome />} />
            <Route path="springs" element={<SpringList />} />
            <Route path="map" element={<MapDashboard />} />
            <Route path="my-reports" element={<MyReportsPage />} />
            <Route path="nearby-springs" element={<NearbySprings />} />
          </Route>
          <Route path="report/:id" element={<ReportIssue />} />
        </Route>


        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="add-spring" element={<AddSpring />} />
          <Route path="reports" element={<AllReports />} />
          <Route path="feedbacks" element={<FeedbackList />} />
          <Route path="/admin/edit-spring/:id" element={<EditSpring />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="smart-suggestions" element={<SmartSuggestions />} />
        </Route>
       

        {/* Fallback */}
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

function Welcome() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold text-green-700">🌿 ReSprings</h1>
      <p className="text-lg mt-4 text-gray-600">
        Reviving Sikkim’s Springs, One Drop at a Time
      </p>
    </div>
  );
}

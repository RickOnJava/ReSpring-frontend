import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function PublicRoute() {
  const { token } = useSelector((store) => store.auth);

  return token ? <Navigate to="/dashboard" /> : <Outlet />;
}

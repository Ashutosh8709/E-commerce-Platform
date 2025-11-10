import { Navigate, replace } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading, userLoggedOut, setUserLoggedout } = useAuth();
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (!user) {
    if (userLoggedOut) {
      setTimeout(() => setUserLoggedout(true), 0);
      return <Navigate to="/" replace />;
    }
    return <Navigate to="/login" replace />;
  }
  // else if (user?.role == "admin") {
  //   if (userLoggedOut) {
  //     setTimeout(() => setUserLoggedout(true), 0);
  //     return <Navigate to="/" replace />;
  //   }
  //   return <Navigate to="/admin/dashboard" replace />;
  // }
  return children;
}

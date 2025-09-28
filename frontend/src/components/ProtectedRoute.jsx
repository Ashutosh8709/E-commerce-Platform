import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
	const { user, loading, userLoggedOut, setUserLoggedOut } = useAuth();
	if (loading) {
		return (
			<div className="flex items-center justify-center h-screen">
				Loading...
			</div>
		);
	}

	if (!user) {
		if (userLoggedOut) {
			setTimeout(() => setUserLoggedOut(false), 0);
			return <Navigate to="/" replace />;
		}
		return <Navigate to="/login" replace />;
	}
	return children;
}

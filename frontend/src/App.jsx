import "./App.css";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import ForgotPassword from "./components/Login/ForgotPassword";
import { AuthContextProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import LandingPage from "./components/LandingPage/LandingPage";
function App() {
	return (
		<AuthContextProvider>
			<LandingPage />
			<ToastContainer />
		</AuthContextProvider>
	);
}

export default App;

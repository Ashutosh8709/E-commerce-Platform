import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout/Layout.jsx";
import LandingPage from "./components/LandingPage/LandingPage.jsx";
import Login from "./components/Login/Login.jsx";
import Signup from "./components/Signup/Signup.jsx";
import ForgotPasswordPage from "./components/Login/ForgotPassword.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				path: "",
				element: <LandingPage />,
			},
		],
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/signup",
		element: <Signup />,
	},
	{
		path: "forgot-password",
		element: <ForgotPasswordPage />,
	},
]);

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<AuthContextProvider>
			<RouterProvider router={router} />
		</AuthContextProvider>
	</StrictMode>
);

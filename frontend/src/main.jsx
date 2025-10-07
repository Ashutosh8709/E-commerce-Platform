import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout/Layout.jsx";
import LandingPage from "./components/LandingPage/LandingPage.jsx";
import Login from "./components/Login/Login.jsx";
import Signup from "./components/Signup/Signup.jsx";
import ForgotPasswordPage from "./components/Login/ForgotPassword.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import Home from "./components/Home/Home.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { ToastContainer } from "react-toastify";
import Cart from "./components/Cart/Cart.jsx";
import Products from "./components/Products/Products.jsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				path: "",
				element: <LandingPage />,
			},
			{
				path: "/home",
				element: (
					<ProtectedRoute>
						<Home />
					</ProtectedRoute>
				),
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
		path: "/forgot-password",
		element: <ForgotPasswordPage />,
	},
	{
		path: "/cart",
		element: <Cart />,
	},
	{
		path: "/products",
		element: <Products />,
	},
]);

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<AuthContextProvider>
			<RouterProvider router={router} />
			<ToastContainer />
		</AuthContextProvider>
	</StrictMode>
);

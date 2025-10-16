import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout/Layout.jsx";
import LandingPage from "./Pages/LandingPage/LandingPage.jsx";
import Login from "./Pages/Login/Login.jsx";
import Signup from "./Pages/Signup/Signup.jsx";
import ForgotPasswordPage from "./Pages/Login/ForgotPassword.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import Home from "./Pages/Home/Home.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { ToastContainer } from "react-toastify";
import Cart from "./Pages/Cart/Cart.jsx";
import Products from "./Pages/Products/Products.jsx";
import OrderTracking from "./Pages/OrderTracking/OrderTracking.jsx";
import Checkout from "./Pages/CheckOut/CheckOut.jsx";

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
			{
				path: "/cart",
				element: (
					<ProtectedRoute>
						<Cart />
					</ProtectedRoute>
				),
			},
			{
				path: "/products",
				element: (
					<ProtectedRoute>
						<Products />
					</ProtectedRoute>
				),
			},
			{
				path: "/order-track",
				element: (
					<ProtectedRoute>
						<OrderTracking />
					</ProtectedRoute>
				),
			},
			{
				path: "/checkout",
				element: (
					<ProtectedRoute>
						<Checkout />
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
]);

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<AuthContextProvider>
			<RouterProvider router={router} />
			<ToastContainer />
		</AuthContextProvider>
	</StrictMode>
);

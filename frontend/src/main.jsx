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
import ProductListing from "./Pages/Products/ProductListing.jsx";
import AddressPage from "./Pages/Addresses/AddressPage.jsx";
import HelpSupport from "./Pages/HelpSupport/HelpSupport.jsx";
import MyOrders from "./Pages/MyOrders/MyOrders.jsx";
import MyProfile from "./Pages/MyProfile/MyProfile.jsx";
import PaymentMethods from "./Pages/PaymentMethods/PaymentMethods.jsx";

import Wishlist from "./Pages/Wishlist/Wishlist.jsx";
import SettingsPage from "./Pages/Settings/SettingsPage.jsx";
import DealsNewArrivalsPage from "./Pages/Deals/Deals.jsx";

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
						<ProductListing />
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
			{
				path: "/address",
				element: (
					<ProtectedRoute>
						<AddressPage />
					</ProtectedRoute>
				),
			},
			{
				path: "/support",
				element: (
					<ProtectedRoute>
						<HelpSupport />
					</ProtectedRoute>
				),
			},
			{
				path: "/orders",
				element: (
					<ProtectedRoute>
						<MyOrders />
					</ProtectedRoute>
				),
			},
			{
				path: "/profile",
				element: (
					<ProtectedRoute>
						<MyProfile />
					</ProtectedRoute>
				),
			},
			{
				path: "/paymentmethods",
				element: (
					<ProtectedRoute>
						<PaymentMethods />
					</ProtectedRoute>
				),
			},
			{
				path: "/settings",
				element: (
					<ProtectedRoute>
						<SettingsPage />
					</ProtectedRoute>
				),
			},
			{
				path: "/wishlist",
				element: (
					<ProtectedRoute>
						<Wishlist />
					</ProtectedRoute>
				),
			},
			{
				path: "/deals",
				element: (
					<ProtectedRoute>
						<DealsNewArrivalsPage />
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

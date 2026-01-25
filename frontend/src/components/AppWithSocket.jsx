import { useSocketListeners } from "../hooks/useSocketListeners";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthContextProvider } from "../context/AuthContext.jsx";
import Layout from "../Layout/Layout.jsx";
import LandingPage from "../Pages/LandingPage/LandingPage.jsx";
import Login from "../Pages/Login/Login.jsx";
import Signup from "../Pages/Signup/Signup.jsx";
import ForgotPasswordPage from "../Pages/Login/ForgotPassword.jsx";
import Home from "../Pages/Home/Home.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import Cart from "../Pages/Cart/Cart.jsx";
import Checkout from "../Pages/CheckOut/CheckOut.jsx";
import ProductListing from "../Pages/Products/ProductListing.jsx";
import AddressPage from "../Pages/Addresses/AddressPage.jsx";
import HelpSupport from "../Pages/HelpSupport/HelpSupport.jsx";
import MyOrders from "../Pages/MyOrders/MyOrders.jsx";
import MyProfile from "../Pages/MyProfile/MyProfile.jsx";
import PaymentMethods from "../Pages/PaymentMethods/PaymentMethods.jsx";
import Wishlist from "../Pages/Wishlist/Wishlist.jsx";
import SettingsPage from "../Pages/Settings/SettingsPage.jsx";
import DealsNewArrivalsPage from "../Pages/Deals_&_Arrivals/Deals.jsx";
import ProductDetailPage from "../Pages/Products/Products.jsx";
import Notification from "../Pages/Notifications/Notifications.jsx";
import OrderTrackingPage from "../Pages/OrderTracking/OrderTracking.jsx";
import SellerStorePage from "../Pages/Seller/SellerDashboard.jsx";
import AdminLayout from "../Layout/AdminLayout.jsx";
import AdminTabsRouter from "../components/AdminTabsRouter.jsx";
import SellerRegistrationPage from "../Pages/Seller/SellerRegistration.jsx";

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
        path: "/product/:productId",
        element: (
          <ProtectedRoute>
            <ProductDetailPage />
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
        path: "/notifications/:id",
        element: (
          <ProtectedRoute>
            <Notification />
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
        path: "/orderDetail/:orderId",
        element: (
          <ProtectedRoute>
            <OrderTrackingPage />
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
  {
    path: "/seller",
    element: <SellerRegistrationPage />,
  },
  {
    path: "/seller/dashboard",
    element: <SellerStorePage />,
  },
  // {
  //   path: "/admin",
  //   element: (
  //     <ProtectedRoute>
  //       <AdminDashboard />
  //     </ProtectedRoute>
  //   ),
  // },
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      {
        path: "/admin/:tab",
        element: <AdminTabsRouter />,
      },
    ],
  },
]);

function AppWithSocket() {
  return (
    <AuthContextProvider>
      <SocketWrapper />
      <RouterProvider router={router} />
      <ToastContainer />
    </AuthContextProvider>
  );
}

function SocketWrapper() {
  useSocketListeners();
  return null;
}

export default AppWithSocket;

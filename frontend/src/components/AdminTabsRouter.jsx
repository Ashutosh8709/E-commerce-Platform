import { useParams } from "react-router-dom";
import AdminDashboard from "../Pages/AdminPanel/AdminDashboard";
import AnalyticsPage from "../Pages/AdminPanel/AnalyticsPage";
import OrdersPage from "../Pages/AdminPanel/OrdersPage";
import ProductsPage from "../Pages/AdminPanel/ProductsPage";

export default function AdminTabsRouter() {
  const { tab } = useParams();

  switch (tab) {
    case "analytics":
      return <AnalyticsPage />;
    case "orders":
      return <OrdersPage />;
    case "products":
      return <ProductsPage />;
    case "dashboard":
    default:
      return <AdminDashboard />;
  }
}

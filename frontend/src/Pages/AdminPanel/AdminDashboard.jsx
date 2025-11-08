import { useAdminData } from "../../hooks/useAdminData";
import {
  ShoppingCart,
  TrendingUp,
  AlertTriangle,
  PieChart,
} from "lucide-react";

import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import RevenueLineChart from "../../components/Admin/RevenueLineChart";
import CategoryPiechart from "../../components/Admin/CategoryPiechart";
import KPIgrid from "../../components/Admin/Dashboard/KPIgrid";
import RecentOrdersTable from "../../components/Admin/Dashboard/RecentOrdersTable";
import LowStocksList from "../../components/Admin/Dashboard/LowStocksList";

ChartJS.register(
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Tooltip,
  Legend
);

function AdminDashboard() {
  const { loading } = useAdminData();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading dashboard data...
      </div>
    );
  }
  return (
    <div className="mb-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 py-8 lg:grid-cols-3 gap-6 mb-4">
        <KPIgrid />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <TrendingUp size={18} /> Sales Overview
          </h2>
          <RevenueLineChart />
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <PieChart size={18} /> Category Distribution
          </h2>
          <CategoryPiechart />
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <ShoppingCart size={18} /> Recent Orders
          </h2>
        </div>
        <RecentOrdersTable />
      </div>

      {/* Low Stock Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <AlertTriangle size={18} /> Low Stock Products
          </h2>
        </div>
        <LowStocksList />
      </div>
    </div>
  );
}

export default AdminDashboard;

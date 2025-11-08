import React from "react";
import { useAdminData } from "../../hooks/useAdminData";
import {
  LayoutGrid,
  Package,
  ShoppingCart,
  DollarSign,
  BarChart3,
  TrendingUp,
  AlertTriangle,
  PieChart,
  PlusCircle,
  Menu,
  X,
} from "lucide-react";
import { Line, Pie, Bar } from "react-chartjs-2";
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

import RevenueLineChart from "../../components/Admin/RevenueLineChart";
import CategoryPiechart from "../../components/Admin/CategoryPiechart";
import OrderStatusPieChart from "../../components/Admin/Analytics/OrderStatusPieChart";
import TopSeellingBarChart from "../../components/Admin/Analytics/TopSeellingBarChart";

function AnalyticsPage() {
  const {
    avgOrderValue,
    stats,
    lineChartData,
    pieChartData,
    topProductsChartData,
    orderStatusData,
  } = useAdminData();
  return (
    <div className="space-y-8 py-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-wrap items-center justify-around text-center">
        <div>
          <p className="text-gray-500 text-sm">Average Order Value</p>
          <h3 className="text-2xl font-semibold text-indigo-600">
            ₹{avgOrderValue.toFixed(0)}
          </h3>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Total Revenue</p>
          <h3 className="text-2xl font-semibold text-green-600">
            ₹{stats?.totalRevenue?.toLocaleString() || 0}
          </h3>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Orders Processed</p>
          <h3 className="text-2xl font-semibold text-blue-600">
            {stats?.totalOrders || 0}
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-3">
            <TrendingUp size={18} /> Revenue Trends
          </h2>
          <RevenueLineChart />
        </div>

        {/* Category Sales */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-3">
            <PieChart size={18} /> Sales by Category
          </h2>
          <CategoryPiechart />
        </div>
      </div>

      {/* Row 2 - Top Products & Order Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Selling Products */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-3">
            <BarChart3 size={18} /> Top Selling Products
          </h2>
          <TopSeellingBarChart />
        </div>

        {/* Order Status Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-3">
            <Package size={18} /> Orders by Status
          </h2>
          <OrderStatusPieChart />
        </div>
      </div>
    </div>
  );
}

export default AnalyticsPage;

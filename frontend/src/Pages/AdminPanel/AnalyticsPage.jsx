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
          <div className="flex justify-center items-center h-64 text-gray-400">
            <Line
              data={lineChartData}
              options={{
                responsive: true,
                plugins: {
                  legend: { display: false },
                  tooltip: {
                    callbacks: { label: (ctx) => `₹${ctx.parsed.y}` },
                  },
                },
                scales: {
                  y: { beginAtZero: true, ticks: { color: "#6B7280" } },
                  x: { ticks: { color: "#6B7280" } },
                },
              }}
            />
          </div>
        </div>

        {/* Category Sales */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-3">
            <PieChart size={18} /> Sales by Category
          </h2>
          <div className="flex justify-center items-center h-64 text-gray-400">
            <Pie
              data={pieChartData}
              options={{
                plugins: {
                  legend: {
                    position: "bottom",
                    labels: { color: "#374151" },
                  },
                  tooltip: {
                    callbacks: { label: (ctx) => `₹${ctx.parsed}` },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>

      {/* Row 2 - Top Products & Order Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Selling Products */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-3">
            <BarChart3 size={18} /> Top Selling Products
          </h2>
          <div className="flex justify-center items-center h-65 text-gray-400">
            <Bar
              data={topProductsChartData}
              options={{
                indexAxis: "y",
                plugins: {
                  legend: { display: false },
                  tooltip: {
                    callbacks: { label: (ctx) => `${ctx.parsed.x} sold` },
                  },
                },
                scales: {
                  x: { beginAtZero: true, ticks: { color: "#6B7280" } },
                  y: { ticks: { color: "#6B7280" } },
                },
              }}
            />
          </div>
        </div>

        {/* Order Status Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-3">
            <Package size={18} /> Orders by Status
          </h2>
          <div className="flex justify-center items-center h-64 text-gray-400">
            <Pie
              data={orderStatusData}
              options={{
                plugins: {
                  legend: {
                    position: "bottom",
                    labels: { color: "#374151" },
                  },
                  tooltip: {
                    callbacks: {
                      label: (ctx) => `${ctx.label}: ${ctx.parsed}`,
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsPage;

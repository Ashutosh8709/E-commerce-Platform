import React from "react";
import { useAdminData } from "../../hooks/useAdminData";
import {
  ShoppingCart,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  PieChart,
} from "lucide-react";

import moment from "moment";
import { Line, Pie } from "react-chartjs-2";
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

function AdminDashboard() {
  const { stats, orders, lineChartData, pieChartData, loading } =
    useAdminData();
  const kpiData = [
    {
      title: "Total Revenue",
      value: `₹${stats?.totalRevenue?.toLocaleString() || 0}`,
      icon: <DollarSign />,
      color: "bg-green-100 text-green-700",
    },
    {
      title: "Total Orders",
      value: stats?.totalOrders || 0,
      icon: <ShoppingCart />,
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: "Low Stock Items",
      value: stats?.lowStockItems?.length || 0,
      icon: <AlertTriangle />,
      color: "bg-yellow-100 text-yellow-700",
    },
  ];

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
        {kpiData.map((kpi, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 flex items-center gap-4"
          >
            <div className={`p-3 rounded-lg ${kpi.color}`}>{kpi.icon}</div>
            <div>
              <p className="text-sm text-gray-500">{kpi.title}</p>
              <p className="text-xl font-semibold text-gray-900">{kpi.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <TrendingUp size={18} /> Sales Overview
          </h2>
          <div className="flex justify-center items-center h-48 text-gray-400">
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
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <PieChart size={18} /> Category Distribution
          </h2>
          <div className="flex justify-center items-center h-48 text-gray-400">
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

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <ShoppingCart size={18} /> Recent Orders
          </h2>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50 text-gray-600 text-xs uppercase font-medium">
            <tr>
              <th className="text-left px-6 py-3">Order ID</th>
              <th className="text-left px-6 py-3">Date</th>
              <th className="text-left px-6 py-3">Status</th>
              <th className="text-left px-6 py-3">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders?.slice(0, 5).map((order) => (
              <tr key={order._id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-3 text-sm font-medium text-gray-900">
                  #{order._id.slice(-6)}
                </td>
                <td className="px-6 py-3 text-sm text-gray-500">
                  {moment(order.createdAt).format("MMM DD, YYYY")}
                </td>
                <td className="px-6 py-3">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      order.status === "delivered"
                        ? "bg-green-100 text-green-700"
                        : order.status === "confirmed"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-3 text-sm text-gray-800 font-semibold">
                  ₹{order.finalAmount?.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Low Stock Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <AlertTriangle size={18} /> Low Stock Products
          </h2>
        </div>
        <ul className="divide-y divide-gray-100">
          {stats?.lowStockItems?.length &&
            stats?.lowStockItems?.map((item) => (
              <li
                key={item._id}
                className="flex justify-between items-center px-6 py-3 text-sm text-gray-700"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-xs text-gray-500">
                    Seller: {item.Seller?.storeName}
                  </p>
                </div>
                <span className="font-semibold text-red-600">
                  {item.stock} left
                </span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminDashboard;

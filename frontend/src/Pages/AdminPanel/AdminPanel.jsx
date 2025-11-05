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
  Users,
} from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";
import socket from "../../socket";
import {
  getAdminStats,
  getAllOrders,
  getSalesAnalytics,
} from "../../services/adminService";
import { handleError, handleSuccess } from "../../utils";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    lowStockItems: [],
  });
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const [statsRes, orderRes, analyticsRes] = await Promise.all([
        getAdminStats(),
        getAllOrders(),
        getSalesAnalytics(),
      ]);

      setStats(statsRes.data?.data);
      setOrders(orderRes.data?.data || []);
      setSalesData(analyticsRes.data?.data?.salesByDate || []);
      setCategoryData(analyticsRes.data?.data?.salesByCategory || []);
    } catch (err) {
      handleError("Failed to fetch dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    socket.on("order:new", (order) => {
      setOrders((prev) => [order, ...prev]);
      setStats((prev) => ({
        ...prev,
        totalOrders: prev.totalOrders + 1,
        totalRevenue: prev.totalRevenue + order.finalAmount,
      }));
      handleSuccess(`New order placed — ₹${order.totalAmount}`);
    });

    socket.on("order:statusUpdated", (update) => {
      setOrders((prev) =>
        prev.map((order) =>
          order._id === update.orderId
            ? { ...order, status: update.status }
            : order
        )
      );
      handleSuccess(`Order updated to: ${update.status}`);
    });

    socket.on("product:lowStock", (data) => {
      setStats((prev) => ({
        ...prev,
        lowStockItems: [...prev.lowStockItems, data],
      }));
      handleSuccess(`Low stock alert — ${data.name} (${data.stock} left)`);
    });

    socket.on("disconnect", () => {
      console.warn("Disconnected from socket server");
    });

    socket.on("connect", () => {
      console.info("Reconnected — syncing dashboard data");
      fetchInitialData();
    });

    return () => {
      socket.off("order:new");
      socket.off("order:statusUpdated");
      socket.off("product:lowStock");
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  console.log("Sales Data:", salesData);
  console.log("Category Data:", categoryData);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading dashboard...
      </div>
    );
  }

  const lineChartData = {
    labels: salesData.map((d) => moment(d._id).format("MMM DD")),
    datasets: [
      {
        label: "Revenue (₹)",
        data: salesData.map((d) => d.totalRevenue),
        fill: true,
        backgroundColor: "rgba(99, 102, 241, 0.1)",
        borderColor: "#6366F1",
        tension: 0.3,
        pointRadius: 4,
      },
    ],
  };

  const pieChartData = {
    labels: categoryData.map((c) => c.category),
    datasets: [
      {
        data: categoryData.map((c) => c.totalRevenue),
        backgroundColor: ["#4F46E5", "#10B981", "#F59E0B", "#EF4444"],
        borderWidth: 1,
      },
    ],
  };

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

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <>
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {kpiData.map((kpi, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 flex items-center gap-4"
                >
                  <div className={`p-3 rounded-lg ${kpi.color}`}>
                    {kpi.icon}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{kpi.title}</p>
                    <p className="text-xl font-semibold text-gray-900">
                      {kpi.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Chart Placeholders */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <TrendingUp size={18} /> Sales Overview
                </h2>
                <Line data={lineChartData} />
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <PieChart size={18} /> Category Distribution
                </h2>
                <Pie data={pieChartData} />
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
                  {orders.slice(0, 5).map((order) => (
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
                        ₹{order.finalAmount.toLocaleString()}
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
                {stats.lowStockItems.length &&
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
          </>
        );

      case "orders":
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <ShoppingCart size={20} /> All Orders
            </h2>
            <p className="text-gray-500 mb-4">
              📦 Manage and track customer orders.
            </p>
            <div className="flex justify-center items-center h-48 text-gray-400">
              [Orders Management Table]
            </div>
          </div>
        );

      case "products":
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Package size={20} /> Products
            </h2>
            <button className="mb-4 px-4 py-2 flex items-center gap-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition">
              <PlusCircle size={16} /> Add Product
            </button>
            <table className="w-full">
              <thead className="bg-gray-50 text-gray-600 text-xs uppercase font-medium">
                <tr>
                  <th className="text-left px-4 py-2">Name</th>
                  <th className="text-left px-4 py-2">Category</th>
                  <th className="text-left px-4 py-2">Price</th>
                  <th className="text-left px-4 py-2">Stock</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map((p, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-2 text-sm text-gray-800">
                      {p.name}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-600">
                      {p.category}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-600">
                      ₹{p.price}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-600">
                      {p.stock}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "analytics":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-3">
                <TrendingUp size={18} /> Revenue Trends
              </h2>
              <div className="flex justify-center items-center h-48 text-gray-400">
                📈 [Revenue Chart Placeholder]
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-3">
                <BarChart3 size={18} /> Category Sales
              </h2>
              <div className="flex justify-center items-center h-48 text-gray-400">
                📊 [Category Chart Placeholder]
              </div>
            </div>
          </div>
        );

      case "users":
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Users size={20} /> Users
            </h2>
            <table className="w-full">
              <thead className="bg-gray-50 text-gray-600 text-xs uppercase font-medium">
                <tr>
                  <th className="text-left px-4 py-2">Name</th>
                  <th className="text-left px-4 py-2">Email</th>
                  <th className="text-left px-4 py-2">Orders</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.map((u, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-2 text-sm text-gray-800">
                      {u.name}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-600">
                      {u.email}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-600">
                      {u.orders}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      default:
        return (
          <p className="text-gray-500 text-center py-10">
            Select a section from the sidebar.
          </p>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-indigo-600">Admin Panel</h1>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          {[
            { name: "Dashboard", icon: LayoutGrid },
            { name: "Orders", icon: ShoppingCart },
            { name: "Products", icon: Package },
            { name: "Analytics", icon: BarChart3 },
          ].map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name.toLowerCase())}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === item.name.toLowerCase()
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <item.icon size={20} />
              <span>{item.name}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">{renderContent()}</main>
    </div>
  );
}

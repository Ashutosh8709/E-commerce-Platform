import { useState, useEffect } from "react";
import moment from "moment";
import socket from "../socket";
import {
  getAdminStats,
  getAllOrders,
  getSalesAnalytics,
} from "../services/adminService";

import { handleSuccess, handleError } from "../utils";

export function useAdminData() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    lowStockItems: [],
  });
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [avgOrderValue, setAvgOrderValue] = useState(0);
  const [orderByStatus, setOrderByStatus] = useState([]);
  const [topSellingProducts, setTopSellingProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [statsRes, orderRes, analyticsRes] = await Promise.all([
        getAdminStats(),
        getAllOrders(),
        getSalesAnalytics(),
      ]);
      setStats(statsRes.data?.data || {});
      setOrders(orderRes.data?.data || []);
      setSalesData(analyticsRes.data?.data?.salesByDate || []);
      setCategoryData(analyticsRes.data?.data?.salesByCategory || []);
      setAvgOrderValue(
        analyticsRes.data?.data?.avgOrderValue[0]?.avgOrderValue || 0
      );
      setOrderByStatus(analyticsRes.data?.data?.orderByStatus || []);
      setTopSellingProducts(analyticsRes.data?.data?.topSellingProducts || []);
    } catch (err) {
      handleError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    socket.on("order:new", (order) => {
      setOrders((prev) => [order, ...prev]);

      setStats((prev) => ({
        ...prev,
        totalOrders: prev.totalOrders + 1,
        totalRevenue: prev?.totalRevenue + order?.totalAmount,
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

      setOrderByStatus((prev) => {
        let newData = [...prev];

        const oldOrder = orders.find((o) => o._id === update.orderId);
        const oldStatus = oldOrder?.status;

        if (oldStatus) {
          const oldIndex = newData.findIndex((d) => d.status === oldStatus);
          if (oldIndex !== -1) {
            newData[oldIndex].count = Math.max(0, newData[oldIndex].count - 1);
          }
        }

        const newIndex = newData.findIndex((d) => d.status === update.status);
        if (newIndex !== -1) {
          newData[newIndex].count += 1;
        } else {
          newData.push({ status: update.status, count: 1 });
        }

        return newData;
      });
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
      fetchData();
    });

    return () => {
      socket.off("order:new");
      socket.off("order:statusUpdated");
      socket.off("product:lowStock");
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

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

  const topProductsChartData = {
    labels: topSellingProducts.map((p) => p.productName),
    datasets: [
      {
        label: "Units Sold",
        data: topSellingProducts.map((p) => p.totalSold),
        backgroundColor: "rgba(37, 99, 235, 0.6)",
        borderRadius: 6,
      },
    ],
  };

  const orderStatusData = {
    labels: orderByStatus.map((s) => s.status),
    datasets: [
      {
        data: orderByStatus.map((s) => s.count),
        backgroundColor: [
          "#4ADE80",
          "#FACC15",
          "#F87171",
          "#60A5FA",
          "#A78BFA",
        ],
        borderWidth: 1,
      },
    ],
  };

  return {
    stats,
    products,
    salesData,
    orders,
    categoryData,
    avgOrderValue,
    orderByStatus,
    topSellingProducts,
    loading,
    lineChartData,
    pieChartData,
    orderStatusData,
    topProductsChartData,
  };
}

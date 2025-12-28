import { useMemo } from "react";
import moment from "moment";
import {
  getAdminStats,
  getAllOrders,
  getSalesAnalytics,
} from "../services/adminService";
import { useQuery } from "@tanstack/react-query";

export function useAdminData() {
  const { data: statsData, isLoading: statsLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: getAdminStats,
    staleTime: 1000 * 60 * 3,
    refetchOnWindowFocus: false,
  });

  const { data: ordersData, isLoading: ordersLoading } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: getAllOrders,
    staleTime: 1000 * 60 * 1,
    refetchOnWindowFocus: false,
  });

  const { data: analyticsData, isLoading: analyticsLoading } = useQuery({
    queryKey: ["sales-analytics"],
    queryFn: getSalesAnalytics,
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
  });

  const loading = statsLoading || ordersLoading || analyticsLoading;
  const stats = statsData?.data?.data || {};
  const orders = ordersData?.data?.data || [];
  const analytics = analyticsData?.data?.data || {};

  const lineChartData = useMemo(
    () => ({
      labels:
        analytics?.salesByDate?.map((d) => moment(d._id).format("MMM DD")) ||
        [],
      datasets: [
        {
          label: "Revenue (₹)",
          data: analytics.salesByDate?.map((d) => d.totalRevenue) || [],
          fill: true,
          backgroundColor: "rgba(99, 102, 241, 0.1)",
          borderColor: "#6366F1",
          tension: 0.3,
          pointRadius: 4,
        },
      ],
    }),
    [analytics]
  );

  const pieChartData = useMemo(
    () => ({
      labels: analytics.salesByCategory?.map((c) => c.category) || [],
      datasets: [
        {
          data: analytics.salesByCategory?.map((c) => c.totalRevenue) || [],
          backgroundColor: ["#4F46E5", "#10B981", "#F59E0B", "#EF4444"],
          borderWidth: 1,
        },
      ],
    }),
    [analytics]
  );

  const topProductsChartData = useMemo(
    () => ({
      labels: analytics.topSellingProducts?.map((p) => p.productName) || [],
      datasets: [
        {
          label: "Units Sold",
          data: analytics.topSellingProducts?.map((p) => p.totalSold) || [],
          backgroundColor: "rgba(37, 99, 235, 0.6)",
          borderRadius: 6,
        },
      ],
    }),
    [analytics]
  );

  const orderStatusData = useMemo(
    () => ({
      labels: analytics.orderByStatus?.map((s) => s.status) || [],
      datasets: [
        {
          data: analytics.orderByStatus?.map((s) => s.count) || [],
          backgroundColor: [
            "#4ADE80",
            "#FACC15",
            "#F87171",
            "#60A5FA",
            "#A78BFA",
          ],
        },
      ],
    }),
    [analytics]
  );

  return {
    loading,
    stats,
    orders,
    analytics,
    lineChartData,
    pieChartData,
    orderStatusData,
    topProductsChartData,
    avgOrderValue: analytics.avgOrderValue?.[0]?.avgOrderValue || 0,
  };
}

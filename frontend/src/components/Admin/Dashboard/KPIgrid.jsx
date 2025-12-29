import React from "react";
import { useAdminData } from "../../../hooks/useAdminData";
import { ShoppingCart, DollarSign, AlertTriangle } from "lucide-react";

function KPIgrid() {
  const { stats } = useAdminData();
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
  return (
    <>
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
    </>
  );
}

export default KPIgrid;

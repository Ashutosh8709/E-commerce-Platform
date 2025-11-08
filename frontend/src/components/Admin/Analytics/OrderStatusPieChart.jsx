import React from "react";
import { useAdminData } from "../../../hooks/useAdminData";
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

function OrderStatusPieChart() {
  const { orderStatusData } = useAdminData();
  return (
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
  );
}

export default OrderStatusPieChart;

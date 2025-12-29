import { Line } from "react-chartjs-2";
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
import { useAdminData } from "../../hooks/useAdminData";

function RevenueLineChart() {
  const { lineChartData } = useAdminData();
  return (
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
  );
}

export default RevenueLineChart;

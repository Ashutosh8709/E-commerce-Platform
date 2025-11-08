import { useAdminData } from "../../../hooks/useAdminData";
import { Bar } from "react-chartjs-2";
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

function TopSeellingBarChart() {
  const { topProductsChartData } = useAdminData();
  return (
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
  );
}

export default TopSeellingBarChart;

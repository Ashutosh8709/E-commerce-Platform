import { Pie } from "react-chartjs-2";
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

function CategoryPiechart() {
  const { pieChartData } = useAdminData();
  return (
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
  );
}

export default CategoryPiechart;

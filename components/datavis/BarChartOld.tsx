"use client";

import { cn } from "@/lib/utils";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Bar } from "react-chartjs-2";
import { Card, CardContent } from "../ui/card";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels,
);

interface Task {
  count: number;
  status: string;
  certification: string;
}

interface BarChartOldProps extends React.HTMLAttributes<HTMLElement> {
  taskData: Task[];
}

const BarChartOld = ({ taskData, className }: BarChartOldProps) => {
  const options = {
    plugins: {
      title: {
        display: true,
        text: "Status das tasks por Certificação",
        font: {
          size: 16,
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {},
        stacked: true,
        grid: {
          display: false,
        },
      },
      y: {
        stacked: true,
        grid: {
          display: false,
        },
      },
    },
  };

  const labels = [...new Set(taskData.map((data) => data.certification))];

  const statusTypes = [...new Set(taskData.map((task) => task.status))];

  const datasets = statusTypes.map((status) => ({
    label: status,
    data: labels.map((certificationId) =>
      taskData
        .filter(
          (task) =>
            task.certification === certificationId && task.status === status,
        )
        .reduce((sum, task) => sum + task.count, 0),
    ),
    backgroundColor: getBackgroundColor(status),
  }));

  console.log(datasets);

  const data = {
    labels: labels,
    datasets: datasets,
  };

  return (
    <Card className={cn("h-[440px] w-full flex-1 sm:h-96", className ?? "")}>
      <CardContent className="relative flex h-full items-center p-4">
        <Bar options={options} data={data} />
      </CardContent>
    </Card>
  );
};

const getBackgroundColor = (status: string) => {
  switch (status) {
    case "Completo":
      return "rgba(75, 192, 192, 1)";
    case "Em andamento":
      return "rgba(255, 159, 64, 1)";
    case "Não iniciado":
      return "rgba(255, 99, 132, 1)";
    default:
      return "rgba(0, 0, 0, 1)";
  }
};

export default BarChartOld;

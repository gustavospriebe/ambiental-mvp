"use client";

import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface Task {
    count: number;
    status: string;
    certification: string;
}

interface BarChartProps {
    taskData: Task[];
}

const BarChart = ({ taskData }: BarChartProps) => {
    const options = {
        plugins: {
            title: {
                display: true,
                text: "Status das tasks por Certificação",
            },
        },
        responsive: true,
        scales: {
            x: {
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
                        task.certification === certificationId &&
                        task.status === status
                )
                .reduce((sum, task) => sum + task.count, 0)
        ),
        backgroundColor: getBackgroundColor(status),
    }));

    const data = {
        labels: labels,
        datasets: datasets,
    };

    return <Bar options={options} data={data} />;
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

export default BarChart;

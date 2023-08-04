"use client";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
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
    _count: number;
    status: string;
    certificationId: string;
}

interface BarChartProps {
    taskCount: Task[];
}

const BarChart = ({ taskCount }: BarChartProps) => {
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
            },
            y: {
                stacked: true,
            },
        },
    };

    const labels = [
        ...new Set(
            taskCount.map(
                (data: { certificationId: string }) => data.certificationId
            )
        ),
    ];

    const statusTypes = [...new Set(taskCount.map((task) => task.status))];

    const datasets = statusTypes.map((status) => ({
        label: status,
        data: labels.map((certificationId) =>
            taskCount
                .filter(
                    (task) =>
                        task.certificationId === certificationId &&
                        task.status === status
                )
                .reduce((sum, task) => sum + task._count, 0)
        ),
        backgroundColor: getBackgroundColor(status),
    }));

    const data = {
        labels: labels,
        datasets: datasets,
    };

    return <Bar options={options} data={data}
    />;
};

const getBackgroundColor = (status: string) => {
    switch (status) {
        case "COMPLETED":
            return "rgba(75, 192, 192, 0.6)";
        case "STARTED":
            return "rgba(255, 159, 64, 0.6)";
        case "NOT_STARTED":
            return "rgba(255, 99, 132, 0.6)";
        default:
            return "rgba(0, 0, 0, 0.6)";
    }
};

export default BarChart;

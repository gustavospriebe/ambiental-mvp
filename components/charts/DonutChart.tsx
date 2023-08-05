"use client";

import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Task {
    status: string;
}

interface DonutChartProps {
    certificationGraph: Task[];
}

const DonutChart = ({ certificationGraph }: DonutChartProps) => {
    const options = {
        plugins: {
            title: {
                display: true,
                text: "Status das Certificações",
            },
        },
        responsive: true,
    };

    const labels = [
        ...new Set(
            certificationGraph.map((data: { status: string }) => data.status)
        ),
    ];

    const datasets = [
        {
            label: "Quantidade",
            data: labels.map(
                (label) =>
                    certificationGraph.filter((cert) => cert.status === label)
                        .length
            ),
            backgroundColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(255, 159, 64, 1)",
            ],
        },
    ];
    const data = {
        labels: labels,
        datasets: datasets,
    };

    return <Doughnut data={data} options={options} />;
};

export default DonutChart;

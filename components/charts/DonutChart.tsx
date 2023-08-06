"use client";

import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Task {
    status: string;
}

interface DonutChartProps extends React.HTMLAttributes<HTMLElement> {
    certificationGraph: Task[];
}

const DonutChart = ({ certificationGraph, className }: DonutChartProps) => {
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

    return (
        <Card className={cn("w-full h-full", className)}>
            <CardContent>
                <Doughnut data={data} options={options} />
            </CardContent>
        </Card>
    );
};

export default DonutChart;

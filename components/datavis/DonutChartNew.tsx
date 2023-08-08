"use client";

import { cn } from "@/lib/utils";
import { DonutChart } from "@tremor/react";

interface Task {
  status: string;
}

interface DonutChartNewProps extends React.HTMLAttributes<HTMLElement> {
  certificationGraph: Task[];
}

const DonutChartNew = ({
  certificationGraph,
  className,
}: DonutChartNewProps) => {
  const labels = [...new Set(certificationGraph.map((task) => task.status))];

  const data = labels.map((status) => ({
    label: status,
    data: certificationGraph.filter((q) => q.status === status).length,
  }));

  return (
    <DonutChart
      className={cn("mt-5 sm:mt-4 sm:h-2/3", className ?? "")}
      data={data}
      category="data"
      index="label"
      colors={["yellow", "green", "red"]}
    />
  );
};

export default DonutChartNew;

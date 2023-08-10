"use client";

import { cn } from "@/lib/utils";
import { DonutChart } from "@tremor/react";

interface Task {
  status: string;
}

interface certificationData {
  id: string;
  name: string;
  status: string;
  due: string;
}

interface DonutChartNewProps extends React.HTMLAttributes<HTMLElement> {
  certificationData: certificationData[];
}

const DonutChartNew = ({
  certificationData,
  className,
}: DonutChartNewProps) => {
  const certificationGraph = certificationData.map(
    (cert: { status: string }) => ({
      ...cert,
      status:
        cert.status === "COMPLETED"
          ? "Completo"
          : cert.status === "STARTED"
          ? "Em andamento"
          : "Não iniciado",
    }),
  );

  const labels = [
    ...new Set(certificationGraph.map((task: Task) => task.status)),
  ];

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
      colors={["yellow", "emerald", "rose"]}
    />
  );
};

export default DonutChartNew;

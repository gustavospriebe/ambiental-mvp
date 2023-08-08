"use client";

import { cn } from "@/lib/utils";
import { Card, DonutChart, Text, Title } from "@tremor/react";

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

  const data = labels.map(
    (status) => ({
      label: status,
      data: certificationGraph.filter((q) => q.status === status).length,
    }),
    // (result, item) =>
    //   {
    //     const {status, }

    //     {
    //     label: label,
    //     count: certificationGraph.filter((cert) => cert.status === label).length}}
  );

  console.log(data);

  return (
    // <Card className="flex-1 sm:flex sm:flex-col">
    // <Title className="">Status das Certificações</Title>
    // <Text className="">Tickets by Status</Text>
    <DonutChart
      className={cn("", className ?? "")}
      data={data}
      category="data"
      index="label"
      colors={["yellow", "green", "red"]}
    />
    // </Card>
  );
};

export default DonutChartNew;

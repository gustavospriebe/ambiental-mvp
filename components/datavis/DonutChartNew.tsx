"use client";

import { DonutChart, Card, Text, Title } from "@tremor/react";

interface Task {
  status: string;
}

interface DonutChartNewProps extends React.HTMLAttributes<HTMLElement> {
  certificationGraph: Task[];
}

const DonutChartNew = ({ certificationGraph }: DonutChartNewProps) => {
  const labels = [...new Set(certificationGraph.map((task) => task.status))];

  const data = labels.map(
    (status) => ({
      label: status,
      data: certificationGraph.filter(q => q.status === status).length
    })
    // (result, item) =>
    //   { 
    //     const {status, }
        
    //     {
    //     label: label,
    //     count: certificationGraph.filter((cert) => cert.status === label).length}}
  );

  console.log(data)

  return (
    <Card className="flex-1 h-full">
      <Title>Status das Tasks por Certificação</Title>
      <Text>Tickets by Status</Text>
      <DonutChart
      className="mt-6" 
      data={data}
      category="data"
      index="label"
      colors={["yellow", "green", "red"]}
    />
    </Card>
  );
};

export default DonutChartNew;

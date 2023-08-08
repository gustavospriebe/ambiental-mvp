"use client";

import { BarChart, Card, Text, Title } from "@tremor/react";

interface Task {
  count: number;
  status: string;
  certification: string;
}

interface BarChartNewProps extends React.HTMLAttributes<HTMLElement> {
  taskData: Task[];
}

const BarChartNew = ({ taskData }: BarChartNewProps) => {
  const statusTypes = [...new Set(taskData.map((task) => task.status))];

  const transformedData = taskData.reduce((result, item) => {
    const { certification, status, count } = item;

    // @ts-expect-error
    if (!result[certification]) {
      // @ts-expect-error
      result[certification] = {
        certification,
        Completo: 0,
        "Em andamento": 0,
        "Não iniciado": 0,
      };
    }
    // @ts-expect-error
    result[certification][status] = count;

    return result;
  }, {});

  const resultArray = Object.values(transformedData);

  return (
    // <Card className=" sm:max-w-[600px]">
    //   <Title>Status das Tasks por Certificação</Title>
    //   <Text>Tickets by Status</Text>
      <BarChart
        className="mt-4"
        data={resultArray}
        index={"certification"}
        categories={statusTypes}
        colors={["green", "yellow", "red"]}
        stack={true}
        yAxisWidth={20}
        showGridLines={false}
      />
    // </Card>
  );
};

export default BarChartNew;

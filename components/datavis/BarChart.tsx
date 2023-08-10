"use client";

import { cn } from "@/lib/utils";
import { BarChart } from "@tremor/react";

interface Task {
  count: number;
  status: string;
  certification: string;
}

interface BarChartNewProps extends React.HTMLAttributes<HTMLElement> {
  taskData: Task[];
}

const BarChartNew = ({ taskData, className }: BarChartNewProps) => {
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
    <BarChart
      className={cn("mt-4", className ?? "")}
      data={resultArray}
      index={"certification"}
      categories={statusTypes}
      colors={["emerald", "yellow", "rose"]}
      stack={true}
      yAxisWidth={20}
      showGridLines={false}
    />
  );
};

export default BarChartNew;

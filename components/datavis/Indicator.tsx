import { Card, DonutChartProps, Metric, Text } from "@tremor/react";
import DonutChartNew from "./DonutChartNew";
import { cn } from "@/lib/utils";

interface IndicatorProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  data: number | string;
  children?: React.ReactNode;
}

const Indicator = ({ title, data, children, className }: IndicatorProps) => {
  return (
    <Card className={cn("flex flex-col", className ?? "")}>
      <Text>{title}</Text>
      <Metric>{data}</Metric>
      {children}
    </Card>
  );
};

export default Indicator;

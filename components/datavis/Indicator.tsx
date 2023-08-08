import { Card, DonutChartProps, Metric, Text } from "@tremor/react";
import DonutChartNew from "./DonutChartNew";

interface IndicatorProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  data: number | string;
  children: React.ReactNode;
}

const Indicator = ({ title, data, children }: IndicatorProps) => {
  return (
    <Card className="flex-1">
      <Text>{title}</Text>
      <Metric>{data}</Metric>
      {children}
    </Card>
  );
};

export default Indicator;

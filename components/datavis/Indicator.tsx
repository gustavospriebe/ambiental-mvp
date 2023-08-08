import { Card, Metric, Text } from "@tremor/react";

interface IndicatorProps {
  title: string;
  data: number | string;
}

const Indicator = ({ title, data }: IndicatorProps) => {
  return (
    <Card className="flex-1">
      <Text>{title}</Text>
      <Metric>{data}</Metric>
    </Card>
  );
};

export default Indicator;

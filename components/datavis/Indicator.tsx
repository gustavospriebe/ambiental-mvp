import { Card, CardContent, CardHeader } from "../ui/card";

interface IndicatorProps {
  title: string;
  data: number | string;
}

const Indicator = ({ title, data }: IndicatorProps) => {
  return (
    <Card className="flex-1">
      <CardHeader>{title}</CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{data}</div>
      </CardContent>
    </Card>
  );
};

export default Indicator;

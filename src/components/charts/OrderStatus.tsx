"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useGetOrderStatusQuery } from "@/redux/features/chart/chrtApi";
import { IOrderStatus } from "@/types/chart";
import { LabelList, Pie, PieChart } from "recharts";

const chartConfig = {
  Pending: {
    label: "Pending",
    color: "hsl(var(--chart-1))",
  },
  Approved: {
    label: "Approved",
    color: "hsl(var(--chart-2))",
  },
  Rejected: {
    label: "Rejected",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;
const OrderStatus = () => {
  const { data, isLoading, isError } = useGetOrderStatusQuery({});

  const orderStatusData: IOrderStatus[] = data?.data;

  const chartData = orderStatusData?.map((item) => ({
    status: item._id,
    count: item.count,
    fill: `var(--color-${item._id})`,
  }));

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Order Status</CardTitle>
        <CardDescription>
          Its a order status summary for last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="status" hideLabel />}
            />
            <Pie data={chartData} dataKey="count">
              <LabelList
                dataKey="count"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value: keyof typeof chartConfig) =>
                  chartConfig[value]?.label
                }
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Order Summary
        </div>
        <div className="leading-none text-muted-foreground">
          Showing order summary for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
};

export default OrderStatus;

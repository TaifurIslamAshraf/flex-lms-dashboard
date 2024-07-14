"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

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
import { useGetOrderTrendsQuery } from "@/redux/features/chart/chrtApi";
import { IYearlySales } from "@/types/chart";
const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: "Revenue",
    color: "blue",
  },
} satisfies ChartConfig;

const YearlySales = () => {
  const { isLoading, data } = useGetOrderTrendsQuery({});

  const yearlySales: IYearlySales[] = data?.data;

  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="text-2xl text-muted-foreground">
          Total Revenue
        </CardTitle>
        <CardDescription>Last Year Total Revenue</CardDescription>
      </CardHeader>
      <CardContent className="p-1 md:p-3 ">
        <ChartContainer className="h-[350px] w-full" config={chartConfig}>
          <BarChart accessibilityLayer data={yearlySales}>
            <CartesianGrid vertical={false} />
            <XAxis
              className=""
              dataKey="name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis className="" />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              className=""
              barSize={50}
              height={300}
              background
              dataKey="total"
              fill="var(--color-desktop)"
              radius={8}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">Total Revenue</div>
        <div className="leading-none text-muted-foreground">
          Showing total revenue for the last 1 year
        </div>
      </CardFooter>
    </Card>
  );
};

export default YearlySales;

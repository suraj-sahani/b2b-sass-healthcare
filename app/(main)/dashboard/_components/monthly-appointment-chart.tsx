"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { MONTHLY_APPOINTMENT } from "@/lib/constants";

const chartConfig = {
  online: {
    label: "Online",
    color: "var(--chart-1)",
  },
  offline: {
    label: "Offline",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function MonthlyAppointmentChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Appointment Trends</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={MONTHLY_APPOINTMENT}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="online" fill="var(--color-online)" radius={4} />
            <Bar dataKey="offline" fill="var(--color-offline)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Monthly overview
        </div>
      </CardFooter>
    </Card>
  );
}

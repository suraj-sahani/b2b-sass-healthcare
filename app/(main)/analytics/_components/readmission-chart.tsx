"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

export const description = "An interactive bar chart";

const chartData = [
  { date: "2024-04-01", onlline: 222, offline: 150 },
  { date: "2024-04-02", onlline: 97, offline: 180 },
  { date: "2024-04-03", onlline: 167, offline: 120 },
  { date: "2024-04-04", onlline: 242, offline: 260 },
  { date: "2024-04-05", onlline: 373, offline: 290 },
  { date: "2024-04-06", onlline: 301, offline: 340 },
  { date: "2024-04-07", onlline: 245, offline: 180 },
  { date: "2024-04-08", onlline: 409, offline: 320 },
  { date: "2024-04-09", onlline: 59, offline: 110 },
  { date: "2024-04-10", onlline: 261, offline: 190 },
  { date: "2024-04-11", onlline: 327, offline: 350 },
  { date: "2024-04-12", onlline: 292, offline: 210 },
  { date: "2024-04-13", onlline: 342, offline: 380 },
  { date: "2024-04-14", onlline: 137, offline: 220 },
  { date: "2024-04-15", onlline: 120, offline: 170 },
  { date: "2024-04-16", onlline: 138, offline: 190 },
  { date: "2024-04-17", onlline: 446, offline: 360 },
  { date: "2024-04-18", onlline: 364, offline: 410 },
  { date: "2024-04-19", onlline: 243, offline: 180 },
  { date: "2024-04-20", onlline: 89, offline: 150 },
  { date: "2024-04-21", onlline: 137, offline: 200 },
  { date: "2024-04-22", onlline: 224, offline: 170 },
  { date: "2024-04-23", onlline: 138, offline: 230 },
  { date: "2024-04-24", onlline: 387, offline: 290 },
  { date: "2024-04-25", onlline: 215, offline: 250 },
  { date: "2024-04-26", onlline: 75, offline: 130 },
  { date: "2024-04-27", onlline: 383, offline: 420 },
  { date: "2024-04-28", onlline: 122, offline: 180 },
  { date: "2024-04-29", onlline: 315, offline: 240 },
  { date: "2024-04-30", onlline: 454, offline: 380 },
  { date: "2024-05-01", onlline: 165, offline: 220 },
  { date: "2024-05-02", onlline: 293, offline: 310 },
  { date: "2024-05-03", onlline: 247, offline: 190 },
  { date: "2024-05-04", onlline: 385, offline: 420 },
  { date: "2024-05-05", onlline: 481, offline: 390 },
  { date: "2024-05-06", onlline: 498, offline: 520 },
  { date: "2024-05-07", onlline: 388, offline: 300 },
  { date: "2024-05-08", onlline: 149, offline: 210 },
  { date: "2024-05-09", onlline: 227, offline: 180 },
  { date: "2024-05-10", onlline: 293, offline: 330 },
  { date: "2024-05-11", onlline: 335, offline: 270 },
  { date: "2024-05-12", onlline: 197, offline: 240 },
  { date: "2024-05-13", onlline: 197, offline: 160 },
  { date: "2024-05-14", onlline: 448, offline: 490 },
  { date: "2024-05-15", onlline: 473, offline: 380 },
  { date: "2024-05-16", onlline: 338, offline: 400 },
  { date: "2024-05-17", onlline: 499, offline: 420 },
  { date: "2024-05-18", onlline: 315, offline: 350 },
  { date: "2024-05-19", onlline: 235, offline: 180 },
  { date: "2024-05-20", onlline: 177, offline: 230 },
  { date: "2024-05-21", onlline: 82, offline: 140 },
  { date: "2024-05-22", onlline: 81, offline: 120 },
  { date: "2024-05-23", onlline: 252, offline: 290 },
  { date: "2024-05-24", onlline: 294, offline: 220 },
  { date: "2024-05-25", onlline: 201, offline: 250 },
  { date: "2024-05-26", onlline: 213, offline: 170 },
  { date: "2024-05-27", onlline: 420, offline: 460 },
  { date: "2024-05-28", onlline: 233, offline: 190 },
  { date: "2024-05-29", onlline: 78, offline: 130 },
  { date: "2024-05-30", onlline: 340, offline: 280 },
  { date: "2024-05-31", onlline: 178, offline: 230 },
  { date: "2024-06-01", onlline: 178, offline: 200 },
  { date: "2024-06-02", onlline: 470, offline: 410 },
  { date: "2024-06-03", onlline: 103, offline: 160 },
  { date: "2024-06-04", onlline: 439, offline: 380 },
  { date: "2024-06-05", onlline: 88, offline: 140 },
  { date: "2024-06-06", onlline: 294, offline: 250 },
  { date: "2024-06-07", onlline: 323, offline: 370 },
  { date: "2024-06-08", onlline: 385, offline: 320 },
  { date: "2024-06-09", onlline: 438, offline: 480 },
  { date: "2024-06-10", onlline: 155, offline: 200 },
  { date: "2024-06-11", onlline: 92, offline: 150 },
  { date: "2024-06-12", onlline: 492, offline: 420 },
  { date: "2024-06-13", onlline: 81, offline: 130 },
  { date: "2024-06-14", onlline: 426, offline: 380 },
  { date: "2024-06-15", onlline: 307, offline: 350 },
  { date: "2024-06-16", onlline: 371, offline: 310 },
  { date: "2024-06-17", onlline: 475, offline: 520 },
  { date: "2024-06-18", onlline: 107, offline: 170 },
  { date: "2024-06-19", onlline: 341, offline: 290 },
  { date: "2024-06-20", onlline: 408, offline: 450 },
  { date: "2024-06-21", onlline: 169, offline: 210 },
  { date: "2024-06-22", onlline: 317, offline: 270 },
  { date: "2024-06-23", onlline: 480, offline: 530 },
  { date: "2024-06-24", onlline: 132, offline: 180 },
  { date: "2024-06-25", onlline: 141, offline: 190 },
  { date: "2024-06-26", onlline: 434, offline: 380 },
  { date: "2024-06-27", onlline: 448, offline: 490 },
  { date: "2024-06-28", onlline: 149, offline: 200 },
  { date: "2024-06-29", onlline: 103, offline: 160 },
  { date: "2024-06-30", onlline: 446, offline: 400 },
];

const chartConfig = {
  patients: {
    label: "Total Patients",
  },
  onlline: {
    label: "This Year",
    color: "var(--chart-2)",
  },
  offline: {
    label: "Last Year",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function ReadmissionChart() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("onlline");

  const total = React.useMemo(
    () => ({
      onlline: chartData.reduce((acc, curr) => acc + curr.onlline, 0),
      offline: chartData.reduce((acc, curr) => acc + curr.offline, 0),
    }),
    [],
  );

  return (
    <Card className="py-0">
      <CardHeader className="flex flex-col items-stretch border-b p-0! sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:py-0!">
          <CardTitle>Re-admission Rate</CardTitle>
          <CardDescription>
            Showing total visitors for the last 3 months
          </CardDescription>
        </div>
        <div className="flex">
          {["onlline", "offline"].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg leading-none font-bold sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="patients"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Bar
              dataKey={activeChart}
              fill={`var(--color-${activeChart})`}
              radius={2}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

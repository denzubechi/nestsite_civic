"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { cn } from "@/lib/utils"
import { ReactNode } from "react"
const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-3))",
    },
    mobile: {
        label: "Mobile",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

export function UsersByCountry({ className, rightElement }: {
    className?: string;
    rightElement?: ReactNode
}) {
    return (
        <Card className={cn(className)}>
            <CardHeader className="flex-row items-center justify-between">
                <div>
                    <CardDescription>Users By Country</CardDescription>
                    <CardTitle>25000</CardTitle>
                </div>
                <div>
                    {rightElement}
                </div>
            </CardHeader>
            <CardContent className="min-w-[200px] min-h-[200px]">
                <ChartContainer config={chartConfig}>

                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        layout="vertical"
                        margin={{
                            left: -20,
                        }}
                        barGap={0}
                    >
                        <CartesianGrid />

                        <XAxis type="number" dataKey="desktop" hide />
                        <YAxis
                            dataKey="month"
                            type="category"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar dataKey="desktop" fill="var(--color-desktop)" />
                        <Bar dataKey="mobile" fill="var(--color-mobile)" />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">

            </CardFooter>
        </Card>
    )
}


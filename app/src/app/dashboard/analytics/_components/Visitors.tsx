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
    { month: "January", visitors: 186 },
    { month: "February", visitors: 305 },
    { month: "March", visitors: 237 },
    { month: "April", visitors: 73 },
    { month: "May", visitors: 209 },
    { month: "June", visitors: 214 },
]

const chartConfig = {
    visitors: {
        label: "Desktop",
        color: "hsl(var(--chart-3))",
    },
} satisfies ChartConfig

export function Visitors({ className, rightElement }: {
    className?: string;
    rightElement?: ReactNode
}) {
    return (
        <Card className={cn(className)}>
            <CardHeader className="flex-row items-center justify-between">
                <div>
                    <CardTitle></CardTitle>
                    <CardDescription className="font-medium text-base">Visitors</CardDescription>

                    <CardDescription></CardDescription>
                </div>
                <div>
                    {rightElement}
                </div>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <YAxis
                            dataKey="visitors"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                        // tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar dataKey="visitors" fill="var(--color-visitors)" radius={[10000, 10000, 0, 0]} />
                    </BarChart>
                </ChartContainer>
            </CardContent>

        </Card>
    )
}

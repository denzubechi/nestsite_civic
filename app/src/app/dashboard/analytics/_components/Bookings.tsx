"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

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
    { month: "January", completed: 186, pending: 110, active: 146, cancelled: 70 },
    { month: "February", completed: 205, pending: 230, active: 35, cancelled: 200 },
    { month: "March", completed: 237, pending: 120, active: 280, cancelled: 120 },
    { month: "April", completed: 73, pending: 190, active: 43, cancelled: 190 },
    { month: "May", completed: 209, pending: 130, active: 29, cancelled: 130 },
    { month: "June", completed: 214, pending: 140, active: 24, cancelled: 140 },
]

const chartConfig = {
    completed: {
        label: "Completed",
        color: "hsl(var(--chart-1))",
    },
    pending: {
        label: "Pending",
        color: "hsl(var(--chart-2))",
    },
    active: {
        label: "Active",
        color: "hsl(var(--chart-3))",
    },
    cancelled: {
        label: "Cancelled",
        color: "hsl(var(--chart-4))",
    },
} satisfies ChartConfig

export function Bookings({ className, rightElement }: {
    className?: string;
    rightElement?: ReactNode
}) {
    return (
        <Card className={cn(className)}>
            <CardHeader className="flex-row items-center justify-between">
                <div>
                    <CardDescription className="font-medium text-base">Bookings</CardDescription>

                    <CardDescription></CardDescription>
                </div>

                <div>
                    {
                        rightElement
                    }
                </div>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <Line
                            dataKey="completed"
                            type="monotone"
                            stroke="var(--color-completed)"
                            strokeWidth={2}
                            dot={false}
                        />
                        <Line
                            dataKey="active"
                            type="monotone"
                            stroke="var(--color-pending)"
                            strokeWidth={2}
                            dot={false}
                        />
                        <Line
                            dataKey="pending"
                            type="monotone"
                            stroke="var(--color-active)"
                            strokeWidth={2}
                            dot={false}
                        />
                        <Line
                            dataKey="cancelled"
                            type="monotone"
                            stroke="var(--color-cancelled)"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
            <CardFooter>

            </CardFooter>
        </Card>
    )
}

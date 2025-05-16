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
import { ReactNode } from "react"


const chartData = [
    { month: "January", users: 186 },
    { month: "February", users: 305 },
    { month: "March", users: 237 },
    { month: "April", users: 73 },
    { month: "May", users: 209 },
    { month: "June", users: 214 },
]



export function Stat({ title, count, color = "green", subText, subTextChange, change, rightElement }: { title: string, count: number, subText: string, subTextChange: string, color?: "green" | "red", change: string, rightElement?: ReactNode }) {
    const chartConfig = {
        users: {
            label: "Users",
            color: color === "green" ? "hsl(var(--chart-1))" : "hsl(var(--chart-2))",
        },
    } satisfies ChartConfig

    return (
        <Card className="py-0">
            <CardHeader className="items-center justify-between flex-row py-0 pt-2 pr-3">
                <div>
                    <CardDescription className="font-medium text-base">{title}</CardDescription>

                </div>
                <div>
                    {rightElement}
                </div>
            </CardHeader>
            <CardContent className="pr-1 pb-2">
                <div className="flex gap-4">
                    <div className="flex-1 pb-2 flex justify-between flex-col">
                        <div>
                            <CardTitle className="text-4xl">{count}</CardTitle>
                            <CardDescription className="whitespace-nowrap">{subText}{" "}
                                <span className="font-semibold text-sky-600">{subTextChange}</span>

                            </CardDescription>
                        </div>
                        <p className="text-xs text-green-600 font-semibold">{change}</p>
                    </div>
                    <div className="pt-5 w-full">

                        <ChartContainer config={chartConfig}>
                            <LineChart
                                accessibilityLayer
                                data={chartData}
                                margin={{
                                    left: 12,
                                    right: 12,
                                }}
                            >
                                {/* <CartesianGrid vertical={false} ho /> */}
                                {/* <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        /> */}
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent hideLabel />}
                                />
                                <Line
                                    dataKey="users"
                                    type="natural"
                                    stroke="var(--color-users)"
                                    strokeWidth={2}
                                    className="shadow "
                                    dot={false}
                                />
                            </LineChart>
                        </ChartContainer>
                    </div>
                </div>
            </CardContent>

        </Card>
    )
}

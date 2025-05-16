"use client"

import { TrendingUp } from "lucide-react"
import { Pie, PieChart } from "recharts"

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
    { status: "active", visitors: 275, fill: "var(--color-active)" },
    { status: "banned", visitors: 200, fill: "var(--color-banned)" },
]

const chartConfig = {
    active: {
        label: "Chrome",
        color: "hsl(var(--chart-3))",
    },
    banned: {
        label: "Safari",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

export function TotalUsersChart({ className, rightElement }: {
    className?: string;
    rightElement?: ReactNode
}) {
    return (
        <Card className={cn("flex flex-col", className)}>
            <CardHeader className="flex-row  justify-between items-center pb-2 pt-4">
                <div>
                    <CardDescription className="font-medium text-base">Total Users</CardDescription>
                    <CardTitle className="text-3xl">25,000</CardTitle>


                </div>
                <div className="">
                    {rightElement}

                </div>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="visitors"
                            nameKey="status"
                            innerRadius={60}
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="items-center gap-2 text-sm">

            </CardFooter>
        </Card>
    )
}

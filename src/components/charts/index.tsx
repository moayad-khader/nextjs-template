"use client";

import React, { useMemo } from "react";
import { Card } from "@/components/ui/card";
import createChart from "@/lib/factories/chart.factory";
import { cn } from "@/lib/utils";
import type { IChartComponent, Props } from "./types";

function Comp<T>({
	chart_type,
	details,
	isLoading,
	className,
	height,
	colors,
}: Props<T>) {
	const ChartComponent: IChartComponent<T> | null | undefined = useMemo(
		() => createChart(chart_type)?.getChart(),
		[chart_type],
	);
	return (
		<div className={cn("border-1 h-full space-y-2 rounded-md ", className)}>
			{isLoading ? (
				<>Loading ...</>
			) : (
				ChartComponent && (
					<Card className="w-full h-full p-2 relative">
						<ChartComponent height={height} details={details} colors={colors} />
					</Card>
				)
			)}
		</div>
	);
}

export const ChartComponent = React.memo(Comp);

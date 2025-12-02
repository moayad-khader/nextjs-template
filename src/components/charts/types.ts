import type { FC } from "react";

export type ChartTypes = "line" | "bar" | "pie";

export interface Props<T> {
	chart_type: ChartTypes;
	details: T;
	isLoading: boolean;
	className?: string;
	height?: string;
	colors?: string[];
}

export type IChartComponent<T> = FC<
	Pick<Props<T>, "details" | "className" | "height" | "colors">
>;

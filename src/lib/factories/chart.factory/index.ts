import { BarChartComponent } from "@/components/charts/elements";
import type { IChartComponent } from "@/components/charts/types";

class Chart<T> {
	chart: IChartComponent<T> | null;

	constructor() {
		this.chart = null;
	}

	getChart(): IChartComponent<T> | null {
		return this.chart;
	}
}

class BarChart<T> extends Chart<T> {
	constructor() {
		super();
		this.chart = BarChartComponent;
	}
}

function createChart<T>(chart_type: string): Chart<T> | null {
	switch (chart_type) {
		case "bar":
			return new BarChart();
		default:
			return null;
	}
}

export default createChart;

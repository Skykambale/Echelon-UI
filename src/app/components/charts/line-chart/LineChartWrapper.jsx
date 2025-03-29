import { CHART_CONSTANTS } from "@/app/utils/CHART_CONSTANTS";
import LineChart from "./LineChart";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const LineChartWrapper = () => {
	const [selectedDataRange, setSelectedDataRange] = useState(
		CHART_CONSTANTS.dataRanges.weekly
	);
	const allowedDataRangesForLineChart =
		CHART_CONSTANTS.lineChartSelectDataRanges;

	const productivityLevels = CHART_CONSTANTS.productivityLevels;

	const productivityLevelInNumbers = [0, 2, 3, 4, 3, 1, 2]; // calculated dynamically
	const xAxisLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]; //

	const handleOnDataRangeChange = (value) => {
		setSelectedDataRange(value);
	};

	return (
		<div className="w-full h-full flex flex-col bg-[#111] gap-8 p-4 rounded-md">
			<div className="flex justify-between">
				<h3 className="text-xl font-bold text-slate-300">
					Productivity Status
				</h3>
				<div className="flex gap-2 items-center">
					<p className="text-[#d1d1d1]">Select Data Range</p>
					<Select onValueChange={(value) => handleOnDataRangeChange(value)}>
						<SelectTrigger
							className={`w-[110px] h-[30px] bg-[#222] border border-white text-white rounded-md`}
						>
							<SelectValue placeholder={selectedDataRange} />
						</SelectTrigger>
						<SelectContent className="bg-[#222] border border-white text-white">
							{allowedDataRangesForLineChart.map((item) => (
								<SelectItem
									value={item.value}
									key={item.value}
									className="hover:bg-[#333] focus:bg-[#444] text-white"
								>
									{item.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</div>
			<LineChart
				yAxisLabels={productivityLevels}
				xAxisLabels={xAxisLabels}
				productivityData={productivityLevelInNumbers}
			/>
		</div>
	);
};

export default LineChartWrapper;

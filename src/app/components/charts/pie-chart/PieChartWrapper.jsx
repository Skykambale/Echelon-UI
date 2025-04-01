import { CHART_CONSTANTS } from "@/app/utils/CHART_CONSTANTS";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import PieChart from "./PieChart";

const PieChartWrapper = () => {
	const [selectedDataRange, setSelectedDataRange] = useState(CHART_CONSTANTS.dataRanges.monthly);
	const allowedDataRangesForLineChart = CHART_CONSTANTS.pieChartSelectDataRanges;
	const pieChartLabels = CHART_CONSTANTS.weekdaysInShort;

	const dailyProductivity = [2, 3, 4, 0, 0, 2, 15]; // Will come from an api call

	const handleOnDataRangeChange = (value) => {
		setSelectedDataRange(value);
		if (value === CHART_CONSTANTS.dataRanges.weekly) {
			console.log("weekly");
		} else if (value === CHART_CONSTANTS.dataRanges.monthly) {
			// Bring data from api and set it, we don't need a ifelse here, let api service handle it. it will return us the xAxisLabels and productivityLevelInNumbers
			// we will just set them
		}
	};

	const handleOnPieClick = (index) => {
		console.log(`Clicked on ${pieChartLabels[index]}`);
	};

	return (
		<div className="w-full h-full flex-1 flex flex-col bg-[#111] gap-8 p-4 rounded-md">
			<div className="flex justify-between">
				<h3 className="text-xl font-bold text-slate-300">Productivity by Days</h3>
				<div className="flex gap-2 items-center">
					<p className="text-[#d1d1d1]">Select Range</p>
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
			<div className="w-full h-full flex flex-col justify-between lg:flex-row">
				<div className="w-full h-full flex flex-col justify-center items-center">
					<div className="w-full flex justify-end">
						<Select onValueChange={(value) => handleOnDataRangeChange(value)}>
							<SelectTrigger
								className={`w-[110px] h-[30px] bg-[#222] border border-white text-white rounded-md`}
							>
								<SelectValue placeholder={selectedDataRange} />
							</SelectTrigger>
							<SelectContent className="bg-[#222] border border-white text-white">
								{CHART_CONSTANTS.productivityLevels.map((item) => (
									<SelectItem
										value={item}
										key={item}
										className="hover:bg-[#333] focus:bg-[#444] text-white"
									>
										{item}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					<PieChart
						productivityData={dailyProductivity}
						labels={pieChartLabels}
						onPieClick={handleOnPieClick}
					/>
				</div>
				<div className="w-full h-full">content</div>
			</div>
		</div>
	);
};

export default PieChartWrapper;

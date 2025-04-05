import { CHART_CONSTANTS } from "@/app/utils/CHART_CONSTANTS";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import PieChart from "./PieChart";
import DateList from "./DateList";

const PieChartWrapper = () => {
	const [selectedDataRange, setSelectedDataRange] = useState(CHART_CONSTANTS.dataRanges.monthly);
	const [selectedDayData, setSelectedDayData] = useState(null);
	const allowedDataRangesForLineChart = CHART_CONSTANTS.pieChartSelectDataRanges;
	const pieChartLabels = CHART_CONSTANTS.weekdaysInShort;

	const dailyProductivity = [2, 3, 4, 0, 0, 2, 15]; // Will come from an api call

	// Mock API call to fetch day-specific data
	const fetchDayData = async (day) => {
		// Simulating API delay
		await new Promise((resolve) => setTimeout(resolve, 500));

		// Mock data - in real app, this will come from API
		const mockData = {
			Mon: [
				{ id: 1, date: "2024-03-18", completedTasks: 7, totalTasks: 10 },
				{ id: 2, date: "2024-03-11", completedTasks: 5, totalTasks: 8 },
			],
			Tue: [
				{ id: 3, date: "2024-03-19", completedTasks: 3, totalTasks: 6 },
				{ id: 4, date: "2024-03-12", completedTasks: 4, totalTasks: 7 },
			],
			Wed: [
				{ id: 5, date: "2024-03-20", completedTasks: 5, totalTasks: 8 },
				{ id: 6, date: "2024-03-13", completedTasks: 6, totalTasks: 9 },
			],
			Thu: [{ id: 7, date: "2024-03-14", completedTasks: 2, totalTasks: 4 }],
			Fri: [{ id: 8, date: "2024-03-15", completedTasks: 8, totalTasks: 10 }],
			Sat: [{ id: 9, date: "2024-03-16", completedTasks: 1, totalTasks: 3 }],
			Sun: [{ id: 10, date: "2024-03-17", completedTasks: 0, totalTasks: 2 }],
		};

		return mockData[day] || [];
	};

	const handleOnDataRangeChange = (value) => {
		setSelectedDataRange(value);
		if (value === CHART_CONSTANTS.dataRanges.weekly) {
			console.log("weekly");
		} else if (value === CHART_CONSTANTS.dataRanges.monthly) {
			// Bring data from api and set it, we don't need a ifelse here, let api service handle it. it will return us the xAxisLabels and productivityLevelInNumbers
			// we will just set them
		}
	};

	const handleOnPieClick = async (index) => {
		const selectedDay = pieChartLabels[index];
		const dayData = await fetchDayData(selectedDay);
		setSelectedDayData({
			day: selectedDay,
			tasks: dayData,
		});
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
			<div className="w-full h-full flex flex-col justify-between lg:flex-row gap-4">
				<div className="w-full lg:w-1/2 h-[500px] lg:h-full flex flex-col justify-center items-center">
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
				{selectedDayData && (
					<div className="w-full lg:w-1/2 h-[500px] lg:h-full">
						<DateList dates={selectedDayData.tasks} selectedDay={selectedDayData.day} />
					</div>
				)}
			</div>
		</div>
	);
};

export default PieChartWrapper;

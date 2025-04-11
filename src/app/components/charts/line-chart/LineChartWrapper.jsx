import { CHART_CONSTANTS } from "@/app/utils/CHART_CONSTANTS";
import LineChart from "./LineChart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getStartAndEndDate } from "@/app/utils/date-utils";
import { useAuth } from "@clerk/clerk-react";
import { useRestSecurityClient } from "@/app/hooks/securityClient";

const LineChartWrapper = () => {
	const [selectedDataRange, setSelectedDataRange] = useState(CHART_CONSTANTS.dataRanges.weekly);
	const [directionDelta, setDirectionDelta] = useState(0);
	const allowedDataRangesForLineChart = CHART_CONSTANTS.lineChartSelectDataRanges;
	const { userId } = useAuth();
	const restClient = useRestSecurityClient();

	const productivityLevels = CHART_CONSTANTS.productivityLevels;

	// const productivityLevelInNumbers = [0, 2, 3, 4, 3, 1, 2]; // calculated dynamically
	const productivityLevelInNumbers = dummyProductivity; // calculated dynamically
	const [xAxisLabels, setXAxisLabels] = useState(CHART_CONSTANTS.weekdaysInShort); //

	const handleOnDataRangeChange = (value) => {
		setSelectedDataRange(value);
		if (value === CHART_CONSTANTS.dataRanges.weekly) {
			setXAxisLabels(CHART_CONSTANTS.weekdaysInShort);
		} else if (value === CHART_CONSTANTS.dataRanges.monthly) {
			// Bring data from api and set it, we don't need a ifelse here, let api service handle it. it will return us the xAxisLabels and productivityLevelInNumbers
			// we will just set them
			setXAxisLabels(dummyMonthData);
		}
		getLineChartData(value, 0);
	};

	const handleChangeDateRangeByOne = (direction) => {
		let newDelta = directionDelta;
		if (direction === "previous") newDelta -= 1;
		else if (direction === "next") newDelta += 1;
		setDirectionDelta(newDelta);

		getLineChartData(selectedDataRange, newDelta);
	};

	const getLineChartData = async (dataRange, operation) => {
		try {
			const { startDate, endDate } = getStartAndEndDate(new Date(), dataRange, operation);

			const response = await restClient.get(
				`/day/productivity/status/line-chart?startDate=${startDate}&endDate=${endDate}&userId=${"12345"}`
			);

			// Set the response.
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getLineChartData(selectedDataRange, 0);
	});
	return (
		<div className="w-full h-full flex-1 flex flex-col bg-[#111] gap-8 p-4 rounded-md mb-6">
			<div className="flex justify-between">
				<h3 className="text-xl font-bold text-slate-300">Productivity Status</h3>
				<div className="flex gap-2 items-center">
					<Button
						variant="ghost"
						size="icon"
						className="bg-[#222] hover:bg-[#333] hover:text-white"
						onClick={() => handleChangeDateRangeByOne("previous")}
					>
						<ChevronLeft className="h-5 w-5" />
					</Button>

					<Select onValueChange={(value) => handleOnDataRangeChange(value)}>
						<SelectTrigger
							className={`w-[110px] h-[35px] bg-[#222] border-none text-white rounded-md`}
						>
							<SelectValue placeholder={selectedDataRange} />
						</SelectTrigger>
						<SelectContent className="bg-[#222] border-none text-white">
							{allowedDataRangesForLineChart.map((item) => (
								<SelectItem
									value={item.value}
									key={item.value}
									className="hover:bg-[#333] focus:bg-[#444] text-white focus:text-white"
								>
									{item.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<Button
						variant="ghost"
						size="icon"
						className="bg-[#222] hover:bg-[#333] hover:text-white"
						onClick={() => handleChangeDateRangeByOne("next")}
					>
						<ChevronRight className="h-5 w-5" />
					</Button>
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

const dummyMonthData = [
	// this will come through an api eventually
	"1/03/2025",
	"2/03/2025",
	"3/03/2025",
	"4/03/2025",
	"5/03/2025",
	"6/03/2025",
	"7/03/2025",
	"8/03/2025",
	"9/03/2025",
	"10/03/2025",
	"11/03/2025",
	"12/03/2025",
	"13/03/2025",
	"14/03/2025",
	"15/03/2025",
	"16/03/2025",
	"17/03/2025",
	"18/03/2025",
	"19/03/2025",
	"20/03/2025",
	"21/03/2025",
	"22/03/2025",
	"23/03/2025",
	"24/03/2025",
	"25/03/2025",
	"26/03/2025",
	"27/03/2025",
	"28/03/2025",
	"29/03/2025",
	"30/03/2025",
	"31/03/2025",
];

const dummyProductivity = [
	1, 2, 1, 1, 1, 2, 3, 4, 3, 4, 0, 2, 3, 1, 0, 4, 2, 3, 4, 1, 1, 4, 2, 0, 1, 3, 2, 4, 3, 1, 3,
];

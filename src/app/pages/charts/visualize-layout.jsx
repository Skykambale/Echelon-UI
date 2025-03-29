import LineChartWrapper from "@/app/components/charts/line-chart/LineChartWrapper";

const VisualizeLayout = () => {
	return (
		<div className="flex w-full h-full justify-center items-center overflow-hidden">
			{/* Line chart */}
			<div className="flex flex-col gap-6 w-full h-full p-4 m-auto overflow-y-auto">
				<LineChartWrapper />
			</div>
		</div>
	);
};

export default VisualizeLayout;

export class CHART_CONSTANTS {
	public static getLineChartOptions(productivityLevels: Array<string>) {
		return {
			responsive: true,
			maintainAspectRatio: false,
			plugins: {
				legend: {
					display: false, // Remove legend for a cleaner look
				},
				title: {
					display: false,
					text: "Productivity Trend",
					color: "#fff",
					font: {
						size: 18,
					},
				},
				tooltip: {
					backgroundColor: "#222",
					titleColor: "#00c8ff",
					bodyColor: "#fff",
					borderColor: "#00c8ff",
					borderWidth: 1,
				},
			},
			scales: {
				x: {
					grid: {
						color: "rgba(255, 255, 255, 0.1)",
					},
					ticks: {
						color: "#aaa",
					},
				},
				y: {
					beginAtZero: false,
					ticks: {
						stepSize: 1,
						color: "#aaa",
						callback: (value: string) => productivityLevels[value] || "",
					},
					grid: {
						color: "rgba(255, 255, 255, 0.1)",
					},
				},
			},
		};
	}

	public static readonly productivityLevels = [
		"Idle",
		"Improving",
		"Moderate",
		"Efficient",
		"Peak",
	];

	public static readonly dataRanges = {
		weekly: "Weekly",
		monthly: "Monthly",
		yearly: "Yearly",
	};

	public static readonly lineChartSelectDataRanges = [
		{
			label: "Weekly",
			value: "Weekly",
		},
		{
			label: "Monthly",
			value: "Monthly",
		},
	];

	public static readonly weekdaysInShort = [
		"Sun",
		"Mon",
		"Tue",
		"Wed",
		"Thu",
		"Fri",
		"Sat",
	];
}

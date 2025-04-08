import { useState } from "react";
import { Button } from "@/components/ui/button";
import NewAIPlan from "@/app/components/ai/NewAIPlan";
import { Plus } from "lucide-react";

const AIPage = () => {
	const [plans, setPlans] = useState(demoData);

	const [showNewPlan, setShowNewPlan] = useState(false);

	const handleCreatePlan = async (inputData) => {
		const plan = {
			id: Date.now().toString(),
			title: inputData.title,
			level: inputData.level,
			months: parseInt(inputData.months),
			hoursPerDay: parseInt(inputData.hoursPerDay),
			expanded: false,
		};
		setPlans([...plans, plan]);
	};

	return (
		<div className="p-6 w-full h-full mx-auto relative">
			<div className="flex justify-between items-center mb-4">
				<h1 className="text-2xl font-bold text-white">AI Plans</h1>
				<Button className="bg-purple-800 hover:bg-purple-900 w-[100px] lg:w-fit" onClick={() => {}}>
					<Plus className="h-5 w-5" />
					<span className="hidden  lg:block">Add New Plan</span>
					<span className="text-xs lg:text-base lg:hidden">New Plan</span>
				</Button>
			</div>
			<div className="border-b border-gray-700 my-4"></div>

			<div className="w-full">
				{plans.length === 0 ? (
					<div className="text-center py-12 bg-[#222] rounded-lg">
						<p className="text-gray-400 text-lg">No Plan created, let&apos;s create one.</p>
					</div>
				) : (
					<div className="space-y-4 overflow-y-auto max-h-[80vh]">
						{plans.map((plan) => (
							<div
								key={plan.id}
								className="border border-[#333] rounded-lg p-6 cursor-pointer hover:bg-[#181818] transition-colors duration-200 bg-[#222]"
							>
								<div className="flex justify-between items-center">
									<div className="flex-1 flex items-center">
										<h3 className="text-lg font-semibold text-white text-left mr-2">
											{plan.title}
										</h3>
										<span className="px-1 py-0.5 text-xs font-medium bg-blue-500 text-white rounded-full">
											{plan.level}
										</span>
									</div>
									<span className="text-sm text-gray-400 ml-2">
										{plan.months} months • {plan.hoursPerDay} hours/day
									</span>
								</div>
								{plan.expanded && (
									<div className="mt-4 pt-4 border-t border-[#333]">
										{/* Steps will be implemented later */}
									</div>
								)}
							</div>
						))}
					</div>
				)}
			</div>

			{/* New Plan Modal */}
			{showNewPlan && <NewAIPlan onClose={() => setShowNewPlan(false)} onSubmit={handleCreatePlan} />}
		</div>
	);
};

export default AIPage;

const demoData = [
	{
		id: "1",
		title: "Machine Learning Fundamentals",
		level: "Beginner",
		months: 3,
		hoursPerDay: 2,
		expanded: false,
	},
	{
		id: "2",
		title: "Deep Learning",
		level: "Intermediate",
		months: 4,
		hoursPerDay: 3,
		expanded: false,
	},
	// Additional dummy plans
	{
		id: "3",
		title: "Data Science Basics",
		level: "Beginner",
		months: 2,
		hoursPerDay: 1,
		expanded: false,
	},
	{
		id: "4",
		title: "Advanced AI Techniques",
		level: "Advanced",
		months: 6,
		hoursPerDay: 4,
		expanded: false,
	},
	{
		id: "5",
		title: "AI Ethics",
		level: "Intermediate",
		months: 1,
		hoursPerDay: 1,
		expanded: false,
	},
	{
		id: "6",
		title: "Neural Networks",
		level: "Intermediate",
		months: 3,
		hoursPerDay: 2,
		expanded: false,
	},
	{
		id: "7",
		title: "AI in Healthcare",
		level: "Advanced",
		months: 5,
		hoursPerDay: 3,
		expanded: false,
	},
	{
		id: "8",
		title: "AI for Robotics",
		level: "Advanced",
		months: 4,
		hoursPerDay: 3,
		expanded: false,
	},
	{
		id: "9",
		title: "Natural Language Processing",
		level: "Intermediate",
		months: 3,
		hoursPerDay: 2,
		expanded: false,
	},
	{
		id: "10",
		title: "Computer Vision",
		level: "Intermediate",
		months: 4,
		hoursPerDay: 3,
		expanded: false,
	},
	{
		id: "11",
		title: "AI for Finance",
		level: "Beginner",
		months: 2,
		hoursPerDay: 1,
		expanded: false,
	},
	{
		id: "12",
		title: "AI for Marketing",
		level: "Beginner",
		months: 2,
		hoursPerDay: 1,
		expanded: false,
	},
	{
		id: "13",
		title: "AI for Education",
		level: "Intermediate",
		months: 3,
		hoursPerDay: 2,
		expanded: false,
	},
	{
		id: "14",
		title: "AI for Gaming",
		level: "Advanced",
		months: 5,
		hoursPerDay: 3,
		expanded: false,
	},
	{
		id: "15",
		title: "AI for Agriculture",
		level: "Intermediate",
		months: 3,
		hoursPerDay: 2,
		expanded: false,
	},
	{
		id: "16",
		title: "AI for Transportation",
		level: "Advanced",
		months: 4,
		hoursPerDay: 3,
		expanded: false,
	},
	{
		id: "17",
		title: "AI for Cybersecurity",
		level: "Advanced",
		months: 5,
		hoursPerDay: 3,
		expanded: false,
	},
	{
		id: "18",
		title: "AI for Environment",
		level: "Beginner",
		months: 2,
		hoursPerDay: 1,
		expanded: false,
	},
	{
		id: "19",
		title: "AI for Social Good",
		level: "Intermediate",
		months: 3,
		hoursPerDay: 2,
		expanded: false,
	},
	{
		id: "20",
		title: "AI for Art",
		level: "Beginner",
		months: 2,
		hoursPerDay: 1,
		expanded: false,
	},
	{
		id: "21",
		title: "AI for Music",
		level: "Intermediate",
		months: 3,
		hoursPerDay: 2,
		expanded: false,
	},
];

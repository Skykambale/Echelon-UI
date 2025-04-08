import { useState } from "react";
import { Button } from "@/components/ui/button";
import NewAIPlan from "@/app/components/ai/NewAIPlan";
import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
const AIPage = () => {
	const [plans, setPlans] = useState(demoData);
	const [showNewPlan, setShowNewPlan] = useState(false);
	const navigate = useNavigate();

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

	const handlePlanClick = (id) => {
		navigate(`/ai/roadmap/${id}`);
	};

	return (
		<div className="p-4 w-full h-full mx-auto relative">
			<div className="flex justify-between items-center mb-4">
				<h1 className="text-xl font-medium text-slate-200">Roadmaps by AI</h1>
				<Button
					onClick={() => setShowNewPlan(true)}
					className="bg-purple-800 hover:bg-purple-900 text-white px-4 py-2 rounded-md flex items-center shadow-md"
				>
					<Plus className="" />
					<span>Add AI Plan</span>
				</Button>
			</div>
			<div className="border-b border-gray-700 mb-4"></div>
			<div className="w-full overflow-y-auto h-[80vh]">
				{plans.length === 0 ? (
					<div className="text-center py-12 bg-[#222] rounded-lg">
						<p className="text-gray-400 text-lg">No Plan created, let&apos;s create one.</p>
					</div>
				) : (
					<ul className="divide-y divide-gray-700">
						{plans.map((plan) => (
							<li
								key={plan.id}
								className="flex justify-between items-center py-4 px-6 bg-[#222] hover:bg-[#191919] cursor-pointer rounded-md mb-2"
								onClick={() => handlePlanClick(plan.id)}
							>
								<div className="flex items-center">
									<h3 className="text-lg font-semibold text-white mr-3">{plan.title}</h3>

									<Badge className="bg-purple-500/20 text-purple-300 text-xs rounded-md px-2 py-0.5 w-fit border-none">
										{plan?.level}
									</Badge>
								</div>
								<span className="text-sm text-gray-400">
									{plan.months} months • {plan.hoursPerDay} hours/day
								</span>
							</li>
						))}
					</ul>
				)}
			</div>
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

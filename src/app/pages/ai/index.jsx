import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import NewAIPlan from "@/app/components/ai/NewAIPlan";

const AIPage = () => {
	const [plans, setPlans] = useState([
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
	]);

	const [showNewPlan, setShowNewPlan] = useState(false);

	const handleExpand = (id) => {
		setPlans(plans.map((plan) => (plan.id === id ? { ...plan, expanded: !plan.expanded } : plan)));
	};

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
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-3xl font-bold text-primary">AI Plans</h1>
				<Button
					onClick={() => setShowNewPlan(true)}
					className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg"
				>
					New Plan
				</Button>
			</div>

			<div className="w-full">
				{plans.length === 0 ? (
					<div className="text-center py-12 bg-[#222] rounded-lg">
						<p className="text-gray-400 text-lg">No Plan created, let&apos;s create one.</p>
					</div>
				) : (
					<div className="space-y-4">
						{plans.map((plan) => (
							<div
								key={plan.id}
								className="border border-[#333] rounded-lg p-6 cursor-pointer hover:bg-[#333] transition-colors duration-200 bg-[#222]"
								onClick={() => handleExpand(plan.id)}
							>
								<div className="flex justify-between items-center">
									<div className="flex-1">
										<h3 className="text-lg font-semibold text-white">{plan.title}</h3>
										<div className="flex items-center gap-2 mt-1">
											<span className="px-2 py-1 text-xs font-medium bg-primary/20 text-primary rounded-full">
												{plan.level}
											</span>
											<span className="text-sm text-gray-400">
												{plan.months} months • {plan.hoursPerDay} hours/day
											</span>
										</div>
									</div>
									{plan.expanded ? (
										<ChevronUp className="h-5 w-5 text-gray-400" />
									) : (
										<ChevronDown className="h-5 w-5 text-gray-400" />
									)}
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

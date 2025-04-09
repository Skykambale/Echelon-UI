import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import NewAIPlan from "@/app/components/ai/NewAIPlan";
import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useRestSecurityClient } from "@/app/hooks/securityClient";
import RoadmapDetails from "./RoadmapDetails";
import Loading from "@/app/components/LoadingSpinner";
import { useAuth } from "@clerk/clerk-react";
import { useToast } from "@/hooks/use-toast";
const AIPage = () => {
	const [plans, setPlans] = useState([]);
	const [showNewPlan, setShowNewPlan] = useState(false);
	const navigate = useNavigate();
	const restClient = useRestSecurityClient();
	const [roadmapData, setRoadmapData] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const { userId } = useAuth();
	const { toast } = useToast();

	const handleCreatePlan = async (inputData) => {
		try {
			const plan = {
				title: inputData.title,
				skillLevel: inputData.level || 0,
				monthsAllocated: parseInt(inputData.months),
				hoursPerDay: parseInt(inputData.hoursPerDay),
				startDate: new Date(),
			};

			setShowNewPlan(false);
			setIsLoading(true);

			const response = await restClient.post(`/ai/roadmap/new`, plan);
			console.log("AI RESPONSE :: ");
			console.log(response);
			if (response.result) {
				setRoadmapData(response.result);
			}
		} catch (error) {
			console.error("Error creating plan:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const getAllRoadmaps = async () => {
		try {
			setIsLoading(true);
			const response = await restClient.get(`/ai/roadmap/get/${userId}`);
			if (response.result) {
				console.log(response.result);
				setPlans(response.result);
			}
		} catch (error) {
			console.error("Error creating plan:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const handlePlanClick = (id) => {
		navigate(`/ai/roadmap/${id}`);
	};

	const handleConfirmPlan = async (data) => {
		try {
			setIsLoading(true);
			const response = await restClient.post("/ai/roadmap/confirm", { userId, data });
			console.log(response);
			if (response.result) {
				setRoadmapData(null);
				toast({
					title: "New Plan created successfully",
				});
				await getAllRoadmaps();
			}
		} catch (err) {
			toast({
				title: "Oops! Something went wrong while creating plan",
				description: err.message,
				variant: "destructive",
			});
		} finally {
			setIsLoading(false);
		}
	};

	const handleCancelPlan = () => {
		setRoadmapData(null);
	};

	const handleDeletePlan = async (id) => {};

	useEffect(() => {
		getAllRoadmaps();
	}, []);

	return (
		<>
			{isLoading && <Loading />}
			{roadmapData ? (
				<RoadmapDetails
					roadmapData={roadmapData}
					onConfirm={handleConfirmPlan}
					onCancel={handleCancelPlan}
					onDelete={handleDeletePlan}
				/>
			) : (
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
							<div className="w-full h-full flex justify-center items-center py-12 bg-[#222] rounded-lg">
								<p className="text-gray-400 text-lg">
									No Plans created, let&apos;s create one now.
								</p>
							</div>
						) : (
							<ul className="divide-y divide-gray-700">
								{plans.map((plan) => (
									<li
										key={plan.id}
										className="flex justify-between items-center py-4 px-6 bg-[#222] hover:bg-[#191919] cursor-pointer rounded-md mb-2"
										onClick={() => handlePlanClick(plan._id)}
									>
										<div className="flex items-center">
											<h3 className="text-lg font-semibold text-white mr-3">
												{plan.title}
											</h3>

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
					{showNewPlan && (
						<NewAIPlan onClose={() => setShowNewPlan(false)} onSubmit={handleCreatePlan} />
					)}
				</div>
			)}
		</>
	);
};

export default AIPage;

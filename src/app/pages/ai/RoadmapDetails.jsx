import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";
import { X, RefreshCw, Edit, Check } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { useRestSecurityClient } from "@/app/hooks/securityClient";
import { useAuth } from "@clerk/clerk-react";

const RoadmapDetails = ({ roadmapData = null }) => {
	const { id } = useParams();
	const [data, setRoadmapData] = useState(roadmapData);
	const [expandedStep, setExpandedStep] = useState(null);
	const restClient = useRestSecurityClient();
	const auth = useAuth();

	const setRoadmapDetails = () => {
		if (!id && !roadmapData) {
			console.error("Both methods failed");
			return;
		}

		if (roadmapData) {
			setRoadmapData(roadmapData);
		} else {
			fetchRoadmapDetails(id);
		}
	};

	const fetchRoadmapDetails = (id) => {
		try {
			if (!id) return;
			const response = restClient.g(`/api/roadmap/${auth.userId}/${id}`);
			if (response.result) {
				setRoadmapData(response.result);
			}
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		if (id) {
			fetchRoadmapDetails(id);
		}
	}, [id]);

	useEffect(() => {
		setRoadmapDetails();
	}, []);

	const handleCancel = () => {
		console.log("Cancel action");
	};

	const handleRecreate = () => {
		console.log("Recreate action");
	};

	const handleEdit = () => {
		console.log("Edit action");
	};

	const handleConfirm = () => {
		console.log("Confirm action");
	};

	const toggleStep = (index) => {
		setExpandedStep(expandedStep === index ? null : index);
	};

	return (
		<div className="p-4 w-full h-full mx-auto relative">
			{/* Top Navigation Bar */}
			<div className="flex justify-between items-center border-b border-slate-600 pb-6 px-2">
				<div className="flex-col flex items-center space-x-4 lg:flex-row">
					<h1 className="text-base lg:text-xl font-medium text-slate-200">Learn React </h1>
					<Badge
						variant="outline"
						className="bg-purple-500/20 text-purple-300 text-xs rounded-md px-2 py-0.5 w-fit border-none"
					>
						Intermediate
					</Badge>
				</div>
				<div className="text-sm text-gray-400 flex flex-col lg:flex-row">
					<span>3 months •</span>
					<span>2 hours/day</span>
				</div>
			</div>

			{/* Main Content */}
			{data && data.isFeasible ? (
				<div className="px-4 py-4 overflow-y-auto h-[75dvh] lg:h-[80dvh]">
					<h2 className="text-lg font-medium text-gray-400 mb-6">Steps</h2>
					<div className="space-y-1">
						{data &&
							Object.keys(data?.learning_steps)?.map((date, index) => (
								<div key={index} className="border-l-2 border-gray-800 relative pl-8 pb-6">
									<div
										className="flex items-center cursor-pointer group"
										onClick={() => toggleStep(index)}
									>
										<div className="absolute -left-[17px] w-8 h-8 rounded-full bg-gray-800 border-2 border-gray-700 group-hover:border-purple-500 transition-colors flex items-center justify-center">
											<span className="text-xs text-gray-400 group-hover:text-purple-400">
												{index + 1}
											</span>
										</div>
										<p className="text-white text-sm lg:text-base group-hover:text-purple-400 transition-colors">
											{new Date(date).toDateString()}
										</p>
									</div>

									{expandedStep === index && (
										<div className="mt-4 ml-4 space-y-3 text-sm text-gray-400">
											{data.learning_steps[date].map((topic, topicIndex) => (
												<div className="flex items-center space-x-2" key={topicIndex}>
													<div className="w-1 h-1 rounded-full bg-gray-600" />
													<span>{topic}</span>
												</div>
											))}
										</div>
									)}
								</div>
							))}
					</div>
				</div>
			) : (
				<div className="flex justify-center items-center h-[75dvh] lg:h-[80dvh]">
					{data?.isFeasible ? (
						<p className="text-sm text-gray-400">{data?.reason}</p>
					) : (
						<p className="text-sm text-gray-400">Oops! Roadmap details not available! </p>
					)}
				</div>
			)}

			{/* Fixed Action Bar */}
			<div className="absolute bottom-0 left-0 right-0  px-6">
				<div className="py-4 flex justify-end items-center space-x-3">
					<Button onClick={handleCancel} className="text-gray-400 hover:text-white">
						<X />
						<span className="hidden lg:block">Cancel</span>
					</Button>
					<Button onClick={handleRecreate} className="text-gray-400 hover:text-white">
						<RefreshCw />
						<span className="hidden lg:block">Recreate</span>
					</Button>
					<Button onClick={handleEdit} className="text-gray-400 hover:text-white" disabled>
						<Edit />

						<span className="hidden lg:block">Edit</span>
					</Button>
					<Button
						onClick={handleConfirm}
						className="bg-purple-600 hover:bg-purple-700 text-white ml-2"
					>
						<Check />
						<span className="hidden lg:block">Confirm</span>
					</Button>
				</div>
			</div>
		</div>
	);
};

RoadmapDetails.propTypes = {
	plan: PropTypes.shape({
		title: PropTypes.string,
		level: PropTypes.string,
		months: PropTypes.number,
		hoursPerDay: PropTypes.number,
	}),
};

export default RoadmapDetails;

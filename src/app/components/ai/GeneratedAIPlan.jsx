import { Button } from "@/components/ui/button";
import { X, RefreshCw, Edit, Check } from "lucide-react";
import PropTypes from "prop-types";

const GeneratedAIPlan = ({ plan, onCancel, onRecreate, onEdit, onConfirm }) => {
	// Static response data for now
	const steps = [
		"Learn basic concepts and terminology",
		"Understand core algorithms and their applications",
		"Practice with real-world datasets",
		"Build and deploy a simple model",
		"Work on advanced topics and optimization",
		"Complete a capstone project",
	];

	return (
		<div className="max-w-4xl mx-auto">
			{/* Header */}
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-primary mb-4">{plan?.title}</h1>
				<div className="flex items-center gap-4 text-gray-400">
					<span className="px-3 py-1 text-sm font-medium bg-primary/20 text-primary rounded-full">
						{plan?.level}
					</span>
					<span className="text-sm">
						{plan?.months} months • {plan?.hoursPerDay} hours/day
					</span>
				</div>
			</div>

			{/* Steps */}
			<div className="mb-8">
				<h2 className="text-xl font-semibold text-white mb-4">Learning Steps</h2>
				<ul className="space-y-3">
					{steps.map((step, index) => (
						<li key={index} className="flex items-start gap-3">
							<div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1">
								<span className="text-primary text-sm font-medium">{index + 1}</span>
							</div>
							<p className="text-gray-300">{step}</p>
						</li>
					))}
				</ul>
			</div>

			{/* Action Buttons */}
			<div className="flex justify-end gap-3">
				<Button
					variant="outline"
					onClick={onCancel}
					className="flex items-center gap-2 text-gray-400 hover:text-white border-gray-700 hover:border-gray-600"
				>
					<X className="h-4 w-4" />
					Cancel
				</Button>
				<Button
					variant="outline"
					onClick={onRecreate}
					className="flex items-center gap-2 text-gray-400 hover:text-white border-gray-700 hover:border-gray-600"
				>
					<RefreshCw className="h-4 w-4" />
					Recreate
				</Button>
				<Button
					variant="outline"
					onClick={onEdit}
					className="flex items-center gap-2 text-gray-400 hover:text-white border-gray-700 hover:border-gray-600"
				>
					<Edit className="h-4 w-4" />
					Edit
				</Button>
				<Button
					onClick={onConfirm}
					className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white"
				>
					<Check className="h-4 w-4" />
					Confirm
				</Button>
			</div>
		</div>
	);
};

// GeneratedAIPlan.propTypes = {
// 	plan: PropTypes.shape({
// 		title: PropTypes.string.isRequired,
// 		level: PropTypes.string.isRequired,
// 		months: PropTypes.number.isRequired,
// 		hoursPerDay: PropTypes.number.isRequired,
// 	}).isRequired,
// 	onCancel: PropTypes.func.isRequired,
// 	onRecreate: PropTypes.func.isRequired,
// 	onEdit: PropTypes.func.isRequired,
// 	onConfirm: PropTypes.func.isRequired,
// };

export default GeneratedAIPlan;

import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import PropTypes from "prop-types";
import { X } from "lucide-react";
import Loading from "./LoadingSpinner";
import { useToast } from "@/hooks/use-toast";

// Constants
const categories = [
	{ label: "Personal", value: "personal" },
	{ label: "Work", value: "work" },
	{ label: "Academics", value: "academics" },
];

const defaultInputValues = {
	title: "",
	description: "",
	category: "",
	taskDate: new Date(),
};

// component
const NewTask = ({ onClose, onSubmit }) => {
	const [inputData, setInputData] = useState(defaultInputValues);
	const [isLoading, setIsLoading] = useState(false);
	const {toast} = useToast();

	const handleInputChange = (field, value) => {
		setInputData({ ...inputData, [field]: value });
		console.log(field, value);
	};

	const handleOnCreate = async () => {
		try{ 
			console.log("API CALLL :: ", inputData);
			setIsLoading(true);
			const response = await onSubmit(inputData);
			if (response.success) { 
				toast({
					title: "Task created successfully",
				  })
			}
		}
		catch(error){ 
			console.log(error)
			toast({
				title: "Oops! Something went wrong while creating task",
				description: error.message,
				variant: "destructive"
			  })
		}
		finally{ 
			setIsLoading(false);
			onClose();
		}
		
	};

	const handleCloseModal = () => {
		setInputData(defaultInputValues);
		onClose();
	};

	return (
		<div className="w-full flex flex-col gap-4 lg:w-1/2">
			{isLoading && <Loading />}
			<div className="border border-slate-600 rounded-md bg-[#111]">
				<div>
					<div className="p-2 flex justify-between items-center lg:p-4">
						<h3>Create a New Task</h3>

						<X onClick={handleCloseModal} className="cursor-pointer" />
					</div>
					<div className="w-full h-[.5px] bg-slate-600"></div>

					<div className="p-2 h-[60vh] overflow-auto flex flex-col gap-2 lg:p-4 lg:gap-4">
						{/* Inputs */}
						<Input
							className={"bg-[#222] py-6 "}
							placeholder={"Title *"}
							onChange={(e) => handleInputChange("title", e.target.value)}
							value={inputData.title}
						/>
						<Textarea
							className={"bg-[#222]"}
							placeholder={"Description (optional)"}
							rows={16}
							value={inputData.description}
							onChange={(e) => handleInputChange("description", e.target.value)}
						/>

						<div className="flex justify-between gap-4 w-full">
							<Select
								onValueChange={(value) => handleInputChange("category", value)}
								value={inputData.category}
								defaultValue="work"
							>
								<SelectTrigger className={`w-full bg-[#222] py-6 `}>
									<SelectValue placeholder="Work" />
								</SelectTrigger>
								<SelectContent>
									{categories.map((item) => (
										<SelectItem value={item.value} key={item.value}>
											{item.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>

							<DatePicker
								className={
									"w-full py-6  justify-start text-left font-normal text-zinc-700 bg-[#222]"
								}
								date={inputData.taskDate}
								setDate={(date) => handleInputChange("taskDate", date)}
							/>
						</div>
					</div>

					<div className="w-full h-[.5px] bg-slate-600"></div>

					<div className="p-2 flex justify-end items-center gap-3">
						<Button className={"bg-red-800 hover:bg-red-900"} onClick={handleCloseModal}>
							Cancel
						</Button>
						<Button className={"bg-green-800 hover:bg-green-900"} onClick={handleOnCreate}>
							Create
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

// Proptypes
NewTask.propTypes = {
	onClose: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
};

export default NewTask;

import { DatePicker } from "@/components/ui/date-picker";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft } from "lucide-react";
import Task from "@/app/components/Task";
import NewTask from "@/app/components/NewTask";
import { useRestSecurityClient } from "@/app/hooks/securityClient";
import Loading from "@/app/components/LoadingSpinner";
import { useAuth } from "@clerk/clerk-react";
import { GLOBAL_CONSTANTS } from "@/app/utils/GLOBAL_CONSTANTS";
import { useToast } from "@/hooks/use-toast";

const TaskDashboard = () => {
	const [date, setDate] = useState(new Date());
	const [taskList, setTaskList] = useState([]);
	const [selectedFilters, setSelectedFilters] = useState({});
	const [showNewTask, setShowNewTask] = useState(false);
	const restClient = useRestSecurityClient();
	const [isLoading, setIsLoading] = useState(false);
	const auth = useAuth();
	const { toast } = useToast();

	const handleDropdownChange = (dropdown, newValue) => {
		setSelectedFilters({ ...selectedFilters, [dropdown]: newValue });
	};
	const handleChangeDateByOne = (date, type) => {
		if (type === "next") {
			setDate(new Date(date.setDate(date.getDate() + 1)));
		} else if (type === "previous") {
			setDate(new Date(date.setDate(date.getDate() - 1)));
		}
	};

	// Dumy userid and date : user_12345, 2025-03-31
	const getTasks = async (date, userId) => {
		try {
			if (!date || !userId) {
				// This will work when we remove default parameter values.
				return;
			}
			setIsLoading(true);
			const response = await restClient.get(`/tasks/?date=${date}&userId=${userId}`);
			setTaskList(response?.result);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	const createNewTask = async (inputData) => {
		try {
			inputData.userId = auth.userId;
			return await restClient.post(`/tasks/create`, inputData);
		} catch (error) {
			console.log(error);
		} finally {
			const dateInRequiredFormat = new Date(date).toISOString().split("T")[0];
			getTasks(dateInRequiredFormat, auth.userId);
		}
	};

	const handleTaskUpdate = async (taskId, updatedData) => {
		// If error show toast, do nothing on successfull response.
		try {
			if (!taskId || !updatedData) {
				throw new Error("Task Id or updated data is missing");
			}
			setIsLoading(true);
			await restClient.put(`/tasks/update`, { taskId, updatedData });
		} catch (error) {
			toast({
				title: "Oops! Something went wrong while updating the task data",
				description: error.message,
				variant: "destructive",
			});
		} finally {
			const dateInRequiredFormat = new Date(date).toISOString().split("T")[0];
			await getTasks(dateInRequiredFormat, auth.userId);
			setIsLoading(false);
		}
	};

	const handleTaskDelete = async (taskId) => {
		try {
			if (!taskId) {
				throw new Error("Task Id is missing");
			}
			setIsLoading(true);
			await restClient.delete(`/tasks/delete?taskId=${taskId}`);
			toast({ title: "Deleted the task successfully" });
		} catch (error) {
			toast({
				title: "Oops! Something went wrong while deleting the task",
				description: error.message,
				variant: "destructive",
			});
		} finally {
			const dateInRequiredFormat = new Date(date).toISOString().split("T")[0];
			await getTasks(dateInRequiredFormat, auth.userId);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (date) {
			try {
				const dateInRequiredFormat = new Date(date).toISOString().split("T")[0];
				getTasks(dateInRequiredFormat, auth.userId);
			} catch (error) {
				console.log(error);
			}
		}
	}, [date]);

	return (
		<div className="w-100 h-full flex items-center justify-center p-2 relative">
			{isLoading && <Loading />}
			{!showNewTask && (
				<div className="w-full flex flex-col gap-4 lg:w-1/2">
					<div className="flex justify-center items-center p-2 gap-4 ">
						<Button size="icon" onClick={() => handleChangeDateByOne(date, "previous")}>
							<ChevronLeft />
						</Button>
						<DatePicker date={date} setDate={setDate} />
						<Button size="icon" onClick={() => handleChangeDateByOne(date, "next")}>
							<ChevronRight />
						</Button>
					</div>
					<div className="border border-slate-600 rounded bg-[#111]">
						<div>
							<div className="p-2 flex justify-end items-center">
								{/* <Select onValueChange={(value) => handleDropdownChange("filter", value)}>
									<SelectTrigger className="w-[150px] border-none">
										<SelectValue placeholder="Filters" />
									</SelectTrigger>
									<SelectContent className="bg-[#222] border-slate-700">
										{filters.map((filter) => (
											<SelectItem
												value={filter.value}
												key={filter.value}
												className="focus:bg-[#333] focus:text-slate-300"
											>
												{filter.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select> */}

								<Select onValueChange={(value) => handleDropdownChange("statusOfDay", value)}>
									<SelectTrigger className="w-[150px] border-none bg-[#222]">
										<SelectValue placeholder="Status of Day" />
									</SelectTrigger>
									<SelectContent className="bg-[#222] border-slate-700">
										{GLOBAL_CONSTANTS.productivityLevels.map((item) => (
											<SelectItem
												value={item.value}
												key={item.value}
												className="text-white focus:bg-[#333] focus:text-slate-300"
											>
												{item.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
							<div className="w-full h-[.5px] bg-slate-600"></div>
							<div className="p-2 h-[60vh] overflow-auto">
								{/* here will be the list of tasks */}
								{Array.isArray(taskList) && taskList.length > 0 ? (
									taskList
										.toReversed()
										.map((task) => (
											<Task
												key={task?.title}
												id={task?._id}
												title={task?.title}
												description={task?.description}
												status={task?.status}
												category={task?.category}
												onTaskUpdate={handleTaskUpdate}
												onDelete={handleTaskDelete}
											/>
										))
								) : (
									<div className="flex justify-center items-center h-full text-slate-400">
										<p>No tasks available!</p>
									</div>
								)}
							</div>
							<div className="w-full h-[.5px] bg-slate-600"></div>
							<div className="p-2 flex justify-end items-center">
								<Button
									className={"bg-sky-600 hover:bg-sky-700"}
									onClick={() => setShowNewTask(true)}
								>
									Add new Task
								</Button>
							</div>
						</div>
					</div>
				</div>
			)}
			{/* Modal Container */}
			{showNewTask && <NewTask onClose={() => setShowNewTask(false)} onSubmit={createNewTask} />}
		</div>
	);
};

export default TaskDashboard;

import { DatePicker } from "@/components/ui/date-picker";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft } from "lucide-react";
import Task from "@/app/components/Task";
import NewTask from "@/app/components/NewTask";
import { useRestSecurityClient } from "@/app/hooks/securityClient";
import Loading from "@/app/components/LoadingSpinner";

const TaskDashboard = () => {
	const [date, setDate] = useState(new Date());
	const [taskList, setTaskList] = useState([]);
	const [selectedFilters, setSelectedFilters] = useState({});
	const [showNewTask, setShowNewTask] = useState(false);
	const restClient = useRestSecurityClient();
	const [isLoading, setIsLoading] = useState(false);

	const filters = [
		{ label: "Productive", value: "productive" },
		{ label: "Super Productive", value: "super productive" },
	];

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
	const getTasks = async (date="2025-04-01", userId="user123" ) => {
		try{ 
			if (!date || !userId) { // This will work when we remove default parameter values.
				return;
			}
			setIsLoading(true);
			const response = await restClient.get(`/tasks/?date=${date}&userId=${userId}`);
			setTaskList(response?.result)
		}
		catch(error){
			console.log(error)
		}
		finally{ 
			setIsLoading(false);
		}
	};

	const createNewTask = async (inputData) => {
		try{ 
			inputData.userId = "user123";
			return await restClient.post(`/tasks/create`, inputData);
		}
		catch(error){
			console.log(error)
		}
		finally{  
			setShowNewTask(false); // Come to task list view
			const dateInRequiredFormat = new Date(date).toISOString().split("T")[0];
			getTasks(dateInRequiredFormat);
		}
		
	};

	useEffect(()=> { 
		const dateInRequiredFormat = new Date(date).toISOString().split("T")[0];
		getTasks(dateInRequiredFormat);
	}, [date])

	return (
		<div className="w-100 h-full flex items-center justify-center p-2">
			{isLoading && <Loading />}
			{showNewTask ? (
				<NewTask onClose={() => setShowNewTask(false)} onSubmit={createNewTask} />
			) : (
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
							<div className="p-2 flex justify-between items-center">
								<Select onValueChange={(value) => handleDropdownChange("filter", value)}>
									<SelectTrigger className="w-[150px]">
										<SelectValue placeholder="Filters" />
									</SelectTrigger>
									<SelectContent>
										{filters.map((filter) => (
											<SelectItem value={filter.value} key={filter.value}>
												{filter.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>

								<Select onValueChange={(value) => handleDropdownChange("statusOfDay", value)}>
									<SelectTrigger className="w-[150px]">
										<SelectValue placeholder="Status of Day" />
									</SelectTrigger>
									<SelectContent>
										{filters.map((filter) => (
											<SelectItem value={filter.value} key={filter.value}>
												{filter.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
							<div className="w-full h-[.5px] bg-slate-600"></div>
							<div className="p-2 h-[60vh] overflow-auto">
								{/* here will be the list of tasks */}
								{Array.isArray(taskList) && taskList.length > 0 ? taskList.map((task) => (
									<Task
										key={task?.title}
										title={task?.title}
										description={task?.description}
										status={task?.status}
									/>
								)): <div className="flex justify-center items-center h-full text-slate-400"><p>No tasks available!</p></div>}
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
			{/* Add New Task modal */}
		</div>
	);
};

export default TaskDashboard;

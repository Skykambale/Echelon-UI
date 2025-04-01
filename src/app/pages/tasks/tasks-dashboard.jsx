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
	const getTasks = async () => {
		setIsLoading(true);
		await restClient.get(`/tasks/?date=2025-03-31&day=""&statusOfDay=""&userId=user_12345`);
		setIsLoading(false);
	};

	const createNewTask = async (inputData) => {
		inputData.userId = "user_12345";
		restClient.post(`/tasks/create`, inputData);
	};
	useEffect(() => {
		getTasks();
	}, []);
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
								{tasks.map((task) => (
									<Task
										key={task.title}
										title={task.title}
										description={task.description}
										status={task.status}
									/>
								))}
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

const tasks = [
	{
		title: "Task 1",
		description: "Description 1",
		status: "inProgress",
	},
	{
		title: "Task 2",
		description: "Description 2",
		status: "done",
	},
	{
		title: "Task 3",
		description: "Description 3",
		status: "inProgress",
	},
	{
		title: "Task 4",
		description: "Description 4",
		status: "todo",
	},
	{
		title: "Task 5",
		description: "Description 5",
		status: "done",
	},
	{
		title: "Task 6",
		description: "Description 6",
		status: "inProgress",
	},
];

import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";
import { X, RefreshCw, Edit, Check, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { useRestSecurityClient } from "@/app/hooks/securityClient";
import { useAuth } from "@clerk/clerk-react";
import Loading from "@/app/components/LoadingSpinner";

const RoadmapDetails = ({ roadmapData = null }) => {
	const { id } = useParams();
	const [data, setRoadmapData] = useState(roadmapData);
	const [expandedStep, setExpandedStep] = useState(null);
	const [isLoading, setIsLoading] = useState(!data);
	const restClient = useRestSecurityClient();
	const { userId } = useAuth(); // ✅ Fix: Use destructuring to avoid undefined

	useEffect(() => {
		const fetchRoadmapDetails = async () => {
			if (!id || roadmapData) return;
			try {
				setIsLoading(true);
				const response = await restClient.get(`/api/roadmap/${userId}/${id}`);
				if (response?.result) setRoadmapData(response.result);
			} catch (err) {
				console.error("Error fetching roadmap details:", err);
			} finally {
				setIsLoading(false);
			}
		};
		// fetchRoadmapDetails();
	}, [id, roadmapData, userId]);

	const toggleStep = (index) => {
		setExpandedStep((prev) => (prev === index ? null : index));
	};

	const handleCancel = () => console.log("Cancel action");
	const handleRecreate = () => console.log("Recreate action");
	const handleEdit = () => console.log("Edit action");
	const handleConfirm = () => console.log("Confirm action");

	useEffect(() => {
		console.log(data);
		console.log(Object.entries(data.plan));
	}, []);

	return (
		<div className="p-4 w-full h-full mx-auto relative">
			{isLoading && <Loading />}
			{/* Top Navigation */}
			<div className="flex justify-between items-center border-b border-slate-600 pb-6 px-2">
				<div className="flex-col flex items-start space-y-2 lg:items-center lg:flex-row lg:space-y-0 lg:space-x-4">
					<h1 className="text-base lg:text-xl font-medium text-slate-200">
						{data?.title || "Loading..."}
					</h1>
					{data?.level && (
						<Badge className="bg-purple-500/20 text-purple-300 text-xs rounded-md px-2 py-0.5 border-none">
							{data.level}
						</Badge>
					)}
				</div>
				{data && (
					<div className="text-sm text-gray-400 flex flex-col lg:flex-row gap-1 lg:gap-2">
						{data.monthsAllocated && <span>{data.monthsAllocated} months •</span>}
						{data.hoursPerDay && <span>{data.hoursPerDay} hrs/day</span>}
					</div>
				)}
			</div>

			{/* Content */}
			{isLoading ? (
				<div className="flex justify-center items-center h-[75dvh] lg:h-[80dvh]">
					<p className="text-sm text-gray-400">Loading roadmap details...</p>
				</div>
			) : data?.isFeasible ? (
				<div className="px-4 py-4 overflow-y-auto h-[75dvh] lg:h-[80dvh]">
					<h2 className="text-lg font-medium text-gray-400 mb-6">Steps</h2>
					<div className="space-y-1">
						{Array.isArray(data.plan) &&
							data.plan.map(({ date, topic, tasks }, index) => (
								<div key={date} className="border-l-2 border-gray-800 relative pl-8 pb-6">
									<div
										className="flex items-center cursor-pointer group"
										onClick={() => toggleStep(index)}
									>
										<div className="absolute -left-[17px] w-8 h-8 rounded-full bg-gray-800 border-2 border-gray-700 group-hover:border-purple-500 flex items-center justify-center">
											<span className="text-xs text-gray-400 group-hover:text-purple-400">
												{index + 1}
											</span>
										</div>
										<div className="w-full flex justify-between text-white text-sm lg:text-base group-hover:text-purple-400">
											<span>{topic} </span>
											<span>{new Date(date).toDateString()}</span>
										</div>
									</div>

									{expandedStep === index && (
										<div className="mt-4 ml-4 space-y-3 text-sm text-gray-400">
											{Array.isArray(tasks) &&
												tasks.map((topic, topicIndex) => (
													<div
														className="flex items-center space-x-2"
														key={topicIndex}
													>
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
					<p className="text-sm text-gray-400">
						{data?.reason || "Oops! Roadmap details not available!"}
					</p>
				</div>
			)}

			{/* Bottom Action Bar */}
			<div className="absolute bottom-0 left-0 right-0 px-6">
				{id ? (
					// If id is present, which means it is a saved roadmap which can be deleted and doesn't need other actions.
					<div className="py-4 flex justify-end items-center space-x-3">
						<Button
							onClick={handleCancel}
							className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
						>
							<Trash2 />
							<span className="hidden lg:inline">Delete</span>
						</Button>
					</div>
				) : (
					<div className="py-4 flex justify-end items-center space-x-3">
						<Button onClick={handleCancel} variant="ghost">
							<X />
							<span className="hidden lg:inline">Cancel</span>
						</Button>
						<Button onClick={handleRecreate} variant="ghost" disabled>
							<RefreshCw />
							<span className="hidden lg:inline">Recreate</span>
						</Button>
						<Button onClick={handleEdit} variant="ghost" disabled>
							<Edit />
							<span className="hidden lg:inline">Edit</span>
						</Button>
						<Button
							onClick={handleConfirm}
							className="bg-purple-600 hover:bg-purple-700 text-white ml-2"
						>
							<Check />
							<span className="hidden lg:inline">Confirm</span>
						</Button>
					</div>
				)}
			</div>
		</div>
	);
};

RoadmapDetails.propTypes = {
	roadmapData: PropTypes.shape({
		id: PropTypes.string,
		title: PropTypes.string,
		level: PropTypes.string,
		months: PropTypes.number,
		hoursPerDay: PropTypes.number,
		isFeasible: PropTypes.bool,
		plan: PropTypes.object,
		reason: PropTypes.string,
	}),
};

export default RoadmapDetails;

const demoResponse = {
	isFeasible: true,
	reason: "Learning React fundamentals and building basic projects within 3 months with 2 hours per day is achievable, provided you stay consistent and focused. The plan below outlines a structured learning path covering essential concepts and practical application.",
	monthsAllocated: 3,
	hoursPerDay: 2,
	title: "Learn React",
	plan: [
		{
			date: "2025-04-09",
			topic: "Introduction to React",
			tasks: [
				"What is React? History and Background",
				"Setting up a Development Environment (Node.js, npm/yarn, Create React App)",
				"Creating your first React app",
				"Understanding JSX",
			],
		},
		{
			date: "2025-04-10",
			topic: "React Components",
			tasks: [
				"Functional vs Class Components",
				"Understanding Props",
				"Passing data from parent to child",
				"Creating reusable components",
			],
		},
		{
			date: "2025-04-11",
			topic: "React State",
			tasks: [
				"What is state? Why use state?",
				"Using the useState Hook (Functional Components)",
				"Updating state and triggering re-renders",
				"Introduction to Immutable Data Structures",
				"Building a simple counter component",
			],
		},
		{
			date: "2025-04-14",
			topic: "Handling Events in React",
			tasks: [
				"Understanding event handling in React",
				"Passing event handlers as props",
				"Accessing event objects",
				"Binding event handlers correctly",
			],
		},
		{
			date: "2025-04-15",
			topic: "Conditional Rendering",
			tasks: [
				"Using if/else statements in JSX",
				"Using ternary operators",
				"Short-circuit evaluation (&&)",
				"Rendering lists conditionally",
			],
		},
		{
			date: "2025-04-16",
			topic: "Lists and Keys",
			tasks: [
				"Rendering lists of data",
				"The importance of keys",
				"Using map() to iterate over arrays",
				"Dynamic list updates",
			],
		},
		{
			date: "2025-04-17",
			topic: "Forms in React",
			tasks: [
				"Controlled vs Uncontrolled Components",
				"Handling form submissions",
				"Updating state based on form input",
				"Form validation",
			],
		},
		{
			date: "2025-04-18",
			topic: "Project 1: Simple Todo List App",
			tasks: [
				"Plan the application's structure",
				"Implement adding new tasks",
				"Implement deleting existing tasks",
				"Implement marking tasks as completed",
			],
		},
		{
			date: "2025-04-21",
			topic: "React Lifecycle Methods (Class Components - for understanding legacy code)",
			tasks: [
				"Understanding Component Lifecycle Phases",
				"componentDidMount",
				"componentDidUpdate",
				"componentWillUnmount",
			],
		},
		{
			date: "2025-04-22",
			topic: "React Hooks (useEffect)",
			tasks: [
				"What is useEffect?  Why use it?",
				"Using useEffect for side effects",
				"Cleaning up effects",
				"useEffect with dependencies",
			],
		},
		{
			date: "2025-04-23",
			topic: "Context API",
			tasks: [
				"Understanding the Context API",
				"Creating a context provider",
				"Consuming context values",
				"Using Context for theming or user authentication",
			],
		},
		{
			date: "2025-04-24",
			topic: "Higher-Order Components (HOCs)",
			tasks: ["Understanding HOCs", "Creating a simple HOC", "Use cases for HOCs"],
		},
		{
			date: "2025-04-25",
			topic: "React Router",
			tasks: [
				"Setting up React Router",
				"Defining routes",
				"Using Link components",
				"Implementing navigation",
				"Passing parameters in routes",
			],
		},
		{
			date: "2025-04-28",
			topic: "Project 2: Building a Simple Blog with React Router",
			tasks: [
				"Setting up the basic structure and navigation",
				"Creating components for posts and post listings",
				"Implementing routing for individual posts",
			],
		},
		{
			date: "2025-04-29",
			topic: "Making API Calls with useEffect and Fetch",
			tasks: [
				"Understanding the fetch API",
				"Making GET requests",
				"Handling loading and error states",
				"Displaying data from an API",
			],
		},
		{
			date: "2025-04-30",
			topic: "State Management with Redux (Introduction)",
			tasks: [
				"Understanding the Redux principles (Store, Actions, Reducers)",
				"Setting up Redux in your React application",
				"Connecting components to the Redux store",
			],
		},
		{
			date: "2025-05-01",
			topic: "Redux (Actions and Reducers)",
			tasks: [
				"Creating Redux actions",
				"Writing Redux reducers",
				"Dispatching actions to update the store",
				"Connecting React components to the Redux store",
			],
		},
		{
			date: "2025-05-02",
			topic: "Redux Middleware (Thunk)",
			tasks: [
				"Understanding Redux middleware",
				"Using Redux Thunk for asynchronous actions",
				"Fetching data from an API using Thunk",
				"Handling loading and error states in Redux",
			],
		},
		{
			date: "2025-05-05",
			topic: "Project 3: Building a Simple Data Fetching App with Redux",
			tasks: [
				"Creating actions and reducers for fetching data",
				"Dispatching actions to fetch data from an API",
				"Displaying the fetched data in a React component",
				"Handling loading and error states",
			],
		},
		{
			date: "2025-05-06",
			topic: "Testing React Components (Jest and React Testing Library)",
			tasks: [
				"Introduction to testing React components",
				"Setting up Jest and React Testing Library",
				"Writing unit tests for React components",
				"Testing component interactions and rendering",
			],
		},
		{
			date: "2025-05-07",
			topic: "Advanced React Patterns",
			tasks: ["Render Props", "Compound Components", "Prop Types"],
		},
		{
			date: "2025-05-08",
			topic: "Performance Optimization",
			tasks: [
				"Code Splitting",
				"Memoization (React.memo, useMemo, useCallback)",
				"Virtualization (react-window)",
				"Profiling React Applications",
			],
		},
		{
			date: "2025-05-09",
			topic: "TypeScript with React (Introduction)",
			tasks: [
				"Setting up TypeScript in a React project",
				"Defining types for props and state",
				"Using TypeScript with React Hooks",
				"Benefits of using TypeScript in React",
			],
		},
		{
			date: "2025-05-12",
			topic: "GraphQL with React (Introduction)",
			tasks: [
				"Understanding GraphQL",
				"Setting up a GraphQL client (Apollo Client or Relay)",
				"Querying data with GraphQL",
				"Mutations and Subscriptions",
			],
		},
		{
			date: "2025-05-13",
			topic: "Next.js (Introduction)",
			tasks: [
				"What is Next.js?  Why use it?",
				"Setting up a Next.js project",
				"Understanding pages and routing",
				"Data fetching in Next.js (getServerSideProps, getStaticProps)",
				"Building a simple Next.js application",
			],
		},
		{
			date: "2025-05-14",
			topic: "Gatsby (Introduction)",
			tasks: [
				"What is Gatsby?  Why use it?",
				"Setting up a Gatsby project",
				"Understanding pages and components",
				"Using GraphQL to fetch data in Gatsby",
				"Building a simple Gatsby website",
			],
		},
		{
			date: "2025-05-15",
			topic: "Styled Components/Material UI/Ant Design",
			tasks: [
				"Choosing a CSS-in-JS library or component library",
				"Styling React components with Styled Components/Material UI/Ant Design",
				"Customizing components and themes",
			],
		},
		{
			date: "2025-05-16",
			topic: "Project 4: Choose a Project (Personal Portfolio, E-commerce Mini-Project, or Something Else)",
			tasks: [
				"Plan the project architecture",
				"Identify required components and dependencies",
				"Start building the basic structure",
			],
		},
		{
			date: "2025-05-19",
			topic: "Project 4: Continued",
			tasks: [
				"Develop the core features",
				"Integrate with any necessary APIs",
				"Implement UI components",
			],
		},
		{
			date: "2025-05-20",
			topic: "Project 4: Continued",
			tasks: [
				"Implement state management (if needed)",
				"Work on routing and navigation",
				"Handle user interactions",
			],
		},
		{
			date: "2025-05-21",
			topic: "Project 4: Continued",
			tasks: [
				"Write unit tests for key components",
				"Optimize performance",
				"Refactor code for readability",
			],
		},
		{
			date: "2025-05-22",
			topic: "Project 4: Continued",
			tasks: ["Polish the user interface", "Fix any bugs or issues", "Add documentation"],
		},
		{
			date: "2025-05-23",
			topic: "Project 4: Final Touches",
			tasks: [
				"Deploy the project to a platform like Netlify or Vercel",
				"Test the deployed application",
				"Share the project with others",
			],
		},
		{
			date: "2025-05-26",
			topic: "Review & Practice",
			tasks: [
				"Go over the concepts learned so far.",
				"Practice coding problems.",
				"Implement features in your project.",
			],
		},
		{
			date: "2025-05-27",
			topic: "Free Day: Explore advanced topics of your choice",
			tasks: ["Explore a topic of your interest"],
		},
		{
			date: "2025-05-28",
			topic: "Free Day: Explore advanced topics of your choice",
			tasks: ["Explore a topic of your interest"],
		},
		{
			date: "2025-05-29",
			topic: "Free Day: Explore advanced topics of your choice",
			tasks: ["Explore a topic of your interest"],
		},
		{
			date: "2025-05-30",
			topic: "Free Day: Explore advanced topics of your choice",
			tasks: ["Explore a topic of your interest"],
		},
		{
			date: "2025-06-02",
			topic: "Free Day: Explore advanced topics of your choice",
			tasks: ["Explore a topic of your interest"],
		},
		{
			date: "2025-06-03",
			topic: "Free Day: Explore advanced topics of your choice",
			tasks: ["Explore a topic of your interest"],
		},
		{
			date: "2025-06-04",
			topic: "Free Day: Explore advanced topics of your choice",
			tasks: ["Explore a topic of your interest"],
		},
		{
			date: "2025-06-05",
			topic: "Free Day: Explore advanced topics of your choice",
			tasks: ["Explore a topic of your interest"],
		},
		{
			date: "2025-06-06",
			topic: "Free Day: Explore advanced topics of your choice",
			tasks: ["Explore a topic of your interest"],
		},
		{
			date: "2025-06-09",
			topic: "Free Day: Explore advanced topics of your choice",
			tasks: ["Explore a topic of your interest"],
		},
		{
			date: "2025-06-10",
			topic: "Free Day: Explore advanced topics of your choice",
			tasks: ["Explore a topic of your interest"],
		},
		{
			date: "2025-06-11",
			topic: "Free Day: Explore advanced topics of your choice",
			tasks: ["Explore a topic of your interest"],
		},
		{
			date: "2025-06-12",
			topic: "Free Day: Explore advanced topics of your choice",
			tasks: ["Explore a topic of your interest"],
		},
		{
			date: "2025-06-13",
			topic: "Free Day: Explore advanced topics of your choice",
			tasks: ["Explore a topic of your interest"],
		},
		{
			date: "2025-06-16",
			topic: "Free Day: Explore advanced topics of your choice",
			tasks: ["Explore a topic of your interest"],
		},
		{
			date: "2025-06-17",
			topic: "Free Day: Explore advanced topics of your choice",
			tasks: ["Explore a topic of your interest"],
		},
		{
			date: "2025-06-18",
			topic: "Free Day: Explore advanced topics of your choice",
			tasks: ["Explore a topic of your interest"],
		},
		{
			date: "2025-06-19",
			topic: "Free Day: Explore advanced topics of your choice",
			tasks: ["Explore a topic of your interest"],
		},
		{
			date: "2025-06-20",
			topic: "Free Day: Explore advanced topics of your choice",
			tasks: ["Explore a topic of your interest"],
		},
		{
			date: "2025-06-23",
			topic: "Free Day: Explore advanced topics of your choice",
			tasks: ["Explore a topic of your interest"],
		},
		{
			date: "2025-06-24",
			topic: "Free Day: Explore advanced topics of your choice",
			tasks: ["Explore a topic of your interest"],
		},
		{
			date: "2025-06-25",
			topic: "Free Day: Explore advanced topics of your choice",
			tasks: ["Explore a topic of your interest"],
		},
		{
			date: "2025-06-26",
			topic: "Free Day: Explore advanced topics of your choice",
			tasks: ["Explore a topic of your interest"],
		},
		{
			date: "2025-06-27",
			topic: "Free Day: Explore advanced topics of your choice",
			tasks: ["Explore a topic of your interest"],
		},
		{
			date: "2025-06-30",
			topic: "Free Day: Explore advanced topics of your choice",
			tasks: ["Explore a topic of your interest"],
		},
		{
			date: "2025-07-01",
			topic: "Free Day: Explore advanced topics of your choice",
			tasks: ["Explore a topic of your interest"],
		},
		{
			date: "2025-07-02",
			topic: "Free Day: Explore advanced topics of your choice",
			tasks: ["Explore a topic of your interest"],
		},
		{
			date: "2025-07-03",
			topic: "Free Day: Explore advanced topics of your choice",
			tasks: ["Explore a topic of your interest"],
		},
		{
			date: "2025-07-04",
			topic: "Free Day: Explore advanced topics of your choice",
			tasks: ["Explore a topic of your interest"],
		},
		{
			date: "2025-07-07",
			topic: "Free Day: Explore advanced topics of your choice",
			tasks: ["Explore a topic of your interest"],
		},
		{
			date: "2025-07-08",
			topic: "Free Day: Explore advanced topics of your choice",
			tasks: ["Explore a topic of your interest"],
		},
	],
};

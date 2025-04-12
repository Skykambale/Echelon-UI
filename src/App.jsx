import TaskDashboard from "./app/pages/tasks/tasks-dashboard";
import RootLayout from "./app/pages/root-container/RootLayout";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import SignInPage from "./app/auth/signin";
import VisualizeLayout from "./app/pages/charts/visualize-layout";
import { Toaster } from "./components/ui/toaster";
import AIPage from "./app/pages/ai";
import RoadmapDetails from "./app/pages/ai/RoadmapDetails";
import Hero from "./app/pages/home";
function App() {
	// Check if user is logged in, if not redirect to login page.
	const ProtectedRoute = ({ children }) => {
		const { isSignedIn, isLoaded } = useUser();

		if (isLoaded && !isSignedIn) {
			return <Navigate to="/signin" />;
		}

		return children;
	};

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/signin" element={<SignInPage />}></Route>
					<Route path="/" element={<Hero />}></Route>

					<Route
						path="/"
						element={
							<ProtectedRoute>
								<RootLayout />
							</ProtectedRoute>
						}
					>
						<Route path="tasks" element={<TaskDashboard />}></Route>
						<Route path="visualize" element={<VisualizeLayout />}></Route>
						<Route path="ai" element={<AIPage />}></Route>
						{/* AI sub routes */}
						<Route path="ai/roadmap/:id" element={<RoadmapDetails />}></Route>
					</Route>
				</Routes>
			</BrowserRouter>
			<Toaster />
		</>
	);
}

export default App;

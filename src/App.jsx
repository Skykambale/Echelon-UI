import TaskDashboard from "./app/pages/tasks/tasks-dashboard";
import RootLayout from "./app/pages/root-container/RootLayout";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import NewTask from "./app/components/NewTask";
import { useUser } from "@clerk/clerk-react";
import SignInPage from "./app/auth/signin";
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
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignInPage />}></Route>

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <RootLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<TaskDashboard />}></Route>
          <Route path="new-task" element={<NewTask />}></Route>
          <Route path="ai" element={<div />}></Route>
          <Route path="charts" element={<div />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

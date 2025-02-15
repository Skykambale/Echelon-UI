import TaskDashboard from "./app/pages/tasks/tasks-dashboard";
import RootLayout from "./app/pages/root-container/RootLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NewTask from "./app/components/NewTask";
import { SignedOut, SignInButton } from "@clerk/clerk-react";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/home"
          element={
            <SignedOut>
              <div>
                {" "}
                Login page <SignInButton />
              </div>
            </SignedOut>
          }
        ></Route>

        <Route path="/" element={<RootLayout />}>
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

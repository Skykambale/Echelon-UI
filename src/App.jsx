import TaskDashboard from "./app/pages/tasks/tasks-dashboard";
import RootLayout from "./app/pages/root-container/RootLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NewTask from "./app/components/NewTask";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<TaskDashboard />}></Route>
          <Route path="new-task" element={<NewTask />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

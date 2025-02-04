import TaskDashboard from "./app/pages/tasks/tasks-dashboard";
import RootLayout from "./app/pages/root-container/RootLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<TaskDashboard />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

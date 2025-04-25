import "antd/dist/reset.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomePage />} path="/" />
        <Route element={<DashboardPage />} path="/dashboard" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

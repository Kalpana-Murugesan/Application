import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/loginPage";
import DashboardPage from "./pages/dashboard";
import CheckIn from "./pages/checkIn";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path= "/register" element={<RegisterPage/>} />
            <Route path= "/login" element={<LoginPage/>} />
            <Route path= "/dashboard" element={<DashboardPage/>} />
            <Route path= "/checkIn" element={<CheckIn/>} />
            <Route path= "/home" element={<h1>Home</h1>} />
          </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;

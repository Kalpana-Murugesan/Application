import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/loginPage";
import DashboardPage from "./pages/dashboard";
import Details from "./pages/details";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path= "/register" element={<RegisterPage/>} />
            <Route path= "/login" element={<LoginPage/>} />
            <Route path= "/dashboard" element={<DashboardPage/>} />
            <Route path= "/Details" element={<Details/>} />
          </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;

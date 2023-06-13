import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/loginPage";
import DashboardPage from "./pages/dashboard";
import Details from "./pages/details";
import Home from "./pages/home";
import AdminRegisterPage from "../src/adminpages/AdminRegisterPage";
import Adminportal from './adminpages/Adminportal';
import AdminLoginPage from "./adminpages/AdminLoginPage";

import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path= "/adminregister" element={<AdminRegisterPage/>} />
            <Route path= "/adminlogin" element={<AdminLoginPage/>} />
            <Route path= "/adminportal" element={<Adminportal/>} />
            <Route path= "/register" element={<RegisterPage/>} />
            <Route path= "/login" element={<LoginPage/>} />
            <Route path= "/dashboard" element={<DashboardPage/>} />
            <Route path= "/Details" element={<Details/>} />
            <Route path= "/" element={<Home/>} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

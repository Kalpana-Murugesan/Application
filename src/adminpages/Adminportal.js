import { useNavigate, Navigate, Link } from "react-router-dom";
import { useState } from 'react'
import axios from 'axios';
import NavBar from "../components/NavBar";
import { logout, isAuthenticated } from "../services/Auth";


export default function Adminportal () {
    const navigate = useNavigate();
    const logoutUser = () => {
        logout();
        navigate('/adminlogin');
    }
    
}

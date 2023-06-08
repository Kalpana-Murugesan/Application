import React from 'react';
import NavBar from "../components/NavBar";
import logo from '../img/Logo.png'; // gives image path



export default function Home() {
    return (
        <div className="home">
            <NavBar />
            <p align = 'center'>
            <img src={logo} alt="Sensiple logo" />
            </p>  
        </div>
    )
}

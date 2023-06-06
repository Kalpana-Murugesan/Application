import { useNavigate, Navigate } from "react-router-dom";
import { useState } from 'react'
import axios from 'axios';
import NavBar from "../components/NavBar";
import { logout, isAuthenticated } from "../services/Auth";

export default function DashboardPage() {
    const navigate = useNavigate();
    const logoutUser = () => {
        logout();
        navigate('/login');
    }

    const initialStateErrors = {
        EmpId: { required: false }
    };
    const [errors, setErrors] = useState(initialStateErrors)

    const handleSubmit = (event) => {
        const currentTime = new Date()
        const date = currentTime.getDate() + ":" + currentTime.getUTCDate() + ":" + currentTime.getFullYear();
        var Time = currentTime.getHours() + ':' + currentTime.getMinutes() + ':' + currentTime.getSeconds();
        console.log(Date);
        event.preventDefault();
        let errors = initialStateErrors;
        const data = { ...userData, date, Time }
        if (userData.EmpId === '') {
            errors.EmpId.required = true;
        }
        setErrors({ ...errors })
        if (userData.EmpId !== '') {
            axios.post('http://localhost:5000/api/users', data)
                .then((response) => {
                    console.log(response);
                    console.log('User logged:', response.data);
                    // Perform any necessary actions after successful user creation
                })
                .catch((error) => {
                    console.error('Error creating user:', error);
                    // Handle error scenario
                });
        }
        // window.location.reload();
    }
    // var Timestamp = new Date()
    // var currentTime = Timestamp.getHours() + ':' + Timestamp.getMinutes() + ':' + Timestamp.getSeconds();
    // console.log(Timestamp);
    // console.log(currentTime);


    const [userData, setUserData] = useState({
        EmpId: "",
        Date: '',
    });
    const handleInputchange = (event) => {
        setUserData({
            ...userData, [event.target.name]: event.target.value,
        });
    };
    if (!isAuthenticated()) {
        // redirect page
        return <Navigate to="/login" />
    }

    return (
        <div>
            <NavBar logoutUser={logoutUser} />

            <section className="login-block">
                <div className="container">
                    <div className="row ">
                        <div className="col login-sec">
                            <h2 className="text-center">Sensiple Employee Portal</h2>
                            <form onSubmit={handleSubmit} className="login-form" action="">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1" className="text-uppercase">Employee ID</label>
                                    <input type="text" name="EmpId" className="form-control" value={userData.EmpId} onChange={handleInputchange} placeholder="Enter your Id" />
                                    {errors.EmpId.required ?
                                        (<span className="text-danger" >
                                            Id is required.
                                        </span>) : null
                                    }
                                    <br />
                                    <p align='center'>
                                        <input type="submit" className="btn btn-Login" value="Submit" />
                                        <br />
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}



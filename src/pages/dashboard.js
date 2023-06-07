import { useNavigate, Navigate, Link } from "react-router-dom";
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
    // error handling
    const initialStateErrors = {
        EmpId: { required: false }
    };
    const [errors, setErrors] = useState(initialStateErrors)
    // success message
    const [isSubmitted, setIsSubmitted] = useState(false);

    const HandleSubmit = (event) => {
        var date = new Date();
        var dd = String(date.getDate()).padStart(2, '0');
        var mm = String(date.getMonth() + 1).padStart(2, '0');
        var yyyy = date.getFullYear();
        date = mm + '-' + dd + '-' + yyyy;
        const currentTime = new Date()
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
            // Db Hit
            axios.post('http://localhost:5000/api/users', data)
                .then((response) => {
                    setIsSubmitted(true);
                    console.log(response);
                    console.log('User logged:', response.data);
                    // Perform any necessary actions after successful user creation
                })
                .catch((error) => {
                    console.error('Error creating user:', error);
                    // Handle error scenario
                });
            return data;
        }

        // window.location.reload();
    }

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
                            <form onSubmit={HandleSubmit} className="login-form" action="">
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
                                        <input type="submit" className="btn btn-Login" value="Submit" /><Link to='/details' />
                                        <br />
                                    </p>
                                </div>
                            </form>
                            {isSubmitted ? (<p>Data submitted successfully!</p>) : null
                            }
                        </div>

                    </div>
                </div>
            </section>
        </div>
    )
}



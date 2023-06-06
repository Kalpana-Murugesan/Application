import { useNavigate, Navigate } from "react-router-dom";
import { useState } from 'react'
import axios from 'axios';
import NavBar from "../components/NavBar"; 
import { logout, isAuthenticated } from "../services/Auth";

export default function DashboardPage(){
    const navigate =useNavigate();
    const logoutUser = ()=>{
        logout();
        navigate('/login');
    }
   
    
    const initialStateErrors = {
        EmpId:{required:false}
     };
     const [errors,setErrors] = useState(initialStateErrors)

     const handleSubmit = (event)=>{
        event.preventDefault();
        let errors = initialStateErrors;
        if (userData.EmpId === '') {
           errors.EmpId.required =true;
        }
        setErrors({...errors})
    }
      
     const [userData,setUserData] = useState({
        EmpId:"",
     });
     const handleInput = (event)=>{
        setUserData({...userData, [event.target.name]: event.target.value,
    });
};  
   if(userData.EmpId !== '') {
     axios.post('http://localhost:5000/api/users', userData)
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
   const timestamp = (event) => {
    var today = new Date()
    var currentTime = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    console.log(today);
    console.log(currentTime);
}
      if (!isAuthenticated()){
        // redirect page
        return <Navigate to="/login"/>
     }
     console.log(userData.EmpId);

    return(
        <div>
            <NavBar logoutUser={logoutUser}/>

            <section className="login-block">
            <div className="container">
                <div className="row ">
                    <div className="col login-sec">
                        <h2 className="text-center">Sensiple Employee Portal</h2>
                        <form onSubmit = {handleSubmit} className="login-form" action="">
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1" className="text-uppercase">Employee ID</label>
                            <input type="EmpId"  name="EmpId"  value ={userData.EmpId} onChange={handleInput} placeholder="Enter your Id" />
                            {errors.EmpId.required?
                                    (<span className="text-danger" >
                                        Id is required.
                                    </span>):null
                                 } 
                                 <br/>
                                 <p align= 'center'>
                                 <button type="submit" onClick={timestamp}>submit</button>
                                 {/* <input type="submit" className="btn btn-Login"  value="Check In"/><br/><Link to ='/checkIn'/>
                                 <br/>
                                 <input type="submit" className="btn btn-Login"  value="Check Out"/><br/><Link to ='/checkIn'></Link>
                                 <br/> <input type="submit" className="btn btn-Login"  value="Details"/><Link to ='/register'></Link> */}
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



import { useState } from 'react'
import { LoginApi } from '../services/api';
import { userData } from '../services/storage';
import { isAuthenticated } from '../services/Auth';
import { Link, Navigate } from 'react-router-dom';

import './loginPage.css'
import NavBar from '../components/NavBar';
export default function LoginPage(){

    const initialStateErrors = {
        email:{required:false},
        password:{required:false},
        custom_error:null
     };
     const [errors,setErrors] = useState(initialStateErrors)
  
     const [loading,setloading] = useState (false)
     const handleSubmit = (event)=>{
        event.preventDefault();
        let errors = initialStateErrors;
        let loginerror = false;
        if (inputs.email === '') {
           errors.email.required =true;
           loginerror = true;
        }
        if (inputs.password === '') {
           errors.password.required =true;
           loginerror = true;
  
        }
        setErrors({...errors})
  
        if(!loginerror){
           setloading(true)
           // Api Request
           LoginApi(inputs).then((response)=>{
             userData(response.data.idToken);
           }).catch((err)=>{
            console.log(err);
            if( err.response.status === 400){
                setErrors({...errors,custom_error:'Invalid credentials!'})
                // ERR_BAD_REQUEST
            } else if( err.code === 'ERR_BAD_REQUEST')
                setErrors({...errors,custom_error:'Invalid credentials!'})

            //   if(err.response.data.error.message ==='EMAIL_EXISTS'){
            //      setErrors({...errors,custom_error:'Already this email has been registered!'})
            //   } else if(String(err.response.data.error.message).includes('WEAK_PASSWORD'))
            //      setErrors({...errors,custom_error:'Password should be at least 6 characters!'})
           }).finally(()=>{
              setloading(false)
           })
        }
     }
     const [inputs,setInputs] = useState({
        email:"",
        password:""
     })
     const handleInput = (event)=>{
        setInputs({...inputs,[event.target.name]:event.target.value})
     }
     if (isAuthenticated()){
        // redirect page
        return <Navigate to="/dashboard"/>
     }

    return(
        <div>
        <NavBar/>
        <section className="login-block">
            <div className="container">
                <div className="row ">
                    <div className="col login-sec">
                        <h2 className="text-center">Login Now</h2>
                        <form onSubmit = {handleSubmit} className="login-form" action="">
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1" className="text-uppercase">Email</label>
                            <input type="email"  className="form-control" onChange={handleInput} name="email"  id="" placeholder="email" />
                            { errors.email.required?
                                    (<span className="text-danger" >
                                        Email is required.
                                    </span>):null
                                 }
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1" className="text-uppercase">Password</label>
                            <input  className="form-control" type="password"  onChange= {handleInput} name="password" placeholder="password" id="" />
                            { errors.password.required?
                                    (<span className="text-danger" >
                                        Password is required.
                                    </span>):null
                                 }
                        </div>
                        <div className="form-group">
                              { errors.custom_error?
                                (<span className="text-danger" >
                                    <p>{errors.custom_error}</p>
                                </span>):null
                              }
                              { loading?
                                (<div className="text-center">
                                    <div className="spinner-border text-primary " role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>):null
                              }
                                <input type="submit" className="btn btn-login float-right" disabled ={loading} value="Login"/>
                            </div>
                        <div className="clearfix"></div>
                        <div className="form-group">
                        Create new account ? Please <Link to ='/register'>Register</Link>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
        </div>
    )
}
import React from 'react';
import NavBar from '../components/NavBar';

const Adminportal = () => {
    return (

        <div>
            <NavBar/>
            <input type="submit" className="btn btn-login float-right" value="Employee Details" />
            <input type="submit" className="btn btn-login float-right" value="Employee Attendance" />
        </div>


    );
};
export default Adminportal;

import axios from 'axios';
import React from 'react';

import {
  Link, Navigate, useNavigate
} from "react-router-dom";

import './Navbar.css';
// import axios from 'axios';

function Navbar(props) {

  console.log('props.userServerResp w Navbar', props.userServerResp)

  let navigate = useNavigate();


  function logOut(e) {

    e.preventDefault();

    let token = props.userServerResp?.jwt;

    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'x-auth-token': token
    }

    axios.put('http://www.localhost:8080/api/user/logout', {}, {'headers': headers})
    .then((response)=>{

      if (response.data.message === 'Succesfully Logged Out' ) {
        
        props.setUserServerResp(()=> {
          console.log('response in logOut() in Navbar', response.data.message);
          return null;
        })

        localStorage.setItem("localStorage.setItem in Logout () in Navbar", null);

        navigate("/signin");

      }

    })

    .catch((error)=>{
      console.error(error);
    })

  }

  return (
    <div className="Navbar">
      <ul className='TheList'>
        {props.userServerResp && <li><Link to="/" >Customers</Link></li>}
        {!props.userServerResp && <li><Link to="/signin">Sign In Page</Link></li>}
        {/* {!props.userServerResp && <li to="/signin"> Sign In Page</li>} */}
        {props.userServerResp && <li><Link to="/addcustomer">Add customer</Link></li>}
        {props.userServerResp && <li><Link onClick={logOut} to="/signin">Log out</Link></li>}
      </ul>
    </div>
  );
}

export default Navbar;
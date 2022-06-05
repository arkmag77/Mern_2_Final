import React, { useState, useEffect} from 'react';
import './SignIn.css';
import {
    Link, Navigate, useNavigate
  } from "react-router-dom";


import axios from 'axios';

function SignIn (props) {

    const [userNameMessage, setUserNameMessage] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');
    const [serverRespErr, setServerRespErr] = useState('');

    const inputUserName = React.useRef();
    const inputPassword = React.useRef();

    let navigate = useNavigate();

    const validate = (e) => {
        
        // console.log(`validate () w SignIn - wywołanie`)
        e.preventDefault();

        let errCounter = false;

        if (inputUserName.current.value.trim() === '') {

            errCounter = true;

            setUserNameMessage ('⚠ User name is required');

        } else if (inputUserName.current.value.trim().length <= 3)  {

            errCounter = true;
            
            setUserNameMessage ('⚠ User name  is too short, at least 4 char are required');

        } else {

            errCounter = false;

            setUserNameMessage ('');
        }

        if (inputPassword.current.value.trim() === '') {

            errCounter = true;

            setPasswordMessage('⚠ Password is required');
            
        } else {

            errCounter = false;

            setPasswordMessage('');
        }

        if (errCounter === false) {

            LogIn();

        }

    }

    const LogIn = () => {

        // console.log ('Login () w SignIn - wywołanie');

        let logedUser = {
            username: inputUserName.current.value,
            password: inputPassword.current.value,
            // ttl: 3600
        };

        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }

        axios.post('http://www.localhost:8080/api/user/login', 
        JSON.stringify(logedUser), 
        {'headers': headers})
        .then((response)=> {


            if (response.data.success === true) {
                
                props.setUserServerResp (response.data);

                navigate("/");

                localStorage.setItem("response.data localStorage.setItem in logIn() w SigIn ", JSON.stringify(response.data));
            }  
            
            if (response.data.success === false) {

                props.setUserServerResp (
                
                    console.log('userServerResp if response.data.success===flase in logIn() w SigIn ', response.data)

                );

                setServerRespErr ("⚠ User name and Password do not match");

                localStorage.setItem("userServerResp", null);


            }

        })

        .catch((err)=>{
            console.error(err);
            console.log(err);
            setServerRespErr (() => {

                return "" + err ;

            });
        });

    }


    return (

        <div className="SignIn">

            {/* {props.userServerResp && <Navigate to = "/" />} */}

            <h1>Sign In form</h1>
            <form onSubmit = {(e)=>{validate(e)}}>
                <fieldset>
                <label htmlFor="UserName">User Name</label> <br />
                    <input ref={inputUserName} name="UserName" type="text" placeholder="Enter User Name" /> <br />
                    <span className="UserNameMessage"> {userNameMessage} </span>
                </fieldset>

                <fieldset>
                    <label htmlFor="Password">Password</label> <br />
                    <input ref={inputPassword} name="Password" type="text" placeholder="Enter Password" /> <br />
                    <span className="PasswordMessage"> {passwordMessage} </span>
                </fieldset>

                <button type="submit"> Sign In</button>

                <fieldset>
                    <span className="ServerRespErr"> {/* {props.userServerResp.message} */} {serverRespErr} </span>
                </fieldset>

            </form>
    
        </div>

    );

}

export default SignIn;
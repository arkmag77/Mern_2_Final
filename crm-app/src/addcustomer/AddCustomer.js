import React, { useState, useEffect/* , useRef */ } from 'react';
import './AddCustomer.css';

import {
    Link, 
    useNavigate,
    useParams,
    Outlet,
  } from "react-router-dom";

import axios from 'axios';

function AddCustomer (props) {

    const [nameMessage, setNameMessage] = useState('');
    const [streetMessage, setStreetMessage] = useState('');
    const [zipcodeMessage, setZipcodeMessage] = useState('');
    const [cityMessage, setCityMessage] = useState('');
    const [nipMessage, setNipMessage] = useState('');
    const [serverResponseErr, setServerResponseErr] = useState('');
    
    // let [cityMessage, setCityMessage] = useState('');
    // let [nipMessage, setNipMessage] = useState('');

    const [serverRespErr, setServerRespErr] = useState('');

    const inputName = React.useRef();
    const inputStreet = React.useRef();
    // const inputNumber = React.useRef();
    const inputZipcode = React.useRef();
    const inputCity = React.useRef();
    const inputNip = React.useRef();

    let navigate = useNavigate();

    const validate = (e) => {

        e.preventDefault();
        console.log('funkcja validate (e) w  AddCustomer wywołanie');

        let nameMessage;
        let streetMessage;
        let zipcodeMessage;
        let cityMessage;
        let nipMessage;

        let errNameCounter = 0;
        let errStreetCounter = 0;
        let errZipcodeCounter = 0;
        let errCityCounter = 0;
        let errNipCounter = 0;

        if (inputName.current.value.trim() === '') {

            errNameCounter++;

            setNameMessage (() => {
                
                return nameMessage = '⚠ Customer name is required';

            });
        } else if (inputName.current.value.trim().length < 5)  {

            errNameCounter++;
    
            setNameMessage (() => {

                return nameMessage = '⚠ Customer name is too short, at least 5 characters are required';
    
            });      

        } else {

            errNameCounter=0;
    
            setNameMessage (() => {

                return nameMessage = '';
    
            });
        }

        if (inputStreet.current.value.trim() === '') {

            errStreetCounter++;

            setStreetMessage (() => {
                
                return streetMessage = '⚠ Street is required';

            });
        } else if (inputStreet.current.value.trim().length < 4)  {

            errStreetCounter++;
    
            setStreetMessage (() => {

                return streetMessage = '⚠ Street is too short, at least 4 characters are required';
    
            });      

        } else {

            errStreetCounter=0;
    
            setStreetMessage (() => {

                return streetMessage = '';
    
            });
        }

        if (inputZipcode.current.value.trim() === '') {

            errZipcodeCounter++;

            setZipcodeMessage (() => {
                
                return zipcodeMessage = '⚠ Zipcode is required';

            });
        } else if (inputZipcode.current.value.trim().length != 6 )  {

            errZipcodeCounter++;
    
            setZipcodeMessage (() => {

                return zipcodeMessage = '⚠ Exactly 6 or 7 characters are required';
    
            });      

        } else {

            errZipcodeCounter=0;
    
            setZipcodeMessage (() => {

                return zipcodeMessage = '';
    
            });
        }

        if (inputCity.current.value.trim() === '') {

            errCityCounter++;

            setCityMessage (() => {
                
                return cityMessage = '⚠ City is required';

            });
        } else if (inputCity.current.value.trim().length < 5 )  {

            errCityCounter++;
    
            setCityMessage (() => {

                return cityMessage = '⚠ City is too short, at least 4 characters are required';
    
            });      

        } else {

            errCityCounter=0;
    
            setCityMessage (() => {

                return cityMessage = '';
    
            });
        }

        if (inputNip.current.value.trim() === '') {

            errNipCounter++;

            setNipMessage (() => {
                
                return nipMessage = '⚠ Nip is required';

            });
        } else if (inputNip.current.value.trim().length != 10 )  {

            errNipCounter++;
    
            setNipMessage (() => {

                return nipMessage = '⚠ Exactly 10 digits are allowed';
    
            });      

        } else if (isNaN(inputNip.current.value.trim()))  {

            errNipCounter++;
    
            setNipMessage (() => {

                return nipMessage = '⚠ Only digits are allowed';
    
            });      

        } else {

            errNipCounter=0;
    
            setNipMessage (() => {

                return nipMessage = '';
    
            });
        }
        
        if (errNameCounter===0  && errStreetCounter===0 && errZipcodeCounter===0  && errCityCounter===0 && errNipCounter===0) {
            add ();
        }


    }

    const add = () => {
        
        console.log('funkcja add ()  AddCustomer wywołanie')
        
        let newAddress = {
            street: inputStreet.current.value,
            city: inputCity.current.value,
            zipcode: inputZipcode.current.value
        };

        let newCustomer = {
            name: inputName.current.value,
            address: newAddress,
            nip: inputNip.current.value
        };

        let token = props.userServerResp?.jwt;

        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'x-auth-token': token
        };

        axios.post('http://www.localhost:8080/api/customer/add', 
        JSON.stringify(newCustomer),
            { 'headers': headers })
            .then((res) => {

                // let serverRespErr;
                navigate('/');
                console.log("res.data w add() w AddCustomer ", res.data);

            })
            

            .catch((error) => {
                console.error(error);
                setServerResponseErr(() => {

                    return "" + error;
    
                });
            })
    }


    return (

        <div className="AddCustomer">

            <h1>Add Customer Form</h1>
            <form className="AddCustomerForm" onSubmit= {(e)=>{validate(e);  console.log('btn Add Customer clicked') }}>

                <fieldset>
                    <label htmlFor="Name">Name and Surname</label> {/* <br /> */}
                    <input ref={inputName} name="" type="text" placeholder="Enter Name and Surname" /> <br />
                    <span className="NameMessage"> {nameMessage} </span>
                </fieldset>

                {/* <label>Address</label> <br /> */}
                <fieldset >

                    <label htmlFor="Street">Street</label> {/* <br /> */}
                    <input ref={inputStreet} name="Street" type="text" placeholder="Enter Street" /> <br />
                    <span className="StreetMessage"> {streetMessage} </span> <br />

                   {/*  <label htmlFor="Number">House Number</label> <br />
                    <input ref={inputNumber} name="Number" type="text" placeholder="Enter House Number" /> <br /> */}

                    <label htmlFor="Zipcode">Zipcode</label> {/* <br /> */}
                    <input ref={inputZipcode} name="Zipcode" type="text" placeholder="Enter Zipcode" /> <br />
                    <span className="ZipcodeMessage"> {zipcodeMessage} </span> <br />

                    <label htmlFor="City">City</label> {/* <br /> */}
                    <input ref={inputCity} name="City" type="text" placeholder="Enter City" /> <br />
                    <span className="CityMessage"> {cityMessage} </span> {/* <br /> */}

                </fieldset>

                <fieldset>
                    <label htmlFor="Nip">NIP Number</label> {/* <br /> */}
                    <input ref={inputNip} name="Nip" type="text" placeholder="Enter NIP Number" /> <br />
                    <span className="NipMessage"> {nipMessage} </span> 
                </fieldset>


                <button type="submit">Add customer</button>

                <fieldset>
                    <span className="serverResponseErr"> {serverResponseErr} </span>
                </fieldset>

            </form>

        </div>
        
    );

}

export default AddCustomer;
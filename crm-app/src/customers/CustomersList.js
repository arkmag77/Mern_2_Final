import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Link,
    useNavigate,
    Outlet,
} from "react-router-dom";
import './CustomersList.css';

function CustomersList(props) {

    let customersList = props.customersList;
    console.log("customersList w CustomersList ", customersList);
    console.log("props.serverResponseErr:", props.serverResponseErr);

    const [customerIdToEdit, setCustomerIdToEdit] = useState('');

    const [isPopUpToDeleteVisible, setPopUpToDeleteVisible] = useState(false);
    const [customerIdToDelete, setCustomerIdToDelete] = useState('');

    // console.log('props.customerName.value:', props.customerName)
    
    const [nameMessage, setNameMessage] = useState('');

    const [streetMessage, setStreetMessage] = useState('');
    const [zipcodeMessage, setZipcodeMessage] = useState('');
    const [cityMessage, setCityMessage] = useState('');
    const [nipMessage, setNipMessage] = useState('');
    const [serverResponseMessage, setserverResponseMessage] = useState('');

    const clearState = () => {
        // console.log('clearState()- wywołanie');
        setNameMessage('');
        setStreetMessage('');
        setZipcodeMessage('');
        setCityMessage('');
        setserverResponseMessage('');
    }
    
    const validate = (e) => {

        e.preventDefault();
        // console.log('function validate (e) in  CustomerList in customers');

        let errNameCounter = false;
        let errStreetCounter = false;
        let errZipcodeCounter = false;
        let errCityCounter = false;
        let errNipCounter = false;
        let errServerCounter = false;

        if (props.customerName.trim() === '') {

            errNameCounter = true;

            setNameMessage('⚠ Customer name is required');

        } else if (props.customerName.trim().length < 5) {

            errNameCounter = true;

            setNameMessage('⚠ Customer name is too short, at least 5 characters are required');

        } else {

            errNameCounter = false;

            setNameMessage('');
        }

        if (props.customerStreet.trim() === '') {

            errStreetCounter = true;

            setStreetMessage('⚠ Street is required');

        } else if (props.customerStreet.trim().length < 4) {

            errStreetCounter = true;

            setStreetMessage('⚠ Street is too short, at least 4 characters are required');

        } else {

            errStreetCounter = false;

            setStreetMessage('');
        }

        if (props.customerZipcode.trim() === '') {

            errZipcodeCounter = true;

            setZipcodeMessage('⚠ Zipcode is required');

        } else if (props.customerZipcode.trim().length != 6 /* || props.customerZipcode.trim().length != 7 */) {

            errZipcodeCounter = true;

            setZipcodeMessage('⚠ Exactly 6 or 7 characters are required');

        } else {

            setZipcodeMessage('');
            errZipcodeCounter = false;

        }

        if (props.customerCity.trim() === '') {

            errCityCounter = true;

            setCityMessage('⚠ City is required');

        } else if (props.customerCity.trim().length < 5) {

            errCityCounter = true;

            setCityMessage('⚠ City is too short, at least 4 characters are required');

        } else {

            errCityCounter = false;

            setCityMessage('');
        }

        if (props.customerNip.trim() === '') {

            errNipCounter = true;

            setNipMessage('⚠ Nip is required');

        } else if (props.customerNip.trim().length != 10) {

            errNipCounter = true;

            setNipMessage('⚠ Exactly 10 digits are allowed');

        } else if (isNaN(props.customerNip.trim())) {

            errNipCounter = true;

            setNipMessage('⚠ Only digits are allowed');

        } else {

            errNipCounter = false;

            setNipMessage('');
        }

        if (props.serverResponseErr.trim() === 'Error: Request failed with status code 404') {

            errServerCounter = true;
            setserverResponseMessage('Error: Request failed with status code 404');

        } else if (props.serverResponseErr === '') {

            errServerCounter = false;
            setserverResponseMessage('');

        }
        

        if (errNameCounter === false && errStreetCounter === false && errZipcodeCounter === false && 
            errCityCounter === false && errNipCounter === false && errServerCounter === false) {
            
            props.editCustomer(customerIdToEdit);
            props.setPopUpToEditVisible(false);


        }

    }



    let trElements = customersList.map((customer, index) => {
        console.log("Customer id", customer._id);
        return (
            <tr key={customer._id}  >
                <td className="ID">{index + 1}</td>
                <td className="CustomerName"> {customer.name}</td>
                <td className="Adres">{customer.address.street} {<br />} {customer.address.zipcode} {customer.address.city}</td>
                <td className="Nip">{customer.nip}</td>
                <td className="Details" onClick={() => { console.log("Details clicked"); props.detailsMethod(customer._id) }}><Link className="link" to={`/singlecustomer/${customer._id}`} > Details </Link> </td>
                <td className="Buttons" ><button onClick={() => {
                    console.log("Edit Customer btn clicked"); setCustomerIdToEdit(customer._id);
                    props.setCustomerName(customer.name); props.setCustomerStreet(customer.address.street); props.setCustomerZipcode(customer.address.zipcode);
                    props.setCustomerCity(customer.address.city); props.setCustomerNip(customer.nip);
                    props.setPopUpToEditVisible(true)
                }}> Edit Customer </button> </td>
                <td className="Delete" ><button onClick={() => { console.log("Delete Customer btn clicked"); setCustomerIdToDelete(customer._id); setPopUpToDeleteVisible(true) }}> Delete Customer </button> </td>
            </tr>
        );
    })

    return (

        <div className="CustomersList" >

            {(props.isPopUpToEditVisible) &&
                <div className="PopUpWindow" >

                    <h1>Edit Customer Form</h1>
                    <form className="PopUpWindowForm" onSubmit={(e) => { console.log("Save btn clicked, customer._id:", customerIdToEdit); validate(e);/* props.editCustomer(e, customerIdToEdit);*/   /* props.setPopUpToEditVisible(false) */ }}>

                        <fieldset>
                            <label htmlFor="Name">Name and Surname</label>
                            <input /* ref={inputName} */ value={props.customerName} onChange={(e) => props.setCustomerName(e.target.value)} name="Name" type="text" /* placeholder={props.customerNameToEdit} */ /* value={props.target.value}  */  /*onChange={(e)=>props.setCustomerName(e.target.value)} /* value={customerNameToEdit} */ /><br />
                            <span className='NameMessage'>{nameMessage}</span>
                        </fieldset>

                        <fieldset >
                            <label htmlFor="Stree">Street</label>
                            <input /* ref={props.inputStreet} */ value={props.customerStreet} onChange={(e) => props.setCustomerStreet(e.target.value)} name="Street" type="text" placeholder="Enter Street" /> <br />
                            <span className='streetMessage'>{streetMessage}</span> <br />

                            <label htmlFor="Zipcode">Zipcode</label>
                            <input /* ref={props.inputZipcode} */ value={props.customerZipcode} onChange={(e) => props.setCustomerZipcode(e.target.value)} name="Zipcode" type="text" placeholder="Enter Zipcode" /> <br />
                            <span className='ZipcodeMessage'>{zipcodeMessage}</span> <br />

                            <label htmlFor="City">City</label>
                            <input /* ref={props.inputCity} */ value={props.customerCity} onChange={(e) => props.setCustomerCity(e.target.value)} name="City" type="text" placeholder="Enter City" /> <br />
                            <span className='CityMessage'>{cityMessage}</span>
                        </fieldset>

                        <fieldset>
                            <label htmlFor="Nip">NIP Number</label>
                            <input /* ref={props.inputNip} */ value={props.customerNip} onChange={(e) => props.setCustomerNip(e.target.value)} name="Nip" type="text" placeholder="Enter NIP Number" />
                            <span className='nipMessage'>{nipMessage}</span>
                        </fieldset>

                        <fieldset className="Buttons">
                            <button type="Submit" className="btnSave" /* onClick={()=>{props.setPopUpToEditVisible(false); console.log("Save btn clicked, customer._id:", customerIdToEdit); props.editCustomer(customerIdToEdit); props.setPopUpToEditVisible(false) }} */> Save </button>
                            <button className="btnNo" onClick={() => { console.log("No btn clicked"); props.setPopUpToEditVisible(false); clearState(); }}> Do not save </button>
                        </fieldset>

                        <fieldset>
                            <span className="ServerRespComment"> {serverResponseMessage} {/* {props.serverResponseErr} */}</span>
                        </fieldset>

                    </form>

                </div>}

            {isPopUpToDeleteVisible && <div className="PopUpWindow" >
                <h3>Do You want to delete Customer?</h3>
                <fieldset className="Buttons">
                    <button className="btnYes" onClick={() => { console.log("Yes btn clicked, customer._id:", customerIdToDelete); props.removeCustomer(customerIdToDelete); setPopUpToDeleteVisible(false) }}> Yes </button>
                    <button className="btnNo" onClick={() => { console.log("No btn clicked"); 
                     setPopUpToDeleteVisible(false) }}> No </button>
                </fieldset>
            </div>}

            <div /* className="CustomersList" */>
                <table className="CustomersTable">
                    <thead>
                        <tr>
                            <td>#</td>
                            <td>Name and Surname</td>
                            <td>Address</td>
                            <td>NIP</td>
                            <td>Details</td>
                            <td>Edit Customer</td>
                            <td>Delete Customer</td>
                        </tr>
                    </thead>
                    <tbody>
                        {trElements}
                    </tbody>
                </table>
            </div>
        </div>
    );


}

export default CustomersList;

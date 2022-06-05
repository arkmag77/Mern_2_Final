import React, { useState, useEffect } from 'react';
import './Customers.css';

import axios from 'axios';
import CustomersList from './CustomersList';

function Customers(props) {

    const [customersList, setCustomersList] = useState([]);
    const [customerName, setCustomerName] = useState ('');
    const [customerStreet, setCustomerStreet] = useState ('');
    const [customerZipcode, setCustomerZipcode] = useState ('');
    const [customerCity, setCustomerCity] = useState ('');
    const [customerNip, setCustomerNip] = useState ('');
    
    const [serverResponseErr, setServerResponseErr] = useState('');
    const [isPopUpToEditVisible, setPopUpToEditVisible] = useState(false);
    

    useEffect(() => {
        getCustomers();
    }, []);

    const getCustomers = () => {

        let token = props.userServerResp?.jwt;
    
        //   console.log("token in getCustomers() in Customers", props.userServerResp?.jwt);

        const headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            'x-auth-token': token
        }

        axios.get('http://www.localhost:8080/api/customer/all', {'headers': headers})
            .then(response => {

                // console.log("response data getCustomers()", response.data);

                setCustomersList(response.data);

            })
            .catch((error) => {
                console.error(error);
            })
    }

    const getCustomerId = (customerId) => {

        // console.log(`funkcja getCustomerId () -wywołanie przekazane customerId: ` + customerId);

        props.setCustomerIdResp(customerId);


    }

    const removeCustomer = (customerId) => {

        console.log(`funkcja removeCustomer () -wywołanie, przekazane customerId: ` + customerId)

        let axiosConfig = {
            headres: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        };

        axios.delete('http://www.localhost:8080/api/customer/delete/' + customerId, axiosConfig)
            .then(response => {

                // console.log(`response.data w removeCustomer()`, response.data)

                setCustomersList(customersList)

                getCustomers();

            })

            .catch((error) => {

                console.log(error);

            });
    }

    const editCustomer = (customerId) => {

        // e.preventDefault();
        // console.log(`funkcja editCustomer () -wywołanie, przekazane customerId: ` + customerId)

        let editedCustomer = {
            name: customerName,
            address:{
                street: customerStreet,
                city: customerCity,
                zipcode: customerZipcode,
            },
            nip: customerNip
        };

        // console.log('editedCustomer: ', editedCustomer.name, /* editedaddress.street, editedaddress.city, editedaddress.zipcode, */ editedCustomer.nip);

        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }

        axios.put(
            'http://www.localhost:8080/api/customer/update/' + customerId,
            JSON.stringify(editedCustomer),
            { 'headers': headers })
            .then((response) => {
                console.log("response data w editCustomer", response.data);
                
                getCustomers();
                setServerResponseErr("");
            })
            .catch((error) => {
                console.error(error);
                setServerResponseErr("" + error);
            })


    }




    return (

        <div className="Customers">

            <h1>Customers</h1>
            <CustomersList detailsMethod={getCustomerId} customersList={customersList} removeCustomer={removeCustomer} 
             customerName={customerName} setCustomerName={setCustomerName}  
            customerStreet={customerStreet} setCustomerStreet={setCustomerStreet}  
            customerZipcode={customerZipcode} setCustomerZipcode={setCustomerZipcode}
            customerCity={customerCity} setCustomerCity={setCustomerCity} 
            customerNip={customerNip} setCustomerNip={setCustomerNip} 
            isPopUpToEditVisible={isPopUpToEditVisible} setPopUpToEditVisible={setPopUpToEditVisible}
            editCustomer={editCustomer} serverResponseErr={serverResponseErr} />
        
        </div>


    );

}

export default Customers;
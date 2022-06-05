import React, { useState, useEffect } from 'react';
import Actions from './Actions';
import {
    // BrowserRouter,
    // Routes,
    // Route,
    Link, 
    // useNavigate,
    useParams,
    // Outlet,
  } from "react-router-dom";

import axios from 'axios';
import './SingleCustomer.css';

function SingleCustomer(props) {

    let { id } = useParams();
    // let customerId = props.customerId;
    let actionCounter = 1;
    // let navigate = useNavigate();

    const [singleCustomer, setSingleCustomer] = useState('');
    const [popUpWindow, setPopUpWindow] = useState(false);
    const [actionIdToDelete, setActionIdToDelete] = useState();

    useEffect(() => {
        getSingleCustomer(id);
    },[]);
    
    const getSingleCustomer = (id) => {

        let axiosConfig = {
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
            },
          };

        axios.get('http://www.localhost:8080/api/customer/'+id, axiosConfig)
            .then(response => {

                setSingleCustomer(response.data);

            })
            .catch((error) => {
                console.error(error);
            })
            
    }

    const removeAction = (id, actionId) => {

        let axiosConfig = {
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
            },
          };

        axios.delete('http://www.localhost:8080/api/customer/'+id+'/deleteAction/'+actionId, axiosConfig)
            .then(response => {

                /* setActionIdToDelete(() => {

                    return actionIdToDelete;
                    // return singleCustomer.actions.filter(action => action._id !== actionId);

                }); */

                setActionIdToDelete(actionIdToDelete);

                getSingleCustomer(id);

            })
            .catch((error) => {
                console.error(error);
            })
            
    }

    
    // console.log("singleCustomer ", singleCustomer);

    let actions = singleCustomer.actions;
    // console.log("actions", actions);
    
    let trElements = actions?.map((action) =>  { 
        let date = new Date(action.date)
        return (
            <tr key={action._id} >
                <td className="ID">{actionCounter++}</td>
                <td className="ActionId">{date.toLocaleDateString()} </td>
                <td className="ActionType">{action.action_type} </td>
                <td className="ActionDesc">{action.action_description} </td> 
                <td className="TdBtn"> <button className="Btn" onClick={()=>{setPopUpWindow(true); setActionIdToDelete(action._id); console.log("setPopUpWindow wywołanie, action._id: ", action._id) /*props.removeMethod(event._id) */}}> Delete</button></td>  
            </tr>
        );
    })

    return (

        <div className="SingleCustomer">
                
            <div className="Customer"> <p>Customer Name: {singleCustomer.name}, </p> <p>Customer address: {singleCustomer.address?.street}, {singleCustomer.address?.zipcode} {singleCustomer.address?.city} </p>    {/* {pElements[0]}  */}  Customer NIP: {singleCustomer.nip} </div>

            {popUpWindow && <div className="PopUpWindow" >
                <h3>Do You want to delete action?</h3>
                <fieldset className="Buttons">
                    <button className="BtnYes" onClick={()=>{console.log("Yes btn clicked, action._id:", actionIdToDelete); removeAction(id, actionIdToDelete); setPopUpWindow(false) }}> Yes </button>
                    <button className="BtnNo" onClick={()=>{console.log("No btn clicked"); setPopUpWindow(false)}}> No </button>
                </fieldset>
            </div> }   

            <div className="ActionList">
                <table className="ActionsTable">
                    <thead>
                        <tr>
                            <td>#</td>
                            <td>Action Date</td>
                            <td>Action Type</td>
                            <td>Action Description</td>
                            <td>Action to Delete</td>
                            {/* <td>Action to Edit</td> */}
                        </tr>
                    </thead>
                    <tbody>
                        {trElements}
                    </tbody> 
                </table>
            </div>

            <div className="DivBtnAddAction">
                <button className="BtnAddAction" ><Link className="link"  to={`/action/${id}`} >Add Action</Link></button>
            </div>
 
        </div>
    );

}

export default SingleCustomer;
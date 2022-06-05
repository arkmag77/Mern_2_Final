import React, { useState, useEffect, useRef } from 'react';
import './Actions.css';

import { 
    useNavigate,
    useParams,
  } from "react-router-dom";

import axios from 'axios';

function Actions (props) {

    // let id = props.customerId;
    let { id } = useParams();
    let navigate = useNavigate();
    
    const [dateMessage, setDateMessage] =  useState('');
    const [actionDescriptionMessage, setActionDescriptionMessage] =  useState();
    const [actionTypeMessage, setActionTypeMessage] =  useState();
    const [serverResponseErr, setServerResponseErr] = useState();

    const inputDate = React.useRef();
    const inputActionDescrition = React.useRef();
    const selectActionType = React.useRef();

    const validate = (e) => {

        e.preventDefault();
        let errCounterDate = false;
        let errCounterActionDesc = false;
        let errCounterActionType = false;
        let nowDate = new Date();
        let _inputDate = new Date(inputDate.current.value); 
        
        let time = _inputDate.getDate() - nowDate.getDate();

        

        if (inputDate.current.value === ''){

            setDateMessage ('⚠ Date is required');
            errCounterDate = true;

        } else if(time > 0) {

            setDateMessage ('⚠ Selected Date is not valid');
            errCounterDate = true;
            console.log('⚠ Selected Date is not valid', time);

        } else {

            setDateMessage ('');
            errCounterDate = false;
        }

        if (inputActionDescrition.current.value === ''){

            setActionDescriptionMessage ('⚠ This field is required');
            errCounterActionDesc = true;

        } else {
            setActionDescriptionMessage ('');
            errCounterActionDesc = false;
        }

        if (selectActionType.current.value === ''){

            setActionTypeMessage ('⚠ Selection of this field is required');
            errCounterActionType = true;

        } else {
            setActionTypeMessage ('');
            errCounterActionType = false;
        }



        if (errCounterDate === false && errCounterActionDesc === false && errCounterActionType === false ){
            add();
        }

    }

    const add = () => {

        // console.log('przekazane id  do add () w Actions ', id)

        let newAction = {
            date: inputDate.current.value,
            action_type: selectActionType.current.value,
            action_description: inputActionDescrition.current.value
        };

        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };

        axios.put('http://www.localhost:8080/api/customer/'+id+'/createAction', 
        JSON.stringify(newAction ),
            { 'headers': headers })
            .then((res) => {
                navigate('/singlecustomer/'+id);
                // console.log("res.data in add () in Actions ", res.data);

            })
            .catch((error) => {
                // console.error(error);
                setServerResponseErr("" + error);
            })
    }

    return (
        
        <div className="Action">
            
            <h1>Add Action Form</h1>

            <form onSubmit={(e)=>{validate(e);  console.log('btn Save Action clicked') }}> 

                <fieldset>
                    <label htmlFor = "Date" >Date</label> <br />
                    <input ref={inputDate} name="Date" type="date" placeholder="Enter Date" /> <br />
                    <span className="DateMessage"> {dateMessage} </span>
                </fieldset>
                
                <fieldset>
                    <label htmlFor = "ActionDescription">Action Description</label> <br />
                    <textarea ref={inputActionDescrition} name="ActionDescrition" rows="5" cols="66" placeholder="Enter Action Description" /> <br />
                    <span className="ActionDescriptionMessage"> {actionDescriptionMessage} </span>
                </fieldset>

                <fieldset>
                    <label htmlFor="ActionType">Action Type</label> <br />
                    <select ref={selectActionType} name="ActionType" id="ActionType-select">
                        <option value="">--Please select an action type--</option>
                        <option value="Phone">Phone</option>
                        <option value="Meeting">Meeting</option>    
                        <option value="Other">Other</option>    
                    </select> <br />
                    <span className="ActionTypeMessage"> {actionTypeMessage} </span>
                </fieldset>

                <button type="submit" >Save Action</button>

                <fieldset>
                    <span className="ServerResponseErr"> {serverResponseErr} </span>
                </fieldset>

            </form>
            

        </div>
    

    );
}

export default Actions;
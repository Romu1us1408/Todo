import React, {useState} from 'react';
import {Button, TextField} from "@material-ui/core";
import './Login.css';
import {Link} from "react-router-dom";

const validUsers = {
  'David': 0,
  'Sampada' : 1,
  'Colby': 2,
  'Keifer': 3,
  'Luke': 4,
  'Adis': 5
}

function NewUser(){

    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")
    const [comPass, setComPass] = useState("")
    const [fName, setFName] = useState("")
    const [lName, setLName] =useState("")

    function handleComPassChange(e){
        setComPass(e.target.value)
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value)
    }

    function handleUserChange(e) {
        setUser(e.target.value)
    }

    function handleButtonClick() {

    }

    function handleFNameChange(e) {
        setFName(e.target.value)
    }

    function handleLNameChange(e) {
        setLName(e.target.value)
    }

    return (
        <form className="login">
            <div className="textInput">
                <TextField className="textField" variant="outlined" color="primary" label="First Name" value={fName} onChange={handleFNameChange}/>
            </div>
            <div className="textInput">
                <TextField className="textField" variant="outlined" color="primary" label="Last Name" value={lName} onChange={handleLNameChange}/>
            </div>
            <div className="textInput">
                <TextField className="textField" variant="outlined" color="primary" label="Username" value={user} onChange={handleUserChange}/>
            </div>
            <div className="textInput">
                <TextField className="textField" type="password" variant="outlined" color="primary" label="Password" value={password} onChange={handlePasswordChange}/>
            </div>
            <div className="textInput">
                <TextField className="textField" type="password" variant="outlined" color="primary" label="Confirm Password" value={comPass} onChange={handleComPassChange}/>
            </div>
            <div className="button">
                <Button variant="contained" color="primary" onClick={handleButtonClick}>Create Account</Button>
            </div>
            <div>
                 <Link to="/">Go back to Login</Link>
            </div>
        </form>
    );
};

export default NewUser;
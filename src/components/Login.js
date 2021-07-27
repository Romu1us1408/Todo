import React, {useState, useContext} from 'react';
import {Button, TextField} from "@material-ui/core";
import './Login.css';
import {Link} from "react-router-dom";
import {useHistory} from "react-router";
import UserContext from "./UserContext";


function Login() {

    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")
    const userContext = useContext(UserContext)

    function handlePasswordChange(e) {
        setPassword(e.target.value)
    }

    const handleLogin = (e) => {
        userContext.actions.login(user)
    }

    function handleUserChange(e) {
        setUser(e.target.value)
    }

    return (
        <form className="login">
            <h1>ToDo Login</h1>
            <div className="textInput">
                <TextField className="textField" variant="outlined" color="primary" label="Username" value={user}
                           onChange={handleUserChange}/>
            </div>
            <div className="textInput">
                <TextField className="textField" type="password" variant="outlined" color="primary" label="Password"
                           value={password} onChange={handlePasswordChange}/>
            </div>
            <div className="button">
                <Button variant="contained" color="primary" onClick={handleLogin}>Login</Button>
            </div>
            <div>
                <p>Don't have an account yet? Click <Link to="/create-account">Here</Link> to create one!</p>
            </div>
            <div>
                <label></label>
            </div>
        </form>
    );
};

export default Login;
import React, {useState, useContext} from 'react';
import {Button, TextField, Typography} from "@material-ui/core";
import './css/Login.css';
import UserContext from "./UserContext";
import '@fontsource/roboto';
import {useHistory} from "react-router-dom/cjs/react-router-dom";

function Login() {

    const history = useHistory()
    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")
    const userContext = useContext(UserContext)

    const handleLogin = () => {
        userContext.actions.login(user, password)
    }

    function handleGoToCreate() {
        history.push('/create-account')
    }

    return (
        <div className="form-con">
            <form className="login">
                <Typography variant="h3" color="secondary">
                    ToDo Login
                </Typography>
                <div className="textInput">
                    <TextField className="textField"
                               variant="outlined" color="primary"
                               label="Username" value={user}
                               onChange={
                                   (e) => setUser(e.target.value)
                               }/>
                </div>
                <div className="textInput">
                    <TextField className="textField"
                               type="password" variant="outlined"
                               color="primary" label="Password"
                               value={password}
                               onChange={
                                   (e) => setPassword(e.target.value)
                               }/>
                </div>
                <div className="button">
                    <Button variant="contained" color="primary" onClick={handleLogin}>Login</Button>
                </div>
                <div className="button">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleGoToCreate}>
                        Create Account
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default Login;
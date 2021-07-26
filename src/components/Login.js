import React, {useState} from 'react';
import {Button, TextField} from "@material-ui/core";
import './Login.css';
import {Link} from "react-router-dom";
import {useHistory} from "react-router";


const validUsers = {
    'David': 0,
    'Sampada': 1,
    'Colby': 2,
    'Keifer': 3,
    'Luke': 4,
    'Adis': 5
}

function Login() {

    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")

    const history = useHistory();

    function handlePasswordChange(e) {
        setPassword(e.target.value)
    }

    function handleButtonClick() {
        if (Object.keys(validUsers).includes(user)) {
            history.push(`/todo/${validUsers[user]}`)
        }
        else{

        }
    }

    function handleUserChange(e) {
        setUser(e.target.value)
    }

    return (
        <form className="login">
            <div className="textInput">
                <TextField className="textField" variant="outlined" color="primary" label="Username" value={user}
                           onChange={handleUserChange}/>
            </div>
            <div className="textInput">
                <TextField className="textField" type="password" variant="outlined" color="primary" label="Password"
                           value={password} onChange={handlePasswordChange}/>
            </div>
            <div className="button">
                <Button variant="contained" color="primary" onClick={handleButtonClick}>Login</Button>
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
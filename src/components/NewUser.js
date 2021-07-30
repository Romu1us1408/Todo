import React, {useState} from 'react';
import {Button, TextField, Typography} from "@material-ui/core";
import './css/Login.css';
import axios from "axios";
import {useHistory} from "react-router-dom/cjs/react-router-dom";
import '@fontsource/roboto';

const NewUser = () => {

    const history = useHistory()
    const [errors, setErrors] = useState({})

    const [formState, setFormState] = useState({
        fName: '',
        lName: '',
        email: '',
        password: '',
        comPass: '',
    })

    const setFormField = field => e => {
        setFormState({...formState, [field]: e.target.value})
    }

    const handleCreate = () => {
        axios.post('http://localhost:5000/api/accounts/', formState)
            .then(() => {
                history.push('/')
            }).catch((e) => {
            setErrors(e.response.data)
        })
    }

    const extractError = key => {
        if (errors[key]) {
            return errors[key].join('')
        }
        return ''
    }

    return (
        <div className="form-con">
            <form className="login">
                <Typography variant="h3" color="secondary">Create Account</Typography>
                <div className="textInput">
                    <TextField className="textField" variant="outlined" color="primary" label="First Name"
                               value={formState.fName} onChange={setFormField('fName')}/>
                    <Typography color="error">{extractError('fName')}</Typography>
                </div>
                <div className="textInput">
                    <TextField className="textField" variant="outlined" color="primary" label="Last Name"
                               value={formState.lName} onChange={setFormField("lName")}/>
                    <Typography color="error">{extractError('lName')}</Typography>
                </div>
                <div className="textInput">
                    <TextField className="textField" variant="outlined" color="primary" label="Email"
                               value={formState.email} onChange={setFormField('email')}/>
                    <Typography color="error">{extractError('email')}</Typography>
                </div>
                <div className="textInput">
                    <TextField className="textField" type="password" variant="outlined" color="primary" label="Password"
                               value={formState.password} onChange={setFormField('password')}/>
                    <Typography color="error">{extractError('password')}</Typography>
                </div>
                <div className="textInput">
                    <TextField className="textField" type="password" variant="outlined" color="primary"
                               label="Confirm Password" value={formState.comPass} onChange={setFormField('comPass')}/>
                    <Typography color="error">{extractError('comPass')}</Typography>
                </div>
                <div className="button">
                    <Button variant="contained" color="primary" onClick={handleCreate}>Create Account</Button>
                </div>
                <div className="button">
                    <Button variant="contained" color="primary" onClick={() => {
                        history.push("/")
                    }}>Go Back</Button>
                </div>
            </form>
        </div>

    );
};

export default NewUser;
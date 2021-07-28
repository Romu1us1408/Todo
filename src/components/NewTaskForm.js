import React, {useContext, useState, useEffect} from 'react';
import { Button, TextField} from "@material-ui/core";
import './css/NewTaskForm.css';
import UserContext from "./UserContext";

const NewTaskForm = (props) => {
    const [des, setDes] = useState("")
    const context = useContext(UserContext);

    const handleDesChange = function (e){
        setDes(e.target.value);
    }

    const handleButtonClick = function (e,todo){
        props.addTask({
            done: false,
            des: des,
        })
        setDes('')
    }

    function handleLogOut() {
        context.actions.logout()
    }

    return (
        <form className="newTaskCardForm">
            <div>
                <TextField className="textField" variant="outlined" color="primary" label="Todo Description" value={des} onChange={handleDesChange}/>
            </div>
            <div className="button-con">
                <div className="button">
                    <Button variant="contained" color="primary" onClick={handleButtonClick}>Add</Button>
                </div>
                <div className="button">
                    <Button variant="contained" color="primary" onClick={handleLogOut}>Logout</Button>
                </div>
            </div>

        </form>
    );
};

export default NewTaskForm;
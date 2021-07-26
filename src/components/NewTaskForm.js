import React, {useState} from 'react';
import { Button, TextField} from "@material-ui/core";
import './NewTaskForm.css';

const NewTaskForm = (props) => {
    const [des, setDes] = useState("")


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

    return (
        <form className="newTaskCardForm">
            <div>
                <TextField className="textField" variant="outlined" color="primary" label="Todo Description" value={des} onChange={handleDesChange}/>
            </div>
            <div className="button">
                <Button variant="contained" color="primary" onClick={handleButtonClick}>Login</Button>
            </div>
        </form>
    );
};

export default NewTaskForm;
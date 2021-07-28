import React, {useState} from 'react';
import {Button, IconButton} from "@material-ui/core";
import './css/TaskCard.css';
import DeleteIcon from '@material-ui/icons/Delete';
import {Checkbox} from "@material-ui/core";
import {Label} from "@material-ui/icons";

const TaskCard = (props) => {
    const [done, setDone] = useState(false);
    const [id, setId] = useState(Math.random);

    const handleCheckBoxChange = (e) => {
        if(done == true){
            setDone(false)
        }
        else{
            setDone(true);
        }
    };

    const handleDeleteClick = (e) => {
        console.log(props.task.id)
        props.removeTaskId(props.task.id)
    };


    return (
        <form>
            <div className="taskCardForm">
                <Checkbox
                    name="isDone"
                    checked={done}
                    onChange={handleCheckBoxChange}
                />
                <label className="label">{props.task.des}</label>
                <IconButton onClick={handleDeleteClick}>
                    <DeleteIcon fontSize="large"/>
                </IconButton>
            </div>
        </form>

    );
};

export default TaskCard;
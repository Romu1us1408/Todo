import React, {useState} from 'react';
import {Button} from "@material-ui/core";
import './TaskCard.css';
import DeleteIcon from '@material-ui/icons/Delete';
import {Checkbox} from "@material-ui/core";

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
                {/*<input*/}
                {/*       name="isDone"*/}
                {/*       type="checkbox"*/}
                {/*       checked={done}*/}
                {/*       onChange={handleCheckBoxChange}*/}
                {/*/>*/}
                <Checkbox
                    name="isDone"
                    checked={done}
                    onChange={handleCheckBoxChange}
                />
                {props.task.des}
                <Button variant="contained" onClick={handleDeleteClick}><DeleteIcon/></Button>
            </div>
        </form>

    );
};

export default TaskCard;
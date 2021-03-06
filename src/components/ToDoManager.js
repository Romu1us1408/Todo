import {useContext, useEffect, useState} from "react";
import TaskCard from "./TaskCard";
import NewTaskForm from "./NewTaskForm";
import axios from "axios";
import UserContext from "./UserContext";
import {useParams, useHistory, useLocation} from "react-router";
import './css/ToDoManager.css'
import {Typography} from "@material-ui/core";
import '@fontsource/roboto';

function ToDoManager() {
    const [todo, setTodo] = useState([]);
    const context = useContext(UserContext)
    const {user_id} = useParams()

    useEffect(() => {
        if (!localStorage.getItem('session_token')) {
            context.actions.logout()
        }
    }, [])

    useEffect(() => {
        axios.get('http://localhost:5000/api/tasks/', {
            headers: {
                Authorization: `JWT ${localStorage.getItem('session_token')}`
            }
        }).then((result) => {
            setTodo(result.data)
        })
    }, [])


    function addTask(task) {
        axios.post('http://localhost:5000/api/tasks/', task,
            {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('session_token')}`
                }
            })
            .then((result) => {
                setTodo(result.data)
            })
    }

    function removeTask(removeTaskId) {
        axios.delete('http://localhost:5000/api/tasks/' + removeTaskId, {
            headers: {
                Authorization: `JWT ${localStorage.getItem('session_token')}`
            }
        })
            .then((result) => {
                setTodo(result.data)
            })
    }

    return (
        <div className="appContainer">
            <Typography variant="h3" color="secondary">
                Your ToDo List
            </Typography>
            <NewTaskForm addTask={addTask}/>
            <div>
                {
                    todo.map(task => <TaskCard key={todo.id} className="tasks" task={task} removeTaskId={removeTask}/>)
                }
            </div>
        </div>
    );
}

export default ToDoManager;
import './App.css';
import {useEffect, useState} from "react";
import TaskCard from "./components/TaskCard";
import NewTaskForm from "./components/NewTaskForm";
import axios from "axios";
import{ThemeProvider} from "@material-ui/styles";

import {
  AppBar,
  CssBaseline,
  Typography,
  createMuiTheme
} from "@material-ui/core";

const theme = createMuiTheme({
    palette:{
      type: "dark"
    }
});

const DUMMY_TASKS = [
  {
    id: 1,
    done: false,
    des: "Dishes",
  },
    {
    id: 2,
    done: false,
    des: "Take out Trash",
  },
  {
    id: 3,
    done: false,
    des: "Fold Laundry",
  },
];

function App() {

  const [todo, setTodo] = useState([]);

  const axios = require('axios');

  useEffect(() => {
    axios.get('http://localhost:5000/').then((result) => {
       setTodo(result.data)
    })
  }, [])

  // useEffect(() => {
  //   axios.get('https://jsonplaceholder.typicode.com/todos')
  //       .then(function (response) {
  //         const newTask = [...todo]
  //         for (const obj of response.data) {
  //           const newArray = {
  //             id: obj.id,
  //             done: obj.completed,
  //             des: obj.title
  //           }
  //           newTask.push(newArray);
  //         }
  //         setTodo(newTask);
  //       })
  //       .catch(function (error) {
  //         // handle error
  //         setTodo(DUMMY_TASKS)
  //       })
  // },[])

  function addTask(task){
    const newTask = [...todo]
    newTask.push(task)
    setTodo(newTask);
  }

  function removeTask(removeTaskId){
    const newTodo = [...todo]
    for (let i = 0; i < todo.length; i++) {
      if (removeTaskId === newTodo[i].id) {
        newTodo.splice(i, 1);
        break
      }
    }
    setTodo(newTodo);
  }



  return (
    <div className="appContainer">
      <NewTaskForm addTask={addTask}/>
      <div>
        {
          todo.map(task => <TaskCard key={todo.id} task={task}  removeTaskId={removeTask} />)
        }
      </div>

    </div>
  );
}

export default App;

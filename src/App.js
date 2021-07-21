import './App.css';
import {useEffect, useState} from "react";
import TaskCard from "./components/TaskCard";
import NewTaskForm from "./components/NewTaskForm";
import axios from "axios";

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

  // const axios = require('axios');

  useEffect(() => {
    axios.get('http://localhost:5000/api/tasks').then((result) => {
       setTodo(result.data)
    })
  }, [])

  function addTask(task){
    axios.post('http://localhost:5000/api/tasks', task)
        .then((result) => {
          setTodo(result.data)
        })
  }

  function removeTask(removeTaskId){
    // const newTodo = [...todo]
    // for (let i = 0; i < todo.length; i++) {
    //   if (removeTaskId === newTodo[i].id) {
    //     newTodo.splice(i, 1);
    //     break
    //   }
    // }
    // setTodo(newTodo);
    axios.delete('http://localhost:5000/api/tasks/' + removeTaskId)
        .then((result) => {
          setTodo(result.data)
        })
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

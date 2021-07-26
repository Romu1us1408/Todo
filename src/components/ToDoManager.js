import {useEffect, useState} from "react";
import TaskCard from "./TaskCard";
import NewTaskForm from "./NewTaskForm";
import axios from "axios";

function ToDoManager() {

  const [todo, setTodo] = useState([]);

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
          todo.map(task => <TaskCard key={todo.id}  className="tasks" task={task}  removeTaskId={removeTask} />)
        }
      </div>
    </div>
  );
}

export default ToDoManager;
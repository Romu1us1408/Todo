import './App.css';
import ToDoManager from "./components/ToDoManager";
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Login from "./components/Login";
import NewUser from "./components/NewUser";

function App() {

  return (
      <BrowserRouter>
      <Switch>
        <Route path="/todo/:user_id" exact >
          <ToDoManager/>
        </Route>
        <Route path="/" exact >
          <Login/>
        </Route>
        <Route path="/create-account" exact >
          <NewUser/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
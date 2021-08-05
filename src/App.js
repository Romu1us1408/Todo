import './App.css';
import ToDoManager from "./components/ToDoManager";
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Login from "./components/Login";
import NewUser from "./components/NewUser";
import {UserProvider} from "./components/UserContext";

function App() {

  return (
      <BrowserRouter>
        <UserProvider>
          <Switch>
            <Route path="/todo" exact >
              <ToDoManager/>
            </Route>
            <Route path="/" exact >
              <Login/>
            </Route>
            <Route path="/create-account" exact >
              <NewUser/>
            </Route>
          </Switch>
        </UserProvider>
    </BrowserRouter>
  );
}

export default App;
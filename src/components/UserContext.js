import React, {useState} from 'react';
import {useHistory} from 'react-router';
import axios from "axios";

const UserContext = React.createContext({})

const validUsers = [
  {
    id: 0,
    name: 'Sampada',
  },
  {
    id: 1,
    name: 'Adis',
  },
  {
    id: 2,
    name: 'Colby',
  },
  {
    id: 3,
    name: 'Luke',
  }
]

export const UserProvider = (props) => {
  const [loggedInUser, setLoggedInUser] = useState(null)
  const history = useHistory();

  // const login = (username) => {
  //   const user = validUsers.find(u => u.name === username)
  //   if (user) {
  //     setLoggedInUser(user)
  //     history.push(`/todo/${user.id}`)
  //   }
  // }
    const login = (username, password) => {
    axios.post('http://localhost:5000/auth', {
      username,
      password
    }).then(resp => {
      localStorage.setItem('session_token', resp.data.access_token)
      history.push('/todo')
    })
  }

   const logout = () => {
    localStorage.removeItem('session_token')
    history.push(`/`)
  }

  const value = {
    actions: {
      login: login,
      logout: logout
    }
  }

  return (<UserContext.Provider value={value}>
    {props.children}
  </UserContext.Provider>)
}


export const UserConsumer = UserContext.Consumer
export default UserContext
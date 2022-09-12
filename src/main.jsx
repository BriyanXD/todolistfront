import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter , Route, Routes} from "react-router-dom"
import './index.css'
import Login from "./components/Login/Login"
import TodoList from "./components/TodoList/TodoList"
import SingIn from "./components/SingIn/SingIn"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/singup' element={<SingIn/>}/>
        <Route path='/' element={<TodoList/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)

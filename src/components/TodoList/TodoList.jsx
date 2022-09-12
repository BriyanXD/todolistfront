import React,{useEffect,useState} from 'react';
import Todo from '../Todo/Todo'
import CreateTodo from '../CreateTodo/CreateTodo';
import { useNavigate } from "react-router-dom";
import style from "./TodoList.module.css"
const TodoList = () => {
    const [todos, setTodos] = useState([])
    const [lastAdded, setLastAdded] = useState({})
    const [id, setId] = useState('')
    const navigate = useNavigate()
    useEffect(()=>{
        const userId = localStorage.getItem('userId')
        setId(userId)
        userId ? fetch(`http://localhost:3001/todos/${userId}`,{
            method:"GET",
            headers:{
                "Content-Type": "application/json",
                'Authorization': "Bearer " + localStorage.getItem('jwt')
            },
        })
        .then(response => response.json())
        .then(response => {
            response.message ? navigate("/login") : setTodos(response)
        })
        : navigate("/login")
    },[lastAdded,id])

    const handleCreate = (title, description ) => {
        const userId = localStorage.getItem('userId')
        fetch('http://localhost:3001/todos',{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
                'Authorization': "Bearer " + localStorage.getItem('jwt')
            },
            body: JSON.stringify({title,description,userId}),
        }).then(res => res.json()).then(res =>{
            res ? setLastAdded(res): console.log("Error al crear Todo")
        })
    }

    const handleSave = (id, newTitle, newDescription) => {
        fetch('http://localhost:3001/todos',{
            method:"PUT",
            headers: {
                "Content-Type": "application/json",
                'Authorization': "Bearer " + localStorage.getItem('jwt')
              },
              body: JSON.stringify({id,newDescription,newTitle}),
        })
        .then(res => res.json())
        .then(res => {
            const result = todos.map(todo => {
                if(todo.id === res.id){
                    todo.title = newTitle
                    todo.description = newDescription
                }
                return todo
            })
            setTodos(result)
        })
    }
    const handleComplete = (id) => {
        fetch('http://localhost:3001/todos',{
            method:"PUT",
            headers: {
                "Content-Type": "application/json",
                'Authorization': "Bearer " + localStorage.getItem('jwt')
              },
              body: JSON.stringify({id}),
        })
        .then(res => res.json())
        .then(res => setLastAdded(res))
    }

    const handleClose = () => {
        const userId = localStorage.setItem('userId',"")
        localStorage.setItem("jwt","")
        setId(userId)
    }
    return (
        <div className={style.containerPrincipal}>
            <div className={style.containerForm}>
                <CreateTodo onCreate={handleCreate}/>
                <input className={style.button} type="button" value="Cerrar Session" onClick={handleClose}/>
            </div>
            {todos.map(todo => <Todo key={todo.id} todo={todo} onSave={handleSave} onComplete={handleComplete}/>)}
        </div>
    );
}

export default TodoList;

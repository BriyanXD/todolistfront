import React,{useState, useRef} from 'react';
import style from "./CreateTodo.module.css"

const CreateTodo = ({onCreate}) => {
    const [newTodo, setNewTodo] = useState({title:"",description:""});
    
    const refTitle = useRef()
    const refDescription = useRef()

    const handleSubmit = e => {
        e.preventDefault()
        onCreate(newTodo.title, newTodo.description)
        refTitle.current.value = ""
        refDescription.current.value = ""
        refTitle.current.focus()
    }
    const handleChange = e => {
        setNewTodo({
            ...newTodo,
            [e.target.name]:e.target.value
        })
    }

    return (
        <form className={style.containerForm}>
            <input className={style.input} ref={refTitle} type="text" name="title" placeholder='Title' onChange={handleChange}/>
            <input className={style.input} ref={refDescription} type="text" name="description" placeholder='Descripton' onChange={handleChange}/>
            <input className={style.button} type="submit" value='Crear' onClick={handleSubmit}/>
        </form>
    );
}

export default CreateTodo;
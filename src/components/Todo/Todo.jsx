import React,{useState} from 'react';
import style from "./Todo.module.css"


const Todo = ({todo, onSave, onComplete}) => {

    const [modeEdit, setModeEdit] = useState(false);

    const FormEdit = () => {
        const [newTitle, setnewTitle] = useState(todo.title)
        const [newDescription, setnewDescription] = useState(todo.description)

        const handleSave = e => {
            e.preventDefault();
            setModeEdit(!modeEdit);
            onSave(todo.id, newTitle, newDescription);
        }
        const handleChange = e => {
            if(e.target.name === 'title')setnewTitle(e.target.value)
            else setnewDescription(e.target.value)
        }
        return <form className={style.containerPrincipal}>
                    <div  className={style.containerData}>
                    <input className={style.input} type="text" name="title" placeholder='title' value={newTitle} onChange={handleChange}/>
                    <input className={style.input} type="text" name="description" id="description" value={newDescription} onChange={handleChange}/>
                    </div>
                    <input className={style.buttonEdit} type="submit" value="Guardar" onClick={handleSave}/>
                </form>

    }
    const TodoElement = () => {
        const handleEdit = () => {
            setModeEdit(!modeEdit)
        }
        const handleComplete = () => {
            onComplete(todo.id);
        }
        return <div className={style.containerPrincipal}>
                <div className={style.containerData}>
                    <h3 className={style.data}>{todo.title}</h3>
                    <p className={style.data}>{todo.description}</p>
                </div>
                <div className={style.buttonContainer}>
                    <button className={style.button} onClick={handleEdit}>Editar</button>
                    <button className={style.button} onClick={handleComplete}>Completar</button>
                </div>
            </div>
    }
    return(
        <div className={style.containerPadre}>
            {modeEdit ? <FormEdit/>: <TodoElement/>}
        </div>
    )
}

export default Todo;

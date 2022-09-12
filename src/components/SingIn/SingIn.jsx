import React,{useState} from 'react';
import { useNavigate, Link } from "react-router-dom"
import style from "./Singin.module.css"
const SingIn = () => {
    const navigate = useNavigate()
    const [newUser, setNewUser] = useState({username:"",password:"",rpassword:""});
    const [error, seterror] = useState("");
    const handleSubmit = e => {
        e.preventDefault()
        const {username, password, rpassword} = newUser
        if(password !== rpassword){
            seterror("Las contrasenas no coinciden.")
            setTimeout(() => seterror(""), 5000)
            return
        }
        fetch("http://localhost:3001/singin",{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username, password})
        })
        .then(res => res.json())
        .then(res => {
            localStorage.setItem('jwt', res.jwt)
            localStorage.setItem('userId', res.userId)
            navigate('/')
        }).catch(error => {
            seterror("Error al hacer el registro intentalo de nuevo mas tarde.")
            setTimeout(() => seterror(""), 5000)
        })
    }
    const handleChange = e => {
        setNewUser({
            ...newUser,
            [e.target.name]:e.target.value
        })
    }

    return (
    <div className={style.containerPrincipal}>
        <form className={style.containerForm}>
                <h1 className={style.title}>Sing up</h1>
                <input className={style.input} type="text" placeholder='username' name='username' onChange={handleChange}/>
                <input className={style.input} type="password" placeholder='password' name='password' onChange={handleChange}/>
                <input className={style.input} type="password" placeholder='repeat password' name='rpassword' onChange={handleChange}/>
                <input className={style.button} type="button" value="Sing up" onClick={handleSubmit}/>
                <Link to="/login" className={style.link}>back</Link>
        </form>
        {error ? <p className={style.error}>{error}</p> : null }
    </div>
    );
}

export default SingIn;

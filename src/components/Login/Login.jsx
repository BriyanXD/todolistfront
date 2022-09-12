import React,{useState} from 'react';
import { useNavigate, Link } from "react-router-dom";
import style from "./Login.module.css"
import avatarImage from "../../assets/img/avatar.png"

const Login = () => {

    const [userData, setUserData] = useState({username:"", password:""});
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleChange = e => {
        setUserData({
            ...userData,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        const {username,password} = userData
        if(username === "" || password === ""){
            setError("Ingrese un usuario y contrasena.")
            setTimeout(() => setError(""),5000)
            return
        }
        fetch("http://localhost:3001/login",{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password })
        })
        .then(response => response.json())
        .then(response =>{
            localStorage.setItem("jwt",response.jwt)
            localStorage.setItem("userId",response.userId)
            response.userId ? navigate("/") : navigate("/login")
        }).catch(error => {
            setError("Error en las credenciales ingresadas.")
            setTimeout(() => setError(""),5000)
            navigate("/login")
        })
    }

    return (
        <div className={style.containerPrincipal}>
            <form className={style.containerForm}>
                <h1 className={style.title}>Login.</h1>
                <img className={style.image} src={avatarImage} alt="avatarImage" />
                <input className={style.input} name='username' type="text" placeholder='Username' onChange={handleChange}/>
                <input className={style.input} name='password' type="password" placeholder='Password' onChange={handleChange}/>
                <input  className={style.button} type="submit" value="Sing in" onClick={handleSubmit}/>
                <Link to='/singup' className={style.link}>Sing up</Link>
            </form>
            {error ? <p className={style.error}>{error}</p> : null }
        </div>
    );
}

export default Login;

import React from "react";
import "./register.css";
import { useRef, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import CircularProgress from '@mui/material/CircularProgress';
import axios from "axios";
import { useNavigate } from "react-router";

export default function Register(){
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const repassword = useRef();
    const {isFetching } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleClick = async (e)=>{
        e.preventDefault();
        if(repassword.current.value !== password.current.value){
            repassword.current.setCustomValidity("Passwords are Not Matching!")
        }else{
            const user ={
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
            };
            try{
                await axios.post("/auth/register", user);
                navigate("/login");
            }catch(err){
                console.log(err);
            }
            
        }
    }




    return(
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Wafln</h3>
                    <span className="loginDesc">Connect Freely, Express Boldly
                    <h1 className="finePrint">(Syrup not included)</h1>
                    </span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input 
                            placeholder="Username" 
                            required ref={username} 
                            className="loginInput" 
                        />
                        <input 
                            placeholder="Email" 
                            required ref={email} 
                            className="loginInput" 
                            type="email"
                        />
                        <input 
                            placeholder="Password" 
                            required ref={password}
                            className="loginInput" 
                            type="password"
                            minLength="6"
                        />
                        <input 
                            placeholder="Re-enter Password" 
                            required ref={repassword} 
                            className="loginInput" 
                            type="password"
                        />
                         <button className="loginButton" type="submit" disabled={isFetching}>
                            {isFetching ?  <CircularProgress color="inherit" size="2rem"/> : "Sign up"}
                        </button>
                        <button className="loginRegisterButton"  disabled={isFetching}>
                            {isFetching ?  <CircularProgress color="inherit" size="2rem"/> : "Have an Account"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
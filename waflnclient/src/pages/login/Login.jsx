import React from "react";
import "./login.css";
import { useContext, useRef } from "react";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from "react-router-dom";

export default function Login(){
    const email = useRef();
    const password = useRef();
    const { user, isFetching, dispatch } = useContext(AuthContext);


    const handleClick = (e)=>{
        e.preventDefault();
        loginCall({email: email.current.value, password: password.current.value}, dispatch)
    }

    console.log(user);
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
                        <input placeholder="Email" 
                            type="email" 
                            required
                            minLength={5}
                            className="loginInput" 
                            ref={email}
                        />
                        <input placeholder="Password" 
                            type="password" 
                            required
                            className="loginInput" 
                            ref={password} 
                        />
                        <span className="loginForgot">Forgot Password?</span> 
                        <button className="loginButton" type="submit" disabled={isFetching}>
                            {isFetching ?  <CircularProgress color="inherit" size="2rem"/> : "Log in"}
                        </button>
                        <Link to="/" className="loginRegisterButton"  disabled={isFetching}>
                            {isFetching ?  <CircularProgress color="inherit" size="2rem"/> : "Create an Account"}
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
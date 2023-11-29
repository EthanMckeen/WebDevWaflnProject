import React from "react";
import "./login.css";

export default function Login(){
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
                    <div className="loginBox">
                        <input placeholder="Email" className="loginInput" />
                        <input placeholder="Password" className="loginInput" />
                        <button className="loginButton">Log in</button>
                        <span className="loginForgot">Forgot Password?</span>
                        <button className="loginRegisterButton">Create An Account</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
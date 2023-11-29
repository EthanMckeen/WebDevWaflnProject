import React from "react";
import "./register.css";

export default function Register(){
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
                        <input placeholder="Username" className="loginInput" />
                        <input placeholder="Email" className="loginInput" />
                        <input placeholder="Password" className="loginInput" />
                        <input placeholder="Re-enter Password" className="loginInput" />
                        <button className="loginButton">Sign up</button>
                        <button className="loginRegisterButton">Log into Your Account</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
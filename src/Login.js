import React from 'react'
import {Button} from "@material-ui/core"
import "./Login.css"
import {auth,provider} from "./firebase.js"
function Login() {
    const signIn = () => {
        auth.signInWithPopup(provider)
        .catch((error)=>alert(error.message));
    };
    return (
        <div className="login">
            <div className="login__logo">

            </div>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmHOOgwFIeEeNbZePimffFCNPIhpmGAOGT4w&usqp=CAU" alt="" />
            <Button onClick={signIn}>Sign In</Button>
        </div>
    );
}
export default Login

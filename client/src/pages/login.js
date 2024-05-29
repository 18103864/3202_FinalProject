import { useState } from "react";
import { useCookies } from "react-cookie";
import axios from 'axios';
import Form  from '../components/authForm.js'
import { useNavigate } from "react-router-dom"; 

export const Login = () => {
    return <LoginDiv />
}

const LoginDiv = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [,setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post("/auth/login", {
                username, password
            });

            if(response.data.token && response.data.userID){
                setCookies("access_token", response.data.token);
                window.localStorage.setItem("userID", response.data.userID)
                alert("Successfully Logged in.")
                navigate("/");
            } else {
                alert(response.data.message);
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    return <Form 
                username={username} 
                setUsername={setUsername} 
                password={password} 
                setPassword={setPassword}
                label =  "Login"
                onSubmit={onSubmit}
                linktext = "Don't Have An Account?"
                link = "register"
            />
}
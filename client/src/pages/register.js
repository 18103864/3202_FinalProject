import { useState } from "react";
import axios from 'axios';
import Form  from '../components/authForm.js'
import { useNavigate } from "react-router-dom";

export const Register = () => {
    return <RegisterDiv />
}

const RegisterDiv = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault();

        try {
            if(username != "" && password != ""){
                const response = await axios.post("/auth/register", {
                    username, password
                });
                // console.log(response.status);\
                if(response.data.newUser){
                    alert(response.data.message);
                    navigate("/login");
                } else{
                    alert(response.data.message);
                }
            } else{
                alert("Something Went Wrong! Contact Administrator.");
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
                label =  "Register"
                onSubmit={onSubmit}
                linktext = "Already Have An Account?"
                link = "login"                
            />
}


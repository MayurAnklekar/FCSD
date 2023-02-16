import React, { useState } from "react";
import "./Login.css";
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const navigate = useNavigate();

    const handleSubmit = async(event) => {
        event.preventDefault();
        console.log(email, password);
        const data = {
            email: email,
            password: password
        }
        try {
            const response = await axios.post('http://localhost:5000/user/admin-login', data);
            if(response.data.userId===-1)
            {
                toast.error('Invalid Credentials');
            }
            else{
                toast.success('Login Successful');
                navigate('/dashboard', {state: {userId: response.data.userId}})
            }
        }
        catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <div className="form-input">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />
                </div>
                <div className="form-input">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Login;

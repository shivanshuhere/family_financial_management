import React, { useState } from "react";
import axios from "axios";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        const res = await axios.post("http://127.0.0.1:5000/api/auth/register", { email, password });

        alert(JSON.stringify(res));
    };

    return (
        <div>
            <h2>Register</h2>
            <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Sign Up</button>
        </div>
    );
};

export default Register;

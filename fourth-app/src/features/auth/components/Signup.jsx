import { useState } from "react";
import { signup } from "../api/authApi.jsx";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            setMessage('Fill all the missing fields');
            return
        }

        try {
            const data = await signup({name, email, password});

            if (data.success) {
                setMessage('signup successful!');
                navigate('/login')
            } else {
                setMessage(data.message)
            }
        } catch (err) {
            console.error(err);
            setMessage('Please try again later!')
        }
    }

    return (
        <div className="signup">
            <form onSubmit={handleSignup}>
                <input type="text" value={name} placeholder="Enter your name" onChange={(e) => setName(e.target.value)} /><br /><br />
                <input type="email" value={email} placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} /><br /><br />
                <input type="password" value={password} placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} /><br /><br />
                <button>Signup</button>
                <p>Don't have an account? <Link to={'/login'}>Login</Link> </p>
            </form>
            {
                message && <p>{message}</p>
            }
        </div>
    )
}
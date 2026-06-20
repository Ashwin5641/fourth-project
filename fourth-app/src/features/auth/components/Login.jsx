import { useState } from "react";
import { login as loginApi } from "../api/authApi.jsx";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();
    const {login} = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setMessage('Fill all the missing fields');
            return
        }

        try {
            const data = await loginApi({email, password});

            if (data.success) {
                login(data.token, data.user);
                setMessage('login successful!');
                
                if (data.user.role === 'admin') {
                    navigate('/admin')
                } else {
                    navigate('/')
                }
            } else {
                setMessage(data.message)
            }
        } catch (err) {
            console.error(err);
            setMessage('Please try again later!')
        }
    }

    return (
        <div className="login">
            <form onSubmit={handleLogin}>
                <input type="email" value={email} placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} /><br /><br />
                <input type="password" value={password} placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} /><br /><br />
                <button>Login</button>
                <p>Already have an account? <Link to={'/signup'}>Signup</Link> </p>
            </form>
            {
                message && <p>{message}</p>
            }
        </div>
    )
}
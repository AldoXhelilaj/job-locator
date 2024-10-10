import React, { useState } from 'react';
import { useAuth } from '../auth';
import ErrorMessage from './ErrorMessage';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const  {login} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
             navigate("/");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='form'>
            <label htmlFor="email">Email</label>
            <input type="email" autoComplete='email' id='email' className='input' value={email} onChange={(e) => setEmail(e.target.value)} required />
            <label htmlFor="password">Password</label>
            <input type="password" autoComplete='current-password' className='input' id='password'  value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Log in</button>
            {error && <ErrorMessage message={error} />}
        </form>
    );
};

export default Login;
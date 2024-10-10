import React, { useState } from 'react';
import { useAuth } from '../auth';
import ErrorMessage from './ErrorMessage';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSucces, setIsSucces] = useState(false);
    const { signup, signOut } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signup(email, password);
            setError("");
            setIsSucces(true);
        } catch (error) {
            const { code, message } = error;
            setError(error.message);
            setIsSucces(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='form'>
            <label htmlFor="email">Email</label>
            <input type="email" 
            id='email'
            autoComplete='new-email'
                value={email}
                className='input'
                onChange={(e) => setEmail(e.target.value)} required />
            <label htmlFor="password">Password</label>

            <input type="password" value={password}
            id='password'
                className='input'
                onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Sign up</button>
            {error && <ErrorMessage message={error} isSucces={isSucces} />}
        </form>
    );
};

export default Signup;
import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const Login = () => {
    const[username, setUserName] = useState('');

    const[password, setPassword] = useState('');

    const[loginMessage, setMessage] = useState('');

    const navigate = useNavigate();
    // 

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await axios.post('http://localhost:8000/api/token/', 
                {"username": username, "password": password});
            console.log('Login Successful: ', response.data);
            setMessage('Login Successful!');
            setUserName('');
            setPassword('');
            localStorage.setItem('accessToken', response.data.access);
            navigate('/tasks');
        } catch (err){
            console.log('Login failed: ', err.response?.data?.detail || err.message);
            setMessage('Login Failed! ' + (err.response?.data?.detail || 'An error occurred'));
        }
    } 

    return (
        <div>
            <h2>Login to Task Manager</h2>
            <form className="login-form" 
            style={{display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px', margin: '0 auto'}} 
            onSubmit={handleSubmit}>
                <label>Username:</label>
                <input 
                    type="text"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
            {loginMessage && <p>{loginMessage}</p>}
        </div>
    )
}

export default Login;
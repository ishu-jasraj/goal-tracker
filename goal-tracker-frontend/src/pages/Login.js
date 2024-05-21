import React, { useState } from 'react';
import '../styles/Signup.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    function handleSignup() {
        navigate('/signup');
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        console.log("clicked....")
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await fetch('http://localhost:5000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': true
                },
                body: JSON.stringify(formData),
            });
            console.log("response->", response)
            // console.log("response data->", await response.json())
            if (response.status === 400) {
                alert("Please login with correct credentials")
                throw new Error('Please login with correct credentials');
            }
            else if (response.status === 401) {
                throw new Error('Failed to login');
            }
            const { username, _id } = await response.json();
            setSuccess('login successful!');
            navigate('/dashboard', { state: { username, _id } });
        } catch (error) {
            console.log("error-->>>.", error.message)
            setError(error.message);
        }
    };


    return (
        <div className="signup-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button className='submit-btn' type="submit">Login</button>
            </form>
            <button className='submit-btn signup-btn' type="button" onClick={handleSignup}>Signup</button>
        </div>
    );
};

export default Login;

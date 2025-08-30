import React, { useState } from 'react';
import './signup.css';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [email, setEmail] = useState('');
    const [date, setDate] = useState('');
    const [country, setCountry] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{10,}$/;

        if (!passwordRegex.test(password)) {
            setError('Password must be at least 10 characters, include one uppercase letter, one number, and one special character.');
            return;
        }

        if (password !== passwordConfirm) {
            setError('Passwords do not match');
            return;
        }
        if (!email || !date || !country || !phone) {
            setError('Please fill in all fields');
            return;
        }

        // Check if email already exists
        try {
            const emailRes = await fetch('http://localhost:5000/api/check-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const emailData = await emailRes.json();
            if (!emailRes.ok) {
                setError(emailData.message || 'Email check failed');
                return;
            }
            if (emailData.exists) {
                setError('Email already exists. Please use a different email.');
                return;
            }
        } catch (err) {
            setError('Network error while checking email');
            return;
        }

        try {
            const res = await fetch('http://localhost:5000/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password, email, date, country, phone })
            });
            const data = await res.json();
            if (res.ok) {
                setSuccess('Signup successful! You can now log in.');
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Network error');
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-header">
                <button className="home-button" type="button" onClick = {() => navigate('/')}>
                    Home
                </button>
                <span className="header-title">HISTODOCS</span>
            </div>
            <div className="signup-bg">
                <form className="signup-form" onSubmit={handleSubmit}>
                <label className="signup-label">
                    Username:
                    <br /><br />
                    <input className="signup-input" type="text" value={username} onChange={e => setUsername(e.target.value)} name="username" placeholder='Username' />
                    <br />
                    Password:
                    <br /><br />
                    <input className="signup-input" type="password" value={password} onChange={e => setPassword(e.target.value)} name="password" placeholder='Password' />
                    <br />
                    Password Confirmation:
                    <br /><br />
                    <input className="signup-input" type="password" value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} name="passwordConfirm" placeholder='Password' />
                    <br />
                    Email:
                    <br /><br />
                    <input className="signup-input" type="email" value={email} onChange={e => setEmail(e.target.value)} name="email" placeholder='Email' />
                    <br />
                    Date of Birth:
                    <br /><br />
                    <input className="signup-input" type="date" value={date} onChange={e => setDate(e.target.value)} name="date" />
                    <br />
                    Place of Birth:
                    <br /><br />
                    <input className="signup-input" type="text" value={country} onChange={e => setCountry(e.target.value)} name="country" placeholder='Country' />
                    <br />
                    Phone Number:
                    <br /><br />
                    <input className="signup-input" type="number" value={phone} onChange={e => setPhone(e.target.value)} name="phone" placeholder='Phone Number' />
                    <br /><br />
                    <button className="signup-button" type="submit">
                        Signup
                    </button>
                    {error && <p className="error">{error}</p>}
                    {success && <p className="success">{success}</p>}
                </label>
            </form>
            </div>
            <div className = "signup-footer">
                Contact
            </div>  
        </div>
    )
}

export default Signup;
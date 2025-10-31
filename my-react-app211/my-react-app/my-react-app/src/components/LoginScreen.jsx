import React, { useState } from 'react';

const LoginScreen = ({ onLogin }) => {
    const [form, setForm] = useState({ username: '', password: '' });
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.username.trim()) {
            setError('Please enter a username');
            return;
        }

        // In a real app, you'd validate against a backend
        // For now, we'll just use the username as identification
        onLogin({ username: form.username.trim() });
    };

    return (
        <div className="login-screen screen active">
            <div className="login-container">
                <div className="login-header">
                    <i className="fas fa-user-circle"></i>
                    <h2>Player Login</h2>
                    <p>Login to save your quiz scores automatically</p>
                </div>

                <form onSubmit={handleSubmit}>
                    {error && <div className="error-message">{error}</div>}
                    
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={form.username}
                            onChange={(e) => setForm({ ...form, username: e.target.value })}
                            placeholder="Enter your username"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            placeholder="Enter your password"
                        />
                    </div>

                    <button type="submit" className="action-btn primary">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginScreen;
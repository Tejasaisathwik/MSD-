import React, { useState } from 'react';
import { login as apiLogin, register as apiRegister } from '../services/api';

const AuthScreen = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [form, setForm] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        if (!form.username.trim() || !form.password.trim()) {
            setError('Please provide username and password');
            return;
        }
        try {
            setSubmitting(true);
            const data = await apiLogin(form.username.trim(), form.password);
            localStorage.setItem('auth_token', data.token);
            localStorage.setItem('quiz_current_user', JSON.stringify(data.user));
            window.location.reload();
        } catch (err) {
            setError(err.message || 'Login failed');
        } finally {
            setSubmitting(false);
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');
        if (!form.username.trim() || !form.password.trim()) {
            setError('Please fill in all fields');
            return;
        }
        if (form.password !== form.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            setSubmitting(true);
            const data = await apiRegister(form.username.trim(), form.password);
            localStorage.setItem('auth_token', data.token);
            localStorage.setItem('quiz_current_user', JSON.stringify(data.user));
            window.location.reload();
        } catch (err) {
            setError(err.message || 'Signup failed');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDemo = () => {
        // Create a demo user without backend authentication
        const demoUser = {
            username: 'Demo User',
            role: 'user',
            isDemo: true
        };
        localStorage.setItem('quiz_current_user', JSON.stringify(demoUser));
        localStorage.setItem('demo_mode', 'true');
        window.location.reload();
    };

    return (
        <div className="auth-screen screen active">
            <div className="auth-container">
                <div className="auth-header">
                    <i className="fas fa-brain"></i>
                    <h1>Multi Quiz Gaming</h1>
                    <p>Test your knowledge across multiple categories!</p>
                </div>

                <div className="auth-tabs">
                    <button 
                        className={`auth-tab ${isLogin ? 'active' : ''}`}
                        onClick={() => setIsLogin(true)}
                    >
                        Login
                    </button>
                    <button 
                        className={`auth-tab ${!isLogin ? 'active' : ''}`}
                        onClick={() => setIsLogin(false)}
                    >
                        Sign Up
                    </button>
                </div>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={isLogin ? handleLogin : handleSignup}>
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

                    {!isLogin && (
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={form.confirmPassword}
                                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                                placeholder="Confirm your password"
                            />
                        </div>
                    )}

                    <button type="submit" className="action-btn primary" disabled={submitting}>
                        {isLogin ? (submitting ? 'Logging in...' : 'Login') : (submitting ? 'Signing up...' : 'Sign Up')}
                    </button>
                </form>

                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <p style={{ color: '#666', marginBottom: '10px' }}>Or try without signing up</p>
                    <button 
                        type="button" 
                        className="action-btn" 
                        style={{ background: '#6c757d' }}
                        onClick={handleDemo}
                        disabled={submitting}
                    >
                        Try Demo
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthScreen;
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const login = async (username, password) => {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || data.message || 'Login failed');
        return data;
    } catch (error) {
        if (error.message === 'Failed to fetch') {
            throw new Error('Cannot connect to server. Please try again later.');
        }
        throw error;
    }
};

export const register = async (username, password) => {
    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || data.message || 'Registration failed');
        return data;
    } catch (error) {
        if (error.message === 'Failed to fetch') {
            throw new Error('Cannot connect to server. Please try again later.');
        }
        throw error;
    }
};

export const verifyToken = async (token) => {
    try {
        const response = await fetch(`${API_URL}/auth/verify`, {
            headers: { 'auth-token': token }
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || data.message || 'Token verification failed');
        return data;
    } catch (error) {
        if (error.message === 'Failed to fetch') {
            throw new Error('Cannot connect to server. Please try again later.');
        }
        throw error;
    }
};

export const saveScore = async (token, scoreData) => {
    const response = await fetch(`${API_URL}/scores`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': token
        },
        body: JSON.stringify(scoreData)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data;
};

export const getScores = async () => {
    const response = await fetch(`${API_URL}/scores`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data;
};

export const getUserScores = async (token) => {
    const response = await fetch(`${API_URL}/scores/user`, {
        headers: { 'auth-token': token }
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data;
};

// Admin API functions
export const getAllUsers = async (token) => {
    const response = await fetch(`${API_URL}/admin/users`, {
        headers: { 'auth-token': token }
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data;
};

export const getUserDetails = async (token, userId) => {
    const response = await fetch(`${API_URL}/admin/users/${userId}`, {
        headers: { 'auth-token': token }
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data;
};
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();

// Middleware - Enable CORS for all origins
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'auth-token', 'Authorization'],
    credentials: true
}));
app.use(express.json());

const JWT_SECRET = 'mock-secret-key-123';

// Mock data storage (in-memory, will reset on each cold start)
let users = [
    { id: 1, username: 'admin', password: 'admin123', role: 'admin' },
    { id: 2, username: 'user', password: 'user123', role: 'user' }
];

let scores = [];
let quizData = {
    sports: [
        {
            question: "Which country won the FIFA World Cup 2018?",
            options: ["Brazil", "Germany", "France", "Argentina"],
            correctAnswer: 2
        },
        {
            question: "How many players are there in a basketball team on court?",
            options: ["5", "6", "7", "8"],
            correctAnswer: 0
        }
    ],
    science: [
        {
            question: "What is the chemical symbol for gold?",
            options: ["Go", "Gd", "Au", "Ag"],
            correctAnswer: 2
        },
        {
            question: "What planet is known as the Red Planet?",
            options: ["Venus", "Mars", "Jupiter", "Saturn"],
            correctAnswer: 1
        }
    ],
    history: [
        {
            question: "In which year did World War II end?",
            options: ["1943", "1944", "1945", "1946"],
            correctAnswer: 2
        },
        {
            question: "Who was the first President of the United States?",
            options: ["Thomas Jefferson", "George Washington", "John Adams", "Benjamin Franklin"],
            correctAnswer: 1
        }
    ]
};

// Auth routes
app.post('/auth/register', (req, res) => {
    try {
        const { username, password } = req.body;
        
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }
        
        if (users.find(u => u.username === username)) {
            return res.status(400).json({ error: 'Username already exists' });
        }
        
        const newUser = {
            id: users.length + 1,
            username,
            password,
            role: 'user'
        };
        
        users.push(newUser);
        
        const token = jwt.sign({ id: newUser.id, username: newUser.username, role: newUser.role }, JWT_SECRET);
        res.json({ token, user: { username: newUser.username, role: newUser.role } });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ error: 'Registration failed' });
    }
});

app.post('/auth/login', (req, res) => {
    try {
        const { username, password } = req.body;
        
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }
        
        const user = users.find(u => u.username === username && u.password === password);
        
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET);
        res.json({ token, user: { username: user.username, role: user.role } });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
});

// Scores routes
app.get('/scores', (req, res) => {
    res.json(scores);
});

app.post('/scores', (req, res) => {
    const { username, category, score, totalQuestions } = req.body;
    
    const newScore = {
        id: scores.length + 1,
        username,
        category,
        score,
        totalQuestions,
        date: new Date()
    };
    
    scores.push(newScore);
    res.json(newScore);
});

// Admin routes
app.get('/admin/quiz/:category', (req, res) => {
    const { category } = req.params;
    const questions = quizData[category] || [];
    res.json(questions);
});

app.post('/admin/quiz/:category', (req, res) => {
    const { category } = req.params;
    const questions = req.body;
    
    quizData[category] = questions;
    res.json({ message: 'Quiz updated successfully' });
});

app.get('/admin/users', (req, res) => {
    res.json(users.map(u => ({ id: u.id, username: u.username, role: u.role })));
});

app.delete('/admin/users/:id', (req, res) => {
    const { id } = req.params;
    users = users.filter(u => u.id !== parseInt(id));
    res.json({ message: 'User deleted successfully' });
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

// Root route
app.get('/', (req, res) => {
    res.json({ message: 'Quiz App API - Mock Version' });
});

// Export for Vercel serverless
module.exports = app;

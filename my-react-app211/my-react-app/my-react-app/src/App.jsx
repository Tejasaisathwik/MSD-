import React, { useState, useEffect } from 'react';
import HomeScreen from './components/HomeScreen';
import QuizScreen from './components/QuizScreen';
import ResultsScreen from './components/ResultsScreen';
import Dashboard from './components/Dashboard';
import LoadingOverlay from './components/LoadingOverlay';
import AuthScreen from './components/AuthScreen';
import Header from './components/Header';
import LandingScreen from './components/LandingScreen';
import './style.css';
import { prepareQuiz } from './quizEngine';
import { verifyToken as apiVerify, saveScore as apiSaveScore } from './services/api';

const HIGH_KEY = 'quiz_high_score';
const GAMES_KEY = 'quiz_games_played';
const PLAYERS_KEY = 'quiz_players_data';

const App = () => {
    const [currentScreen, setCurrentScreen] = useState('landing');
    const [loading, setLoading] = useState(false);
    const [quizData, setQuizData] = useState(null);
    const [result, setResult] = useState(null);
    const [currentUser, setCurrentUser] = useState(() => {
        try {
            const user = localStorage.getItem('quiz_current_user');
            return user ? JSON.parse(user) : null;
        } catch (e) {
            return null;
        }
    });
    const [players, setPlayers] = useState(() => {
        try {
            const raw = localStorage.getItem(PLAYERS_KEY);
            return raw ? JSON.parse(raw) : [];
        } catch (e) {
            return [];
        }
    });

    // initialize stats from localStorage
    const [highScore, setHighScore] = useState(() => {
        const v = parseInt(localStorage.getItem(HIGH_KEY), 10);
        return Number.isFinite(v) ? v : 0;
    });
    const [gamesPlayed, setGamesPlayed] = useState(() => {
        const v = parseInt(localStorage.getItem(GAMES_KEY), 10);
        return Number.isFinite(v) ? v : 0;
    });

    const startQuiz = (category) => {
        setLoading(true);
        setTimeout(() => {
            const prepared = prepareQuiz(category, 10);
            setQuizData({ category, questions: prepared });
            setLoading(false);
            setCurrentScreen('quiz');
        }, 600);
    };

    const finishQuiz = async (resObj) => {
        // update stats
        const newGames = gamesPlayed + 1;
        const newHigh = Math.max(highScore, resObj.score || 0);
        setGamesPlayed(newGames);
        setHighScore(newHigh);
        localStorage.setItem(GAMES_KEY, String(newGames));
        localStorage.setItem(HIGH_KEY, String(newHigh));

        const token = localStorage.getItem('auth_token');
        if (token && currentUser) {
            try {
                await apiSaveScore(token, {
                    score: resObj.score,
                    total: resObj.total,
                    correct: resObj.correct,
                    wrong: resObj.wrong,
                    category: resObj.category,
                    timeTaken: resObj.timeTaken
                });
            } catch (e) {
                // non-blocking: fall back to local persistence
            }
        }

        // Keep local list for client dashboard
        if (currentUser) {
            const playerResult = {
                name: currentUser.username,
                score: resObj.score,
                total: resObj.total,
                correct: resObj.correct,
                wrong: resObj.wrong,
                category: resObj.category,
                id: Date.now(),
                date: new Date().toISOString()
            };
            const updatedPlayers = [playerResult, ...players];
            setPlayers(updatedPlayers);
            try {
                localStorage.setItem(PLAYERS_KEY, JSON.stringify(updatedPlayers));
            } catch (e) {
                // ignore
            }
        }

        setResult({ ...resObj, autoSaved: true });
        setCurrentScreen('results');
    };

    const playAgain = () => {
        setResult(null);
        setQuizData(null);
        setCurrentScreen('home');
    };

    const openDashboard = () => setCurrentScreen('dashboard');

    const goHome = () => {
        setResult(null);
        setQuizData(null);
        setCurrentScreen('home');
    };

    const goToAuth = () => setCurrentScreen('auth');

    // Verify token on mount/change and derive current user from backend
    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        const demoMode = localStorage.getItem('demo_mode');
        const verify = async () => {
            // Check if demo mode is enabled
            if (demoMode === 'true') {
                const demoUser = JSON.parse(localStorage.getItem('quiz_current_user') || '{}');
                if (demoUser.isDemo) {
                    setCurrentUser(demoUser);
                    setCurrentScreen((prev) => (prev === 'landing' || prev === 'auth' ? 'home' : prev));
                    return;
                }
            }
            
            if (token) {
                try {
                    const user = await apiVerify(token);
                    setCurrentUser(user);
                    localStorage.setItem('quiz_current_user', JSON.stringify(user));
                    setCurrentScreen((prev) => (prev === 'landing' || prev === 'auth' ? 'home' : prev));
                    return;
                } catch (e) {
                    localStorage.removeItem('auth_token');
                    localStorage.removeItem('quiz_current_user');
                }
            }
            setCurrentUser(null);
            setCurrentScreen((prev) => (prev === 'auth' || prev === 'home' ? 'landing' : prev));
        };
        verify();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('quiz_current_user');
        localStorage.removeItem('auth_token');
        localStorage.removeItem('demo_mode');
        setCurrentUser(null);
        setCurrentScreen('landing');
    };

    return (
        <div>
            {loading && <LoadingOverlay />}
            {currentScreen !== 'auth' && currentScreen !== 'landing' && (
                <Header user={currentUser} onLogout={handleLogout} />
            )}
            <div className="container">
                {currentScreen === 'landing' && (
                    <LandingScreen onGetStarted={goToAuth} />
                )}
                {currentScreen === 'auth' && <AuthScreen />}
                {currentScreen === 'home' && (
                    <HomeScreen
                        startQuiz={startQuiz}
                        highScore={highScore}
                        gamesPlayed={gamesPlayed}
                        openDashboard={openDashboard}
                    />
                )}
                {currentScreen === 'quiz' && quizData && (
                    <QuizScreen quizData={quizData} finishQuiz={finishQuiz} goHome={goHome} />
                )}
                {currentScreen === 'results' && (
                    <ResultsScreen result={result} playAgain={playAgain} goHome={goHome} />
                )}
                {currentScreen === 'dashboard' && (
                    <Dashboard players={players} goHome={goHome} />
                )}
            </div>
        </div>
    );
};

export default App;
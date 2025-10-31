import React, { useEffect, useState, useRef } from 'react';

const QuizScreen = ({ quizData, finishQuiz, goHome }) => {
    const questions = quizData?.questions || [];
    const category = quizData?.category || 'Category';
    const totalQuestions = questions.length;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selected, setSelected] = useState(null);
    const [locked, setLocked] = useState(false);
    const [score, setScore] = useState(0);
    const [correctCount, setCorrectCount] = useState(0);
    const [wrongCount, setWrongCount] = useState(0);
    const [timeStartedAt] = useState(() => Date.now());
    const [elapsed, setElapsed] = useState(0);
    const timerRef = useRef(null);

    useEffect(() => {
        timerRef.current = setInterval(() => {
            setElapsed(Math.floor((Date.now() - timeStartedAt) / 1000));
        }, 1000);
        return () => clearInterval(timerRef.current);
    }, [timeStartedAt]);

    useEffect(() => {
        // reset selection when question changes
        setSelected(null);
        setLocked(false);
    }, [currentIndex]);

    if (!quizData || !questions.length) {
        return (
            <div className="quiz-content" style={{ padding: 40 }}>
                <p>No quiz data available. Go back to home and select a category.</p>
                <button className="back-btn" onClick={goHome}>Back</button>
            </div>
        );
    }

    const q = questions[currentIndex];

    const handleSelect = (optionIndex) => {
        if (locked) return;
        setSelected(optionIndex);
        setLocked(true);

        const isCorrect = optionIndex === q.shuffledCorrectIndex;
        if (isCorrect) {
            setScore(prev => prev + 1);
            setCorrectCount(c => c + 1);
        } else {
            setWrongCount(w => w + 1);
        }
    };

    const handleNext = () => {
        if (!locked) return;
        if (currentIndex + 1 >= totalQuestions) {
            // finish
            clearInterval(timerRef.current);
            const result = {
                score,
                total: totalQuestions,
                correct: correctCount,
                wrong: wrongCount,
                timeTaken: elapsed,
                category
            };
            finishQuiz(result);
            return;
        }
        setCurrentIndex(i => i + 1);
    };

    const optionClass = (idx) => {
        if (!locked) return 'option-btn';
        if (idx === q.shuffledCorrectIndex) return 'option-btn correct';
        if (selected === idx && idx !== q.shuffledCorrectIndex) return 'option-btn wrong';
        return 'option-btn';
    };

    return (
        <div id="quiz-screen" className="screen active">
            <div className="quiz-header">
                <button id="back-btn" className="back-btn" onClick={goHome}>
                    <i className="fas fa-arrow-left"></i> Back
                </button>
                <div className="quiz-info">
                    <h2 id="category-title">{category}</h2>
                    <div className="progress-container">
                        <div className="progress-bar" style={{ width: '100%' }}>
                            <div id="progress-fill" className="progress-fill" style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }} />
                        </div>
                        <span id="question-counter">{currentIndex + 1}/{totalQuestions}</span>
                    </div>
                </div>
                <div className="score-display">
                    Score: <span id="current-score">{score}</span>
                </div>
            </div>

            <div className="quiz-content">
                <div className="question-container">
                    <h3 id="question-text">{q.question}</h3>
                    <p style={{ color: '#888', marginTop: 8 }}>Time: {elapsed}s</p>
                </div>

                <div className="options-container">
                    {q.shuffledOptions.map((opt, idx) => (
                        <button
                            key={idx}
                            className={optionClass(idx)}
                            data-option={idx}
                            onClick={() => handleSelect(idx)}
                            disabled={locked}
                        >
                            {opt}
                        </button>
                    ))}
                </div>

                <div className="quiz-controls">
                    <button id="next-btn" className="next-btn" onClick={handleNext} disabled={!locked}>
                        {currentIndex + 1 >= totalQuestions ? 'Finish Quiz' : 'Next Question'} <i className="fas fa-arrow-right" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QuizScreen;
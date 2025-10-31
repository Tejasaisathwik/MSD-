import React, { useState, useEffect } from 'react';
import { getAllUsers, getUserDetails } from '../services/api';

const AdminDashboard = ({ token }) => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            setLoading(true);
            const data = await getAllUsers(token);
            setUsers(data);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const loadUserDetails = async (userId) => {
        try {
            setLoading(true);
            const data = await getUserDetails(token, userId);
            setSelectedUser(data);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="admin-dashboard">
            <h2><i className="fas fa-users-cog"></i> Player Management</h2>
            
            {loading ? (
                <div className="loading">Loading...</div>
            ) : (
                <div className="admin-content">
                    <div className="users-list">
                        <h3>Registered Players</h3>
                        <div className="users-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Username</th>
                                        <th>Games Played</th>
                                        <th>Avg Score</th>
                                        <th>Best Score</th>
                                        <th>Last Played</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(user => (
                                        <tr key={user._id}>
                                            <td>{user.username}</td>
                                            <td>{user.stats.totalGames}</td>
                                            <td>{user.stats.averageScore.toFixed(2)}</td>
                                            <td>{user.stats.highestScore}</td>
                                            <td>
                                                {user.stats.lastPlayed 
                                                    ? new Date(user.stats.lastPlayed).toLocaleDateString()
                                                    : 'Never'}
                                            </td>
                                            <td>
                                                <button 
                                                    className="view-details-btn"
                                                    onClick={() => loadUserDetails(user._id)}
                                                >
                                                    View Details
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {selectedUser && (
                        <div className="user-details">
                            <h3>Player Details: {selectedUser.username}</h3>
                            <div className="stats-grid">
                                <div className="stat-card">
                                    <h4>Overall Stats</h4>
                                    <p>Total Games: {selectedUser.stats.totalGames}</p>
                                    <p>Average Score: {selectedUser.stats.averageScore.toFixed(2)}</p>
                                    <p>Highest Score: {selectedUser.stats.highestScore}</p>
                                </div>
                                
                                <div className="stat-card">
                                    <h4>Categories Played</h4>
                                    <ul>
                                        {selectedUser.stats.categoriesPlayed.map(category => (
                                            <li key={category}>
                                                {category}
                                                <ul>
                                                    <li>Average: {(selectedUser.stats.scoresByCategory[category].total / 
                                                                  selectedUser.stats.scoresByCategory[category].count).toFixed(2)}</li>
                                                    <li>Highest: {selectedUser.stats.scoresByCategory[category].highest}</li>
                                                </ul>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="stat-card">
                                    <h4>Recent Scores</h4>
                                    <ul className="recent-scores">
                                        {selectedUser.scores.slice(0, 5).map(score => (
                                            <li key={score._id}>
                                                {score.category}: {score.score}/{score.total} 
                                                ({new Date(score.date).toLocaleDateString()})
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
import React from 'react';

const Header = ({ user, onLogout }) => {
    return (
        <div className="header">
            <div className="header-main">
                <h1><i className="fas fa-brain"></i> Multi Quiz Gaming</h1>
                <p>Test your knowledge across multiple categories!</p>
            </div>
            {user && (
                <div className="user-info">
                    <i className="fas fa-user"></i>
                    <span>{user.username}</span>
                    <button className="logout-btn" onClick={onLogout}>
                        <i className="fas fa-sign-out-alt"></i> Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default Header;
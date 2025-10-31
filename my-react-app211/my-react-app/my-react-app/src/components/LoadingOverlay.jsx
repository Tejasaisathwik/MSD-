import React from 'react';

const LoadingOverlay = () => (
    <div id="loading-overlay" className="loading-overlay active">
        <div className="spinner" />
        <p>Loading Quiz...</p>
    </div>
);

export default LoadingOverlay;
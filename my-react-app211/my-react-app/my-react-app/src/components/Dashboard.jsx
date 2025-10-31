import React from 'react';

// Dashboard shows player rankings aggregated by player name.
// It expects `players` to be an array of result entries with at least { id, name, score, total, date, category }
const Dashboard = ({ players = [], goHome }) => {
    // group players by name
    const grouped = players.reduce((acc, p) => {
        const name = p.name || 'Unknown';
        if (!acc[name]) acc[name] = { name, entries: [] };
        acc[name].entries.push(p);
        return acc;
    }, {});

    // compute stats per player
    const stats = Object.values(grouped).map(g => {
        const entries = g.entries.slice();
        const games = entries.length;
        const bestScore = Math.max(...entries.map(e => Number(e.score) || 0));
        const avgScore = Math.round((entries.reduce((s, e) => s + (Number(e.score) || 0), 0) / games) * 100) / 100;
        const lastPlayed = entries.reduce((a, e) => (new Date(e.date) > new Date(a) ? e.date : a), entries[0].date);
        const lastCategory = entries[0].category || '';
        return { name: g.name, games, bestScore, avgScore, lastPlayed, lastCategory };
    });

    // sort by bestScore desc, then avgScore desc
    stats.sort((a, b) => {
        if (b.bestScore !== a.bestScore) return b.bestScore - a.bestScore;
        return b.avgScore - a.avgScore;
    });

    return (
        <div className="dashboard-screen screen active">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                    <h2><i className="fas fa-trophy"></i> Player Rankings</h2>
                </div>
                <div>
                    <button className="action-btn secondary" onClick={goHome}><i className="fas fa-home"></i> Home</button>
                </div>
            </div>

            <section style={{ marginTop: 16 }}>
                {stats.length === 0 ? (
                    <p>No player results saved yet. Play a quiz and save results to populate the rankings.</p>
                ) : (
                    <table className="ranking-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ textAlign: 'left', borderBottom: '1px solid #ddd' }}>
                                <th style={{ padding: '8px' }}>#</th>
                                <th style={{ padding: '8px' }}>Player</th>
                                <th style={{ padding: '8px' }}>Best</th>
                                <th style={{ padding: '8px' }}>Avg</th>
                                <th style={{ padding: '8px' }}>Games</th>
                                <th style={{ padding: '8px' }}>Last Played</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {stats.map((s, i) => (
                                <tr key={s.name} style={{ borderBottom: '1px solid #f0f0f0' }}>
                                    <td style={{ padding: '8px', width: 40 }}>{i + 1}</td>
                                    <td style={{ padding: '8px' }}>{s.name}</td>
                                    <td style={{ padding: '8px' }}>{s.bestScore}</td>
                                    <td style={{ padding: '8px' }}>{s.avgScore}</td>
                                    <td style={{ padding: '8px' }}>{s.games}</td>
                                    <td style={{ padding: '8px' }}>{new Date(s.lastPlayed).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </section>
        </div>
    );
};

export default Dashboard;

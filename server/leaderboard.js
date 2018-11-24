function getTopTen() {
    const scores = [];
    Object.keys(players).forEach(name => {
        scores.push({ name, score: players[name].score });
    });
    scores.sort((a, b) => b.score - a.score);

    return scores.slice(0, 9);
}

function update(leaderboard) {
    io.emit('leaderboardUpdate', leaderboard);
}

module.exports = { getTopTen, update };

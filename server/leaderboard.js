function getTopTen() {
    const scores = [];
    const playersToSort = players.slice(0);
    Object.keys(players).forEach(name => {
        scores.push(players[name].score);
    });
    playersToSort.sort((a, b) => b.score - a.score);

    return playersToSort.slice(0, 9);
}

function update(leaderboard) {
    io.emit('leaderboardUpdate', leaderboard);
}

module.exports = { getTopTen, update };

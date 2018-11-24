const LEADERBOARD_LENGTH = 10;

function getNewLeaderboard(length) {
    const scores = [];
    Object.keys(players).forEach(name => {
        scores.push({
            name,
            score: players[name].score,
            color: players[name].color
        });
    });
    scores.sort((a, b) => b.score - a.score);

    return scores.slice(0, length - 1);
}

function update() {
    io.emit('leaderboardUpdate', getNewLeaderboard(LEADERBOARD_LENGTH));
}

module.exports = { update };

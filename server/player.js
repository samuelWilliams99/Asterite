global.players = {};
const Leaderboard = require('./leaderboard');

function Player(name) {
    this.body = '';
    this.shape = '';
    this.score = 0;
    this.viewPos = [0, 0];
    this.powerups = '';
    this.color = 'red';
    this.name = name;

    players[name] = this;
}

Player.prototype.setScore = function(score) {
    this.score = score;
    Leaderboard.update();
};

module.exports = Player;

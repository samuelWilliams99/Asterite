global.players = {};
const Leaderboard = require('./leaderboard');

function Player(name, socket) {
    this.socket = socket;
    socket.name = name;
    this.body = '';
    this.shape = '';
    this.score = 0;
    this.position = [15000,15000];
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

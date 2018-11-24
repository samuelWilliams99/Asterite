global.players = {};
const Leaderboard = require('./leaderboard');

function Player(name, socket) {
    this.socket = socket;
    socket.name = name;
    this.body = '';
    this.shape = '';
    this.score = 0;
    this.position = [15000, 15000];
    this.powerups = '';
    this.color = '#' + ((Math.random() * 0xffffff) << 0).toString(16);
    this.name = name;
    this.killed = false;

    players[name] = this;
}

Player.prototype.setScore = function(score) {
    this.score = score;
    Leaderboard.update();
};

Player.prototype.kill = function(killData) {
    const { killer, weapon } = killData;
    this.killed = true;

    io.emit('playerKilled', { killer, killed: this.name, weapon });
};

module.exports = Player;

global.players = {};
const Leaderboard = require('./leaderboard');
const p2 = require('p2');

var plyShape = [[0, -6], [3, 2], [-3, 2]];

function Player(socket, name, World) {
    this.socket = socket;
    this.World = World;
    this.world = World.world;
    socket.name = name;
    this.body = new p2.Body({
        mass: 10,
        position: [this.World.worldSize/2,this.World.worldSize/2],
        //position: [getRandomInt(100,1800), 500],
        angle: 0,
        velocity: [0, 0],
        angularVelocity: 0,
        damping: 0,
        angularDamping: 0,
        inertia: 150
    });
    this.shape = new p2.Convex({vertices: plyShape});
    this.body.addShape(this.shape);
    this.world.addBody(this.body);

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

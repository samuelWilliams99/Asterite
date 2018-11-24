module.exports = {
    serve: server
};
const p2 = require('p2');
const World = require('./world');

const ObjectWrapper = require('./objectWrapper');
const Player = require('./player');
const Leaderboard = require('./leaderboard');

function server() {
    var gameWorld = new World();
    var objectWrapper = new ObjectWrapper(gameWorld);

    setInterval(function() {
        objectWrapper.createAsteroid();
    }, 1000);

    io.on('connection', function(socket) {
        var viewPos = [gameWorld.worldSize / 2, gameWorld.worldSize / 2];
        socket.on('playerJoin', function(name) {
            console.log('New player name \n>', name);
            var ply = new Player(name);
            console.log(ply.color);
        });
    });
}

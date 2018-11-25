module.exports = {
    serve: server
};
const World = require('./world');

const ObjectWrapper = require('./objectWrapper');
const Player = require('./player');
const Chat = require('./chat');
const Leaderboard = require('./leaderboard');

function server() {
    var gameWorld = new World();
    var objectWrapper = new ObjectWrapper(gameWorld);

    var fr = 10;

    var maxSubSteps = 10;
    var fixedTimeStep = 1 / fr;
    var lastTimeSeconds = 0;

    setInterval(function() {
        objectWrapper.createAsteroid();
    }, 1000);

    setInterval(function() {
        var timeSeconds = Date.now();
        lastTimeSeconds = lastTimeSeconds || timeSeconds;
        var timeSinceLastCall = timeSeconds - lastTimeSeconds;
        gameWorld.world.step(fixedTimeStep, timeSinceLastCall, maxSubSteps);
        objectWrapper.updateWorld();
    }, fixedTimeStep * 1000);

    io.on('connection', function(socket) {
        var viewPos = [gameWorld.worldSize / 2, gameWorld.worldSize / 2];
        socket.viewPos = viewPos;
        socket.on('playerJoin', function(name) {
            console.log('New player name \n>', name);
            var ply = new Player(socket, name, gameWorld);
            ply.setScore(200);
            console.log(ply.color);
        });

        socket.on('asteroidRequestData', function(ids) {
            console.log('asteroid request');
            console.log(ids);
            for (var i = 0; i < ids.length; i++) {
                var ast = Asteroids[ids[i]];
                socket.emit('asteroidCreate', ast.sendObj());
            }
        });

        socket.on('sendMessage', function(payload) {
            Chat.sendMessage(socket, payload);
        });
    });
}

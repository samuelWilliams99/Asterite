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

    var fr = 30;

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
        objectWrapper.updateWorld();
        gameWorld.world.step(fixedTimeStep, timeSinceLastCall, maxSubSteps);
        
    }, fixedTimeStep * 1000);

    io.on('connection', function(socket) {
        var viewPos = [gameWorld.worldSize / 2, gameWorld.worldSize / 2];
        socket.viewPos = viewPos;
        socket.on('playerJoin', function(name) {
            if (typeof players[name] !== 'undefined') {
                socket.emit('joinError', 'This name is taken!');
            } else if (name.trim() === '') {
                socket.emit('joinError', 'Name must not be empty');
            } else {
                console.log(name + ' joined the game!');
                var ply = new Player(socket, name, gameWorld);
                ply.setScore(0);
                socket.emit('joinSuccess');
                Leaderboard.update();
            }
        });

        socket.on('asteroidRequestData', function(ids) {
            console.log('asteroid request');
            console.log(ids);
            for (var i = 0; i < ids.length; i++) {
                var ast = Asteroids[ids[i]];
                socket.emit('asteroidCreate', ast.sendObj());
            }
        });

        socket.on('playerRequestData', function(names) {
            console.log('player request');
            console.log(names);
            for (var i = 0; i < names.length; i++) {
                var ply = players[names[i]];
                socket.emit('playerCreate', ply.sendObj());
            }
        });

        socket.on("playerSendKeys", function(username, keys){
        	if(username == socket.name){
        		var ply = players[username];
        		ply.keysDown = keys;
        	}
        })

        socket.on("playerTryFace", function(username, ang){
        	if(username == socket.name){
        		var ply = players[username];
        		ply.targetAng = ang;
        	}
        })

        socket.on('sendMessage', function(payload) {
            Chat.sendMessage(socket, payload);
        });
    });
}

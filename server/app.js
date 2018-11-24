module.exports = {
    serve: server
};
const World = require('./world');

const ObjectWrapper = require('./objectWrapper');
const Player = require('./player');
const Chat = require('./chat');

function server() {
    var gameWorld = new World();
    var objectWrapper = new ObjectWrapper(gameWorld);

    setInterval(function() {
        objectWrapper.createAsteroid();
    }, 1000);

    io.on('connection', function(socket) {
        var viewPos = [gameWorld.worldSize / 2, gameWorld.worldSize / 2];
        socket.viewPos = viewPos;
        socket.on('playerJoin', function(name) {
            console.log('New player name \n>', name);
            var ply = new Player(name);
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

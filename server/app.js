module.exports = {
	serve: server
}
const p2 = require("p2");
const World = require("./world");
const Asteroid = require("./asteroid");

const Player = require('./player');

var gameWorld = new World();

function server(io){
	io.on('connection', function(socket){
		socket.on('playerJoin', function(name){
			console.log("New player name \n>", name);
			var ply = new Player(name);
			console.log(ply.color);
		});
	});

}



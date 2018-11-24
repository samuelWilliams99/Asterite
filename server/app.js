module.exports = {
	serve: server
}
const p2 = require("p2");
const World = require("./world.js");

var gameWorld = new World();

function server(io){
	io.on('connection', function(socket){
		socket.on('playerJoin', function(name){
			console.log("New player name \n>", name);
		});
	});

	
	
}



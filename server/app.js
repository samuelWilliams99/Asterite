module.exports = {
	serve: server
}
const p2 = require("p2");
const World = require("./world");

const ObjectWrapper = require("./objectWrapper");


const Player = require('./player');


function server(io){
	var gameWorld = new World();
	var objectWrapper = new ObjectWrapper(gameWorld, io);
	
	io.on('connection', function(socket){
		setTimeout(function(){
			objectWrapper.createAsteroid();
		}, 3000);
		socket.on('playerJoin', function(name){
			console.log("New player name \n>", name);
			var ply = new Player(name);
			console.log(ply.color);
		});
	});

}



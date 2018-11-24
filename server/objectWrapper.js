module.exports = ObjectWrapper;

const Asteroid = require("./asteroid");

function ObjectWrapper(gameWorld, io){
	this.gameWorld = gameWorld;
	this.io = io;
}

ObjectWrapper.prototype.createAsteroid = function(){
	var ast = new Asteroid(this.gameWorld.world);
	this.io.emit("asteroidCreate", ast.sendObj())
}
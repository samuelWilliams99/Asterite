const p2 = require("p2");

module.export = {
	new: Asteroid,
	all: Asteroids
};

var idCounter = 0;

var Asteroids = [];

function Asteroid(world, size){
	this.id = idCounter++;
	this.body = new Body({
		mass: 1,
		position: [0, 0],
		angle: 0,
		velocity: [0, 0],
		angularVelocity: 0
	});
	this.shape = generateShape(size || 30);
	this.body.addShape(this.shape);

	this.powerup = null;

	Asteroids.push(this);
}

Asteroids.prototype.remove(){
	Asteroids.splice(Asteroids.indexOf(this), 1);
}

function generateShape(avg){
	var len = 3 + getRandomInt(avg/6, avg/3);
	var radii = [];
	var vertices = [];
	for(var i=0; i<len; i++){
		var ang = 360 - (i * (360/len));
		var angRad = ang * Math.PI/180;
		var radius = getRandomInt(avg*0.8, avg*1.2);
		var vertex = [radius * Math.cos(angRad), radius * Math.sin(angRad)];
		vertices.push(vertex);
	}
	var shape = new Convex({vertices : vertices});

	return shape;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


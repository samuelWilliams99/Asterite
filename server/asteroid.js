const p2 = require('p2');

module.exports = Asteroid;

var idCounter = 0;

global.Asteroids = {};

function Asteroid(World, size){
	this.World = World;
	this.world = World.world;
	this.id = idCounter++;
	this.body = new p2.Body({
		mass: 10,
		position: [getRandomInt(this.World.worldSize/2-2000,this.World.worldSize/2+2000), getRandomInt(this.World.worldSize/2-2000,this.World.worldSize/2+2000)],
        //position: [getRandomInt(100,1800), 500],
		angle: 0,
		velocity: [getRandomInt(-10, 10), getRandomInt(-10, 10)],
		angularVelocity: 0.2,
		damping: 0,
        angularDamping: 0,
        inertia: 150
	});
	this.shapeData = generateShapeData(size || 30);
	this.shape = generateShape(this.shapeData);
	this.body.addShape(this.shape);
	this.world.addBody(this.body);


    this.powerup = null;

    Asteroids[this.id] = this;
}

Asteroid.prototype.remove = function() {
    delete Asteroids[this.id];
    this.world.removeBody(this.body);
};

Asteroid.prototype.sendObj = function() {
    return {
        id: this.id,
        body: {
            mass: this.body.mass,
            position: this.body.position,
            angle: this.body.angle,
            velocity: this.body.velocity,
            angularVelocity: this.body.angularVelocity
        },
        shapeData: this.shapeData,
        powerup: this.powerup
    };
};

Asteroid.prototype.sendObjSimple = function() {
    return {
        id: this.id,
        body: {
            position: this.body.position,
            angle: this.body.angle,
            velocity: this.body.velocity,
            angularVelocity: this.body.angularVelocity
        },
        powerup: this.powerup
    };
};

function generateShape(shapeData) {
    var len = shapeData.length;
    var vertices = [];
    for (var i = 0; i < len; i++) {
        var ang = i * (360 / len);
        var angRad = (ang * Math.PI) / 180;
        var radius = shapeData[i];
        var vertex = [radius * Math.cos(angRad), radius * Math.sin(angRad)];
        vertices.push(vertex);
    }
    var shape = new p2.Convex({ vertices: vertices });

    return shape;
}

function generateShapeData(avg) {
    var len = 3 + getRandomInt(avg / 6, avg / 3);
    var ret = [];
    for (var i = 0; i < len; i++) {
        ret.push(getRandomInt(avg * 0.65, avg * 1.35));
    }

    return ret;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

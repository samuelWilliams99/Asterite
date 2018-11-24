const p2 = require('p2');

module.exports = Asteroid;

var idCounter = 0;

var Asteroids = [];

function Asteroid(world, size) {
    this.world = world;
    this.id = idCounter++;
    this.body = new p2.Body({
        mass: 1,
        position: [getRandomInt(0, 1920), getRandomInt(0, 1080)],
        angle: 0,
        velocity: [getRandomInt(-6, 6), getRandomInt(-6, 6)],
        angularVelocity: 0.2,
        damping: 0,
        angularDamping: 0
    });
    this.shapeData = generateShapeData(size || 30);
    this.shape = generateShape(this.shapeData);
    this.body.addShape(this.shape);
    world.addBody(this.body);

    this.powerup = null;

    Asteroids.push(this);
}

Asteroid.prototype.remove = function() {
    Asteroids.splice(Asteroids.indexOf(this), 1);
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

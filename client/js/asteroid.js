Asteroids = {};

function Asteroid(world, asteroidData){
	this.world = world;
	this.id = asteroidData.id;
	this.body = new p2.Body({
		mass: asteroidData.body.mass,
		position: realToScreen(asteroidData.body.position),
		angle: asteroidData.body.angle,
		velocity: asteroidData.body.velocity,
        angularVelocity: asteroidData.body.angularVelocity,
        damping: 0,
        angularDamping: 0,
        inertia: 150
	});
	this.shapeData = asteroidData.shapeData;
    this.shapeVertices = generateShape(this.shapeData);
	this.shape = new p2.Convex({vertices : this.shapeVertices});    
    this.body.addShape(this.shape);
    this.body.objectType = "Asteroid";
	world.addBody(this.body);

	this.powerup = asteroidData.powerup;

	Asteroids[this.id] = this;
}

function generateShape(shapeData){
	var len = shapeData.length;
	var vertices = [];
	for(var i=0; i<len; i++){
		var ang = (i * (360/len));
		var angRad = ang * Math.PI/180;
		var radius = shapeData[i];
		var vertex = [radius * Math.cos(angRad), radius * Math.sin(angRad)];
		vertices.push(vertex);
	}

	return vertices;
}
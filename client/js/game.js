gameWorld = new p2.World({
    gravity: [0, 0],
    applyDamping: false,
    applyGravity: false,
    frictionGravity: 0
});
var material = new p2.Material();

gameWorld.addContactMaterial(new p2.ContactMaterial(material, material, {
    restitution: 0.4,
    stiffness: Number.MAX_VALUE // Infinite stiffness to get the exact restitution, according to the p2 example
}));

function createAsteroid(asteroidData){
	if(Asteroids[asteroidData.id]){return;}
    new Asteroid(gameWorld, asteroidData);
}

function updateAsteroid(asteroidData){
	if(Asteroids[asteroidData.id]){
		var asteroid = Asteroids[asteroidData.id];
		asteroid.body.position = createAsteroid(asteroidData.body.position);
		asteroid.body.angle = asteroidData.body.angle;
		asteroid.body.velocity = asteroidData.body.velocity;
		asteroid.body.angularVelocity = asteroidData.body.angularVelocity;
		return true;
	} else {
		return false;
	}
}

function realToScreen(position){
	return [position[0] - viewPos[0], position[1] - viewPos[1]];
}

viewPos = [0,0];

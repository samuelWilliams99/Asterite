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
		asteroid.body.position = realToScreen(asteroidData.body.position);
		asteroid.body.angle = asteroidData.body.angle;
		asteroid.body.velocity = asteroidData.body.velocity;
		asteroid.body.angularVelocity = asteroidData.body.angularVelocity;
		return true;
	} else {
		return false;
	}
}

function createPlayer(playerData){
	if(Players[playerData.name]){return;}
    new Player(gameWorld, playerData);
}

function removePlayer(name){
    
	if(Players[name]){

		if(name == username){
			openStartDialog(Players[name].score, name);
		}

		gameWorld.removeBody(Players[name].body);
		delete Players[name];
		if(username == name){
			username = null;
		}
	}
}

function updatePlayer(playerData){
	if(Players[playerData.name]){
		var player = Players[playerData.name];
		player.body.position = realToScreen(playerData.body.position);
		player.body.angle = playerData.body.angle;
		player.body.velocity = playerData.body.velocity;
		player.body.angularVelocity = playerData.body.angularVelocity;
		player.score = playerData.score;
		player.powerups = playerData.powerups;
		player.thrusting = playerData.thrusting;
		player.killed = playerData.killed;
		player.killedTimeout = playerData.killedTimeout;
		player.dragging = playerData.dragging;

		return true;
	} else {
		return false;
	}
}

function realToScreen(position){
	return [position[0] - viewPos[0], position[1] - viewPos[1]];
}

viewPos = [0,0];

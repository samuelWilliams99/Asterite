socket.on("asteroidCreate", function(asteroidData){
	var idx = pendingAsteroids.indexOf(asteroidData.id);
	if(idx >= 0){
		pendingAsteroids.splice(idx, 1);
	}
    createAsteroid(asteroidData);
});

socket.on("playerCreate", function(playerData){
	var idx = pendingPlayers.indexOf(playerData.name);
	if(idx >= 0){
		pendingPlayers.splice(idx, 1);
	}
    createPlayer(playerData);
});

pendingAsteroids = [];

pendingPlayers = [];

socket.on("physUpdate", function(data){
	//viewPos = data.viewPos;
	var unknownAsteroids = [];
	for(var i=0; i<data.asteroids.length; i++){
		var ast = data.asteroids[i];
		if(pendingAsteroids.indexOf(ast.id) >= 0) {
			continue;
		}
		if(!updateAsteroid(ast)){
			unknownAsteroids.push(ast.id);
			pendingAsteroids.push(ast.id);
		}
	}
	if(unknownAsteroids.length > 0){
		socket.emit("asteroidRequestData", unknownAsteroids);
	}

	var unknownPlayers = [];
	for(var i=0; i<data.players.length; i++){
		var ply = data.players[i];
		if(pendingPlayers.indexOf(ply.name) >= 0) {
			continue;
		}
		if(!updatePlayer(ply)){
			unknownPlayers.push(ply.name);
			pendingPlayers.push(ply.name);
		}
	}
	if(unknownPlayers.length > 0){
		socket.emit("playerRequestData", unknownPlayers);
	}
});


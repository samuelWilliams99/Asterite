socket.on("asteroidCreate", function(asteroidData){
	var idx = pendingAsteroids.indexOf(asteroidData.id);
	if(idx >= 0){
		pendingAsteroids.splice(idx, 1);
	}
	console.log(typeof(asteroidData));
	console.log("helloworld")
    createAsteroid(asteroidData);
});

pendingAsteroids = [];

socket.on("asteroidUpdate", function(data){
	viewPos = data.viewPos;
	var unknown = [];
	for(var i=0; i<data.asteroids.length; i++){
		var ast = data.asteroids[i];
		if(pendingAsteroids.indexOf(ast.id) >= 0) {
			continue;
		}
		if(!updateAsteroid(ast)){
			unknown.push(ast.id);
			pendingAsteroids.push(ast.id)
		}
	}
	if(unknown.length > 0){
		socket.emit("asteroidRequestData", unknown);
	}
});


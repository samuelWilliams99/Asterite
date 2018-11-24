socket.on("asteroidCreate", function(asteroidData){
    createAsteroid(asteroidData);
});

socket.on("asteroidUpdate", function(data){
	global.viewPos = data.viewPos;
	var unknown = [];
	for(var i=0; i<data.asteroids.length; i++){
		if(!updateAsteroid(data.asteroids[i])){
			unknown.push(data.asteroids[i].id);
		}
	}
	if(unknown.length > 0){
		socket.emit("asteroidRequestData", unknown);
	}
});


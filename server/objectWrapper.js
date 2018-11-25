module.exports = ObjectWrapper;

const Asteroid = require('./asteroid');

function ObjectWrapper(gameWorld) {
    this.gameWorld = gameWorld;
}

ObjectWrapper.prototype.asteroidCount = function(){
	return Object.keys(Asteroids).length;
}

ObjectWrapper.prototype.createAsteroid = function() {
    var ast = new Asteroid(this.gameWorld);
    //io.emit('asteroidCreate', ast.sendObj());
};



ObjectWrapper.prototype.updateWorld = function(){
	var sockets = io.sockets.sockets
	var plyData = [];
	for(var key in players){
		var ply = players[key];
		ply.updateBody();
		
		plyData.push(ply.sendObjSimple());
	}
	for(var key in sockets){
		var socket = sockets[key];
		var data = {asteroids: [], players: plyData};
		if(socket.name){
			if(players[socket.name].killed){
				data.viewPos = socket.viewPos
			} else {
				data.viewPos = players[socket.name].body.position;
			}
		} else {
			data.viewPos = socket.viewPos;
		}
		for(var key in Asteroids){
			var asteroid = Asteroids[key];
			if(withinBox(asteroid.body.position, subVec(data.viewPos, [2000,2000]), addVec(data.viewPos, [2000,2000]))){
				data.asteroids.push(asteroid.sendObjSimple());
			}
		};

		socket.emit("physUpdate", data);
	};
}


function subVec(a, b){
	return [a[0] - b[0], a[1] - b[1]];
}
function addVec(a, b){
	return [a[0] + b[0], a[1] + b[1]];
}

function withinBox(pos, min, max){
	if(pos[0] >= min[0] && pos[0] <= max[0]) {
		if(pos[1] >= min[1] && pos[1] <= max[1]) {
			return true;
		}
	}
	return false;
}

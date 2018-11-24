module.exports = ObjectWrapper;

const Asteroid = require('./asteroid');

function ObjectWrapper(gameWorld) {
    this.gameWorld = gameWorld;
}

ObjectWrapper.prototype.createAsteroid = function() {
    var ast = new Asteroid(this.gameWorld);
    io.emit('asteroidCreate', ast.sendObj());
};

ObjectWrapper.prototype.updateWorld = function(){
	io.sockets.sockets.forEach(socket => {
		var data = {asteroids: []};
		if(socket.name){
			data.viewPos = players[socket.name].body.position;
		} else {
			data.viewPos = socket.viewPos;
		}
		Asteroids.forEach(asteroid => {
			if(withinBox(asteroid.body.position, subVec(data.viewPos, [2000,2000]), addVec(data.viewPos, [2000,2000]))){
				data.asteroids.push(asteroid.sendObjSimple());
			}
		});
	});
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

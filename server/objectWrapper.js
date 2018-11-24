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
	
}

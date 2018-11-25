function renderBodies(){
    for (var key in Asteroids){
        asteroid = Asteroids[key];
        if (!withinBox(asteroid.body.position, [-2000, -2000], [2000, 2000])){
            gameWorld.removeBody(asteroid.body);
            delete Asteroids[key];
            continue;
        }
        push();
        translate(asteroid.body.position[0] + width/2, asteroid.body.position[1] + height/2);
        rotate(asteroid.body.angle);
        drawObject(asteroid.shapeVertices, asteroid.body.position);
        pop();
    };
}

function withinBox(pos, min, max){
	if(pos[0] >= min[0] && pos[0] <= max[0]) {
		if(pos[1] >= min[1] && pos[1] <= max[1]) {
			return true;
		}
	}
	return false;
}

function drawObject(vertices) {
    beginShape();
    for (var i = 0; i < vertices.length; i++){
        vertex(vertices[i][0], vertices[i][1]);
    }
    endShape(CLOSE);
}

function renderRadar(radarSize, radarPos){
    var scaleMult = radarSize / 4000;
    for (var key in Asteroids){
        asteroid = Asteroids[key];
        var relativePosition = [asteroid.body.position[0]*scaleMult, asteroid.body.position[1]*scaleMult]
        if (dist(0, 0, relativePosition[0], relativePosition[1]) < radarSize/2.1){
            ellipse(radarPos[0]+relativePosition[0], radarPos[1]+relativePosition[1], 2, 2);
        }
    }
}
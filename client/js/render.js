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
        drawObject(asteroid.shapeVertices);
        pop();
    };
    for (var key in Players){
        var ply = Players[key];
        push();
        translate(ply.body.position[0] + width/2, ply.body.position[1] + height/2);
        rotate(ply.body.angle);
        drawObject(ply.shapeVertices);
        drawThrust(ply);
        pop();
    }
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

var angle = 0;
var offset = 2;

function renderRadar(radarSize, radarPos){
    var opacity = 255;
    strokeWeight(3);
    var scaleMult = radarSize / 4000;
    for (var i = 0; i < 8; i++){
        push();
        stroke(0,255,0, opacity);
        opacity -= 30;
        translate(radarPos[0], radarPos[1]);
        rotate((angle-i*offset) * Math.PI / 180);
        line(0, 0, 0, 0-radarSize/2);
        pop();

    }
    angle = betterMod((angle + 5), 360);

    strokeWeight(5);

    stroke(0,255,0);
    for (var key in Asteroids){
        asteroid = Asteroids[key];
        var asteroidAngle = atan(asteroid.lastPosition[0] / asteroid.lastPosition[1]);
        asteroidAngle = asteroidAngle * 180 / Math.PI;
        if (asteroid.lastPosition[1] < 0){
            asteroidAngle += 180;
        }

        asteroidAngle = 360 - asteroidAngle;
        asteroidAngle = (asteroidAngle + 180) % 360;

        if (asteroidAngle <= angle && asteroidAngle >= angle -6){
            asteroid.lastPosition = asteroid.body.position;
            asteroid.lastPositionLifetime = 300 / 5;
        }
        
        if (asteroid.lastPositionLifetime == 0){
            continue;
        } else {
            asteroid.lastPositionLifetime -= 1;
        }
        
        // var relativePosition = [asteroid.body.position[0]*scaleMult, asteroid.body.position[1]*scaleMult]
        var relativePosition = [asteroid.lastPosition[0]*scaleMult, asteroid.lastPosition[1]*scaleMult]
        if (dist(0, 0, relativePosition[0], relativePosition[1]) < radarSize/2.1){
            stroke(255, 100, 100, asteroid.lastPositionLifetime / (300 / 5) * 255);
            ellipse(radarPos[0]+relativePosition[0], radarPos[1]+relativePosition[1], 2, 2);
        }
    }
    strokeWeight(1);


}

function betterMod(a, b){
    return ((a % b) + b) % b;
}

function drawThrust(player){
    thrustVertices = [[-8, 8], [0, getRandomInt(16, 22)], [8, 8]];
    if (player.thrusting){
        fill(255, getRandomInt(50, 200), 0);
        stroke(255, getRandomInt(50, 200), 0);
        beginShape();
        for (var i = 0; i < thrustVertices.length; i++){
            vertex(thrustVertices[i][0], thrustVertices[i][1]);
        }
        endShape();
    }
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
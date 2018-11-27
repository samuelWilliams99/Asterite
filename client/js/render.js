function renderBodies(rgb){
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
        var alpha = 255;
        if(ply.killed){
            // Sets colour to white with an alpha to fade out
            alpha = ply.killedTimeout * 2.55;
        }
        push();
        translate(ply.body.position[0] + width/2, ply.body.position[1] + height/2);
        rotate(ply.body.angle);
        var rgb = ply.rgbColor;
        stroke(rgb[0],rgb[1],rgb[2],alpha);
        drawObject(ply.shapeVertices);
        drawThrust(ply);
        pop();
        
        
        // Sets player to be fully visible and white (at the moment)
        stroke(rgb[0],rgb[1],rgb[2],255);

        ply.particles.run(ply.rgbColor);

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
        
        var relativePositionAsteroid = [asteroid.lastPosition[0]*scaleMult, asteroid.lastPosition[1]*scaleMult]
        
        if (dist(0, 0, relativePositionAsteroid[0], relativePositionAsteroid[1]) < radarSize/2.1){
            stroke(255, 255, 255, asteroid.lastPositionLifetime / (300 / 5) * 255);
            ellipse(radarPos[0]+relativePositionAsteroid[0], radarPos[1]+relativePositionAsteroid[1], 2, 2);
        }
    }

    for (var key in Players){
        if (key != username){
            player = Players[key];

            var playerAngle = atan(player.lastPosition[0] / player.lastPosition[1]);
            playerAngle = playerAngle * 180 / Math.PI;
            if (player.lastPosition[1] < 0){
                playerAngle += 180;
            }
    
            playerAngle = 360 - playerAngle;
            playerAngle = (playerAngle + 180) % 360;
    
            if (playerAngle <= angle && playerAngle >= angle -6){
                player.lastPosition = player.body.position;
                player.lastPositionLifetime = 300 / 5;
            }
            
            if (player.lastPositionLifetime == 0){
                continue;
            } else {
                player.lastPositionLifetime -= 1;
            }

            var relativePositionPlayer = [player.lastPosition[0] * scaleMult, player.lastPosition[1] * scaleMult];
            var distance = dist(0, 0, relativePositionPlayer[0], relativePositionPlayer[1])
            var direction = [relativePositionPlayer[0] / distance, relativePositionPlayer[1] / distance];
            var newDistance = Math.min(distance, (radarSize / 2));

            relativePositionPlayer = [direction[0] * newDistance, direction[1] * newDistance];
            
            stroke(player.rgbColor[0], player.rgbColor[1], player.rgbColor[2], player.lastPositionLifetime / (300 / 5) * 255);
            ellipse(radarPos[0]+relativePositionPlayer[0], radarPos[1]+relativePositionPlayer[1], 2, 2);
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
        var speed = 10;
        var rndInt = (getRandomInt(-10, 10)+90) * Math.PI / 180;
        player.particles.addParticle(createVector(player.body.position[0]+width/2, player.body.position[1]+height/2), createVector(speed*Math.cos(player.body.angle+rndInt), speed*Math.sin(player.body.angle+rndInt)));
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
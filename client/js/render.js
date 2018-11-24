function renderBodies(){
    for (var key in Asteroids){
        asteroid = Asteroids[key];
        push();
        translate(asteroid.body.position[0] + width/2, asteroid.body.position[1] + height/2);
        rotate(asteroid.body.angle);
        drawObject(asteroid.shapeVertices, asteroid.body.position);
        pop();
    };
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
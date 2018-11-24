function renderBodies(){
    Asteroids.forEach(asteroid => {
        push();
        translate(asteroid.body.position[0] + width/2, asteroid.body.position[1] + height/2);
        rotate(asteroid.body.angle);
        drawObject(asteroid.shapeVertices, asteroid.body.position);
        pop();
    });
}

function drawObject(vertices) {
    beginShape();
    for (var i = 0; i < vertices.length; i++){
        vertex(vertices[i][0], vertices[i][1]);
    }
    endShape(CLOSE);
}

function renderRadar(radarSize, radarPos){
    ellipse(radarPos[0]+5, radarPos[1]+5, 5, 5);
    Asteroids.forEach(asteroid => {
    });
}
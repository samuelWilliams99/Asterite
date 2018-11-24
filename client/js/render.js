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
    for (var key in Asteroids){
        asteroid = Asteroids[key];
        ellipse(radarPos[0]+(asteroid.body.position[0]/radarSize), radarPos[1]+(asteroid.body.position[1]/radarSize), 2, 2);
    };
}
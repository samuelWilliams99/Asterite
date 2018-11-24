function renderBodies(){
    Asteroids.forEach(asteroid => {
        push();
        translate(asteroid.body.position[0], asteroid.body.position[1]);
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

function renderRadar(radarSize){
    Asteroids.forEach(asteroid => {
        
    });
}